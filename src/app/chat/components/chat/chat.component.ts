import { IChatSession } from './../../../models/IChatSession';
import { IChatMessage } from 'src/app/models/IChatMessage';
import { SocketEventTypes } from './../../../constants/socket-event-types';
import { filter } from 'rxjs/operators';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/models/user.interface';
import { SocketService, ISocketEvent } from 'src/app/services/socket.service';
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
export class ChatComponent implements OnInit, OnDestroy {
  isOpen = true;
  receiverId: string;
  loadingMsgs = false;
  totalMessages: number;
  receiver: IUser;
  session: IChatSession;
  messages: IChatMessage[];
  inputValue = '';
  subscriptions = [];

  get userId() {
    return this.authService.currentUser._id;
  }

  @ViewChild('msgContainer', { static: true })
  msgContainer: ElementRef<HTMLDivElement>;

  constructor(
    private authService: AuthService,
    private chatService: ChatService,
    private socketService: SocketService
  ) {}

  ngOnInit() {
    this.socketService.initSocket();
    this.initializeListeners();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  initializeListeners() {
    this.subscriptions.push(
      this.socketService.socketSubject
        .pipe(filter(({ type }) => type === SocketEventTypes.MESSAGE))
        .subscribe(
          ({
            data: { session, message },
          }: {
            data: { session: IChatSession; message: IChatMessage };
          }) => {
            if (this.session && this.session._id === session._id) {
              if (
                !this.messages.some(
                  (appMessage) =>
                    appMessage._id === message._id ||
                    (appMessage.ref &&
                      message.ref &&
                      appMessage.ref === message.ref)
                )
              ) {
                this.messages.push(message);
              }
            }
          }
        )
    );
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

  sendMessage() {
    const message = {
      ref: `${Math.random() * 10e20}`,
      text: this.inputValue,
      sender: this.authService.currentUser._id,
      session: this.session,
      createdAt: new Date().toString(),
    };
    this.messages.push(message);
    this.inputValue = '';
    this.chatService
      .sendMessageInSession(message, this.session._id)
      .subscribe((data) => {
        this.messages = this.messages.map((appMessages) =>
          appMessages.ref === data.ref ? data : appMessages
        );
      });
  }

  loadSessionAndMessages(sessionId: string, take = 15, skip = 0) {
    this.chatService
      .getSessionWithMessages(sessionId, skip, take)
      .subscribe(({ messages, session }) => {
        this.session = session;
        // Only first time set messages, when skipping append to old
        if (!skip) {
          this.messages = messages.docs;
        } else {
          this.messages = [...this.messages, ...messages.docs];
        }
        this.totalMessages = messages.total;
      });
  }


  getUser(userId:string){
    return this.session && this.session.participants.find(participant=>participant._id===userId)
  }
}
