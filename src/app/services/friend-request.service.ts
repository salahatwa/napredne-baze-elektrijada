import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { makePagination } from '../common'
import { environment } from 'src/environments/environment'
import { IPaginationResponse } from '../models/IPaginationResponse'
import { IFriendRequest } from '../models/IFriendRequest'
import { IFriendship } from '../models/IFriendship'

@Injectable({
  providedIn: 'root',
})
export class FriendRequestService {
  public route = 'friend_requests/'
  constructor(private http: HttpClient) {}

  getMyPendingFriendRequests(skip?: number, take?: number) {
    const params = makePagination(skip, take)
    return this.http.get<IPaginationResponse<IFriendRequest>>(
      environment.API_ENDPOINT + this.route + 'received',
      { params }
    )
  }

  getMySentPendingFriendRequests(skip?: number, take?: number) {
    const params = makePagination(skip, take)
    return this.http.get<IPaginationResponse<IFriendRequest>>(
      environment.API_ENDPOINT + this.route + 'sent',
      { params }
    )
  }

  sendFriendRequestToUser(userId: string) {
    // 409 ERROR IF EXISTS
    return this.http.post<IFriendRequest>(
      environment.API_ENDPOINT + this.route + userId,
      {}
    )
  }

  acceptFriendRequest(requestId: string) {
    return this.http.post<IFriendship>(
      environment.API_ENDPOINT + this.route + requestId + '/accept',
      {}
    )
  }


  deleteMyFriendRequest(requestId: string) {
    return this.http.delete<IFriendRequest>(
      environment.API_ENDPOINT + this.route + requestId
    )
  }
}
