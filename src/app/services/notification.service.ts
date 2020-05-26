import { INotification } from './../models/INotification';
import { IPaginationResponse } from './../models/IPaginationResponse';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { makePagination } from '../common';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  public route = 'notifications/';
  constructor(private http: HttpClient) {}

  getNotifications(skip?: number, take?: number) {
    const params = makePagination(skip, take);
    return this.http.get<{
      notifications: IPaginationResponse<INotification>;
      totalNotOpened: number;
    }>(environment.API_ENDPOINT + this.route, { params });
  }

  setNotificationAsOpened(notificationId: string) {
    return this.http.post<{ message: string }>(
      environment.API_ENDPOINT +
        this.route +
        notificationId +
        '/opened-at',
      {}
    );
  }
}
