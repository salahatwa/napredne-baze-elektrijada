import { IChatMessage } from 'src/app/models/IChatMessage';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { makePagination } from '../common';
import { IPaginationResponse } from '../models/IPaginationResponse';
import { IChatSession } from '../models/IChatSession';
import { IUser } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public route = 'chat/sessions/';
  constructor(private http: HttpClient) {}

  getSessions(skip?: number, take?: number) {
    const params = makePagination(skip, take);
    return this.http.get<IPaginationResponse<IChatSession>>(
      environment.API_ENDPOINT + this.route,
      { params }
    );
  }

  getSessionWithMessages(sessionId: string, skip?: number, take?: number) {
    const params = makePagination(skip, take);
    return this.http.get<SessionWithMessages>(
      environment.API_ENDPOINT + this.route + sessionId,
      { params }
    );
  }
  sendMessageInSession(message: Partial<IChatMessage>, sessionId: string) {
    return this.http.post<IChatMessage>(
      environment.API_ENDPOINT + this.route + sessionId + '/messages',
      message
    );
  }

  getSessionByUserId(userId: string, skip?: number, take?: number) {
    const params = makePagination(skip, take);
    return this.http.get<SessionWithMessageAndUser>(
      environment.API_ENDPOINT + this.route + 'users/' + userId,
      { params }
    );
  }
}

export interface SessionWithMessages {
  session: IChatSession;
  messages: IPaginationResponse<IChatMessage>;
}

export interface SessionWithMessageAndUser extends SessionWithMessages {
  user: IUser;
}
