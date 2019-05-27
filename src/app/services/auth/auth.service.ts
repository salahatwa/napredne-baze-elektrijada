import { Injectable } from '@angular/core'
import { Roles } from './roles.enum'
import { IUser } from 'src/app/models/user.interface'
import { BehaviorSubject, Observable, throwError } from 'rxjs'
import { CacheService } from '../cache.service'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { ApiEndpoints } from 'src/app/constants/api.endpoints'
import { map, catchError, tap } from 'rxjs/operators'
import { transformError } from 'src/app/common'

interface IServerAuthResponse {
  roles: string[]
  user: IUser
  token: string
}

const defaultAuthStatus: IUser = {
  id: -1,
  age: null,
  name: null,
  email: null,
  roles: [Roles.NONE],
}

@Injectable({
  providedIn: 'root',
})
export class AuthService extends CacheService {
  authStatus = new BehaviorSubject<IUser>(this.getItem('authStatus') || defaultAuthStatus)

  constructor(private http: HttpClient) {
    super()
  }

  private authProvider(email: string, password: string): Observable<IServerAuthResponse> {
    return this.http
      .post<{ data: IServerAuthResponse }>(
        environment.API_ENDPOINT + ApiEndpoints.LOGIN,
        {
          email,
          password,
        }
      )
      .pipe(map((value: { data: IServerAuthResponse }) => value.data))
  }

  login(email: string, password: string): Observable<IUser> {
    const loginResponse = this.authProvider(email, password).pipe(
      map(data => {
        this.setToken(data.token)
        const user = data.user
        user.roles = data.roles
        return user
      }),
      catchError(transformError)
    )

    return loginResponse.pipe(
      tap(res => {
        this.setItem('authStatus', res)
        this.authStatus.next(res as IUser)
      }),
      catchError(err => {
        this.logout()
        return throwError(err)
      })
    ) as Observable<IUser>
  }

  logout() {
    this.clearToken()
    this.authStatus.next(defaultAuthStatus)
  }

  private setToken(jwt: string) {
    this.setItem('token', jwt)
  }

  getToken(): string {
    return this.getItem('token') || ''
  }

  private clearToken() {
    this.removeItem('token')
  }

  get isAuthenticated(): boolean {
    return (
      this.authStatus.getValue().id !== -1 &&
      this.getToken() !== null &&
      this.getToken() !== undefined &&
      this.getToken().length !== 0
    )
  }

  get roles(): string[] {
    return this.authStatus.getValue().roles
  }
}
