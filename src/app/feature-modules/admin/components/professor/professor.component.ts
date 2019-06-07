import { Component, OnInit, Input, EventEmitter, Output, Injector } from '@angular/core'
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
import { IUser } from 'src/app/models/user.interface'
import { FormComponent } from 'src/app/models/FormComponent'
import { UserForm } from 'src/app/models/UserFormComponent'

@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.scss'],
})
export class ProfessorComponent extends UserForm implements OnInit {
  constructor(injector: Injector) {
    super(injector)
  }
}
