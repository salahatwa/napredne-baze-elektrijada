import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { AuthService } from 'src/app/services/auth/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginError: string

  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  })

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  login() {
    this.authService
      .login(this.loginForm.value['username'], this.loginForm.value['password'])
      .subscribe(
        res => {
          console.log(res)
          if (res.id !== -1) {
            this.router.navigate(['/home'])
          }
        },
        err => (this.loginError = err)
      )
  }
}
