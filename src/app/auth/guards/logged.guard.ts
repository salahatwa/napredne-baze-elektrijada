import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoggedGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.isAuthenticated) {
      return true;
    }
    this.router.navigate(['/home']);
    return false;
  }

  canLoad(): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.authService.isAuthenticated) {
      return true;
    }
    this.router.navigate(['/home']);
    return false;
  }
}
