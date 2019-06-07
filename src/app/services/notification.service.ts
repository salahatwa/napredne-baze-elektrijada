import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { makePagination } from '../common'
import { Observable } from 'rxjs'
import { IPaginationResponse } from '../models/IPaginationResponse'
import { INotification } from '../models/INotification'

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  public route = 'notification/'
  constructor(private http: HttpClient) {}

  getNotifications(skip?: number, take?: number) {
    const params = makePagination(skip, take)
    return this.http.get<IPaginationResponse<INotification>>(
      environment.API_ENDPOINT + this.route,
      { params }
    )
  }

  setNotificationAsOpened(notificationId: string) {
    return this.http.post<{ message: string }>(
      environment.API_ENDPOINT + this.route + '/' + notificationId,
      {}
    )
  }
}
