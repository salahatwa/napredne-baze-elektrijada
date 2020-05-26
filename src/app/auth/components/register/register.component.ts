import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import validators from '../../validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.scss', './register.component.scss'],
  providers: [],
})
export class RegisterComponent implements OnInit {
  error: string;

  registrationForm = this.formBuilder.group(
    {
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
    },
    {
      validators: validators.passwordMismatch,
    }
  );

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  register() {
    const userBody = this.registrationForm.value;
    delete userBody.confirmPassword;
    this.error = '';
    this.authService.register(userBody).subscribe(
      (res) => {
        if (res._id) {
          this.router.navigate(['/home']);
        }
      },
      (err: string) => (this.error = err)
    );
  }
}
