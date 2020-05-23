import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canAccess(): boolean {
    if (this.authService.isAuthenticated) {
      return true;
    }
    this.router.navigate(['/auth/login']);
    return false;
  }

  canActivate(): boolean {
    return this.canAccess();
  }

  canLoad(): boolean {
    return this.canAccess();
  }
}
