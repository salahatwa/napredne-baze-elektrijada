import { Injectable } from '@angular/core'
import {
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router'
import { Observable } from 'rxjs'
import { AuthService } from '../services/auth/auth.service'
import { Roles } from '../services/auth/roles.enum'

@Injectable({
  providedIn: 'root',
})
export class IsAdminGuard implements CanLoad {
  constructor(private authService: AuthService) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.roles.includes(Roles.ADMIN)) {
      return true
    }
  }
}
