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
  user: IUser
  token: string
}

const defaultAuthStatus: IUser = {
  _id: null,
  name: null,
  username: null,
  email: null,
  roles: [Roles.NONE],
}

@Injectable({
  providedIn: 'root',
})
export class AuthService extends CacheService {
  authStatus = new BehaviorSubject<IUser>(this.getItem('authStatus') || defaultAuthStatus)
  currentUser: IUser

  constructor(private http: HttpClient) {
    super()
    this.authStatus.subscribe(user => (this.currentUser = user))
  }

  private authProvider(
    username: string,
    password: string
  ): Observable<IServerAuthResponse> {
    return this.http.post<IServerAuthResponse>(
      environment.API_ENDPOINT + ApiEndpoints.LOGIN,
      {
        username,
        password,
      }
    )
  }

  login(username: string, password: string): Observable<IUser> {
    const loginResponse = this.authProvider(username, password).pipe(
      map(data => {
        this.setToken(data.token)
        const user = data.user
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
      this.authStatus.getValue() &&
      this.authStatus.getValue()._id &&
      this.getToken() !== null &&
      this.getToken() !== undefined &&
      this.getToken().length !== 0
    )
  }

  get roles(): string[] {
    return this.authStatus.getValue().roles
  }

  get user(): IUser {
    return this.getItem('authStatus')
  }
}
