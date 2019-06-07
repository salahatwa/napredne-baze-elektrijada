import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { IChatMessage } from '../models/IChatMessage'
import { environment } from 'src/environments/environment'
import { makePagination } from '../common'
import { IPaginationResponse } from '../models/IPaginationResponse'
import { IChatSession } from '../models/IChatSession'

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public route = 'chat/'
  constructor(private http: HttpClient) {}

  sentPrivateMessage(message: IChatMessage, userId: string) {
    return this.http.post(
      environment.API_ENDPOINT + this.route + 'message/' + userId,
      message
    )
  }

  getSessions(skip?: number, take?: number) {
    const params = makePagination(skip, take)
    return this.http.get<IPaginationResponse<IChatSession>>(
      environment.API_ENDPOINT + this.route + 'session'
    )
  }

  getSessionByUserId(userId: string) {
    return this.http.get<IChatSession>(
      environment.API_ENDPOINT + this.route + 'user/' + userId
    )
  }

  getSessionBySessionId(sessionId: string) {
    return this.http.get<IChatSession>(
      environment.API_ENDPOINT + this.route + 'session/' + sessionId
    )
  }
}
