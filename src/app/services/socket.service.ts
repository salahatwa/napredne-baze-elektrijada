import { filter } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { SocketEventTypes } from '../constants/socket-event-types';
import { AuthService } from './auth/auth.service';
import { environment } from 'src/environments/environment';

export interface ISocketEvent<T> {
  data: T;
  type: string;
}

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket;
  public socketSubject: Subject<ISocketEvent<any>> = null;
  constructor(public authService: AuthService) {
    this.socketSubject = new Subject();
  }

  initSocket() {
    if (!this.socket) {
      this.connect();
    }
  }

  private connect() {
    this.socket = io.connect(environment.SOCKET_URL, {
      secure: true,
      rejectUnauthorized: false,
      query: {
        token: this.authService.getToken(),
        user: JSON.stringify(this.authService.user),
      },
    });
    Object.values(SocketEventTypes).forEach((event) => {
      return this.socket.on(event, (data) => {
        this.socketSubject.next({ data, type: event } as ISocketEvent<any>);
      });
    });
  }

  sendEvent<T>(eventName: string, eventPayload: T) {
    this.socket.emit(eventName, eventPayload);
  }

  getEvent(eventName: string) {
    return this.socketSubject.pipe(filter(({ type }) => type === eventName));
  }
}
