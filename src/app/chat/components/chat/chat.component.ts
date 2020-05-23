import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IChatSession } from 'src/app/models/IChatSession';
import { IUser } from 'src/app/models/user.interface';
import { SocketService } from 'src/app/services/socket.service';
import { ChatService } from 'src/app/services/chat.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  animations: [
    trigger('wipe', [
      state(
        'void',
        style({
          height: '50px',
          width: '50px',
          opacity: '0.5',
          borderRadius: '50%',
        })
      ),
      state(
        '*',
        style({
          height: '*',
          width: '*',
          opacity: '*',
          borderRadius: '*',
        })
      ),
      transition('void <=> *', animate('.15s .075s ease-out')),
    ]),
  ],
})
export class ChatComponent implements OnInit {
  isOpen = true;
  receiverId: string;
  loadingMsgs = false;
  totalMessages: number;
  receiver: IUser;
  session: IChatSession;
  inputValue = '';

  get userId() {
    return this.authService.currentUser._id;
  }

  @ViewChild('msgContainer', { static: true })
  msgContainer: ElementRef<HTMLDivElement>;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private chatService: ChatService,
    private socketService: SocketService
  ) {}

  ngOnInit() {
    this.socketService.initSocket();
  }

  getDistance() {
    const msgContainer = this.msgContainer.nativeElement;
    return (
      msgContainer.scrollHeight -
      (msgContainer.scrollTop + msgContainer.clientHeight)
    );
  }

  updateScroll() {
    const msgsEl = this.msgContainer.nativeElement;
    if (!msgsEl) return false;
    msgsEl.scrollTop = msgsEl.scrollHeight;
    return true;
  }

  tryUpdateScroll(distanceToBot: number) {
    if (distanceToBot <= 50) {
      /** we want to scroll only if user is near the bottom */
      this.updateScroll();
    }
  }

  createTmpSession() {
    this.session = {
      messages: [],
    } as IChatSession;
  }

  sendMessage() {
    console.log('tried to send message');
  }
}
