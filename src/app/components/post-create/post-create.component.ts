import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { PostTypes } from 'src/app/constants/post-types.enum'
import * as _moment from 'moment'
import * as _rollupMoment from 'moment'

const moment = _rollupMoment || _moment
const arrayMaker = (length: number) =>
  Array.from({ length }, (v, index) => (index < 10 ? `0${index}` : index.toString()))

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent implements OnInit {
  @Output() finished = new EventEmitter()
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

  constructor(private formBuilder: FormBuilder) {}

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
    console.log(this.postForm.value)
    this.finished.emit()
  }

  get isPost(): boolean {
    return this.postType === PostTypes.POST
  }
}
