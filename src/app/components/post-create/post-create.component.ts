import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { PostTypes } from 'src/app/constants/post-types.enum'
import * as _moment from 'moment'
import * as _rollupMoment from 'moment'
import { FormComponent } from 'src/app/models/FormComponent'
import { IPost } from 'src/app/models/IPost'
import { AuthService } from 'src/app/services/auth/auth.service'

const moment = _rollupMoment || _moment
const arrayMaker = (length: number) =>
  Array.from({ length }, (v, index) => (index < 10 ? `0${index}` : index.toString()))

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent extends FormComponent<IPost> implements OnInit {
  @Input() postType = PostTypes.POST

  array24 = arrayMaker(24)
  array60 = arrayMaker(60)

  myContext = { name: 'nesto' }

  postTypes = PostTypes
  postForm: FormGroup

  essentialFormObj = {
    title: ['', Validators.required],
    text: [
      '',
      [Validators.required, Validators.minLength(20), Validators.maxLength(1000)],
    ],
  }

  timeFormObj = {
    hour: ['', Validators.required],
    minute: ['', Validators.required],
    second: ['', Validators.required],
  }

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    super()
  }

  ngOnInit() {
    if (this.postType === PostTypes.POST) {
      this.postForm = this.formBuilder.group(this.essentialFormObj)
    }

    if (this.postType === PostTypes.EVENT) {
      this.postForm = this.formBuilder.group({
        ...this.essentialFormObj,
        startDate: [moment(), Validators.required],
        startTime: this.formBuilder.group(this.timeFormObj),
        endDate: [moment(), Validators.required],
        endTime: this.formBuilder.group(this.timeFormObj),
      })
    }
  }

  submit() {
    super.submit()
    this.submitted.emit({
      ...this.postForm.value,
      user: this.authService.currentUser,
      createdAt: new Date().toDateString(),
      comments: [],
    })
  }

  get isPost(): boolean {
    return this.postType === PostTypes.POST
  }
}
