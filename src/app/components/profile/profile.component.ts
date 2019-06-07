import { Component, OnInit, Injector } from '@angular/core'
import { Roles } from 'src/app/services/auth/roles.enum'
import { UserForm } from 'src/app/models/UserFormComponent'
import { ActivatedRoute } from '@angular/router'
import { AuthService } from 'src/app/services/auth/auth.service'
import { switchMap } from 'rxjs/operators'
import { FormControl } from '@angular/forms'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent extends UserForm implements OnInit {
  itsMe: boolean
  rolesList = Object.keys(Roles).map(key => Roles[key])

  constructor(
    injector: Injector,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    super(injector)

    // this.route.paramMap.pipe(switchMap(params => params.get('id'))
    this.route.paramMap.subscribe(
      params => (this.itsMe = this.authService.currentUser._id === params.get('id'))
    )
  }

  ngOnInit() {
    this.user = this.authService.currentUser
    super.ngOnInit()
  }

  resetInitialForm() {
    this.userForm.reset(this.user)
  }
}
