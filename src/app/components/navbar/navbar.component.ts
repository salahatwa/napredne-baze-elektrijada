import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth/auth.service'
import { Roles } from 'src/app/services/auth/roles.enum'
import { IUser } from 'src/app/models/user.interface'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user: IUser
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.user = this.authService.user
  }

  home() {
    this.router.navigate(['home'])
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/auth/login'])
  }

  get isAdmin(): boolean {
    return this.user.roles.includes(Roles.ADMIN)
  }
}
