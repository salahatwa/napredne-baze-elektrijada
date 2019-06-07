import { Injectable } from '@angular/core'
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http'
import { Router } from '@angular/router'
import { AuthService } from '../services/auth/auth.service'
import { Observable } from 'rxjs'

@Injectable()
export class RequestHttpInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const reqClone = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + this.authService.getToken()),
    })
    return next.handle(reqClone)
  }
}
