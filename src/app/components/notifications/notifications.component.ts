import { SocketEventTypes } from './../../constants/socket-event-types';
import { SubsinkService } from 'src/app/services/subsink.service';
import { SocketService } from 'src/app/services/socket.service';
import { NotificationService } from './../../services/notification.service';
import { INotification } from './../../models/INotification';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  providers: [SubsinkService],
})
export class NotificationsComponent implements OnInit {
  DEFAULT_TAKE = 50;
  notifications: INotification[] = [];
  totalNotOpened = 0;

  constructor(
    private notificationService: NotificationService,
    private socketService: SocketService,
    private subsinkService: SubsinkService
  ) {
    this.socketService.initSocket();
  }

  ngOnInit() {
    this.getNotifications();
    this.initializeListeners();
  }

  initializeListeners() {
    this.subsinkService.add(
      this.socketService
        .getEvent(SocketEventTypes.NOTIFICATION)
        .subscribe(({ data }: { data: INotification }) => {
          this.totalNotOpened++;
          this.notifications = [data, ...this.notifications];
        })
    );
  }

  getNotifications(skip: number = 0) {
    this.notificationService
      .getNotifications(skip, this.DEFAULT_TAKE)
      .subscribe(({ notifications, totalNotOpened }) => {
        this.notifications = [...this.notifications, ...notifications.docs];
        this.totalNotOpened = totalNotOpened;
      });
  }

  readNotification(notification: INotification) {
    if (notification.openedAt) {
      return;
    }
    this.notificationService
      .setNotificationAsOpened(notification._id)
      .subscribe();
    notification.openedAt = new Date();
    this.totalNotOpened--;
  }
}
