import { IFriendship } from './../models/IFriendship';
import { IPaginationResponse } from './../models/IPaginationResponse';
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { makePagination } from '../common'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class FriendshipService {
  public route = 'friends/'
  constructor(private http: HttpClient) {}

  getMyFriends(skip?: number, take?: number) {
    const params = makePagination(skip, take)
    return this.http.get<IPaginationResponse<IFriendship>>(environment.API_ENDPOINT + this.route, { params })
  }

  deleteFriend(friendshipId: string) {
    return this.http.delete<IFriendship>(
      environment.API_ENDPOINT + this.route + friendshipId
    )
  }
}
