import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core'
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
import { IUser } from 'src/app/models/user.interface'
import { FormComponent } from 'src/app/models/IFormComponent'

@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.scss'],
})
export class ProfessorComponent extends FormComponent implements OnInit {
  @Input() professor: IUser = null
  professorForm: FormGroup = this.buildForm()

  constructor(private formBuilder: FormBuilder) {
    super()
    if (this.professor) {
      this.professorForm = this.buildForm(this.professor)
    }
  }

  ngOnInit() {}

  buildForm(professor?: IUser) {
    return this.formBuilder.group({
      imageURL: [professor ? professor.imageURL : ''],
      name: [professor ? professor.name : '', Validators.required],
      email: [professor ? professor.email : '', Validators.required, Validators.email],
      username: [professor ? professor.username : '', Validators.required],
      password: ['', Validators.required],
    })
  }

  get editing(): boolean {
    return this.professor !== null
  }

  submit() {
    this.finished.emit()
  }

  cancel() {
    this.finished.emit()
  }
}
