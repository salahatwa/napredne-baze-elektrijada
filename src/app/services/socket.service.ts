import { Injectable } from '@angular/core'
import { Subject, Observable } from 'rxjs'
import * as io from 'socket.io-client'
import { SocketEventTypes } from '../constants/socket-event-types'
import { AuthService } from './auth/auth.service'
import { environment } from 'src/environments/environment'

export interface ISocketEvent<T> {
  data: T
  type: string
}

export const USER_LISTENERS: string[] = [
  SocketEventTypes.NOTIFICATION,
  SocketEventTypes.MESSAGE,
]
@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket
  public socketSubject: Subject<any> = null
  constructor(public authService: AuthService) {}

  initSocket() {
    if (!this.socketSubject) {
      this.socketSubject = this.connect()
    }
  }

  private connect(): Subject<any> {
    this.socket = io.connect(environment.SOCKET_URL, {
      secure: true,
      rejectUnauthorized: false,
      query: {
        token: this.authService.getToken(),
        user: JSON.stringify(this.authService.user),
      },
    })
    const observable = new Observable(observer => {
      USER_LISTENERS.forEach(event => {
        console.log(event)
        return this.socket.on(event, data => {
          observer.next({ data, type: event } as ISocketEvent<any>)
        })
      })
    })

    return Subject.create(null, observable)
  }

  sendEvent<T>(eventName: string, eventPayload: T) {
    this.socket.emit(eventName, eventPayload)
  }
}
