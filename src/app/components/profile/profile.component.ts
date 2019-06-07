import { Component, OnInit, Injector } from '@angular/core'
import { Roles } from 'src/app/services/auth/roles.enum'
import { UserForm } from 'src/app/models/UserFormComponent'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent extends UserForm implements OnInit {
  roles = Object.keys(Roles).map(key => Roles[key])

  constructor(injector: Injector) {
    super(injector)
  }
}
