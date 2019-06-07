import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { IUserProfile } from '../models/IUserProfile'
import { IUser } from '../models/user.interface'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public route = 'user/'
  constructor(private http: HttpClient) {}

  getUserProfile(userId: string) {
    return this.http.get<IUserProfile>(environment.API_ENDPOINT + this.route + userId)
  }

  updateUserProfile(user: IUser) {
    return this.http.put<IUser>(environment.API_ENDPOINT + this.route + user._id, user)
  }
}
