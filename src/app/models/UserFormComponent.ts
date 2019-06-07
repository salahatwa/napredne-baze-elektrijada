import { FormComponent } from './FormComponent'
import { Input, OnInit, Injector } from '@angular/core'
import { IUser } from './user.interface'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

export class UserForm extends FormComponent<IUser> implements OnInit {
  @Input() user: IUser = null
  userForm: FormGroup
  protected formBuilder: FormBuilder

  constructor(injector: Injector) {
    super()
    this.formBuilder = injector.get(FormBuilder)
  }

  ngOnInit() {
    this.userForm = this.buildForm(this.user)
  }

  buildForm(professor?: IUser) {
    return this.formBuilder.group({
      imageURL: [professor ? professor.imageURL : ''],
      name: [professor ? professor.name : '', Validators.required],
      email: [professor ? professor.email : '', Validators.required],
      username: [professor ? professor.username : '', Validators.required],
      password: ['', professor ? [] : [Validators.required]],
      roles: [professor ? professor.roles : ''],
    })
  }

  get editing(): boolean {
    return this.user !== null
  }

  submit() {
    super.submit()
    this.submitted.emit(this.userForm.value)
  }
}
