import { IChatSession } from 'src/app/models/IChatSession';
import { IChatMessage } from 'src/app/models/IChatMessage';
import { SocketEventTypes } from './../../../constants/socket-event-types';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
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
import { SubsinkService } from 'src/app/services/subsink.service';

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
  providers: [SubsinkService],
})
export class ChatComponent implements OnInit {
  isOpen = false;
  receiverId: string;
  loadingMsgs = false;
  totalMessages: number;
  receiver: IUser;
  session: IChatSession;
  messages: IChatMessage[];
  inputValue = '';

  get userId() {
    return this.authService.currentUser._id;
  }

  @ViewChild('msgContainer', { static: true })
  msgContainer: ElementRef<HTMLDivElement>;

  constructor(
    private authService: AuthService,
    private chatService: ChatService,
    private socketService: SocketService,
    private subsink: SubsinkService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.socketService.initSocket();
    this.initializeListeners();
    this.subsink.add(
      this.route.queryParamMap.subscribe((paramMap) => {
        const sessionId = paramMap.get('sessionId');
        if (sessionId) {
          this.loadSessionAndMessages(sessionId);
          this.isOpen = true;
        }
      })
    );
  }

  initializeListeners() {
    this.subsink.add(
      this.socketService.getEvent(SocketEventTypes.MESSAGE)
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
        ),
      this.socketService.getEvent(SocketEventTypes.SESSION_CREATED)
        .subscribe(({ data: { sessionId } }) => {
          if (!this.session) {
            this.router.navigate([], {
              queryParams: {
                sessionId: sessionId,
              },
            });
          }
        }),
      this.socketService.getEvent(SocketEventTypes.SESSION_REMOVED)
        .subscribe(({ data: { sessionId } }) => {
          if (this.session && this.session._id === sessionId) {
            this.leaveSession();
          }
        }),
      this.socketService.getEvent(SocketEventTypes.SESSION_CHANGED)
        .subscribe(({ data: { session } }) => {
          if (this.session && this.session._id === session._id) {
            this.session = session;
          }
        })
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
        if(session){
          this.session = session;
          // Only first time set messages, when skipping append to old
          if (!skip) {
            this.messages = messages.docs;
          } else {
            this.messages = [...this.messages, ...messages.docs];
          }
          this.totalMessages = messages.total;
        }
      });
  }

  getUser(userId: string) {
    return (
      this.session &&
      this.session.participants.find(
        (participant) => participant._id === userId
      )
    );
  }

  leaveSession() {
    this.session = null;
    this.router.navigate([], {
      queryParams: {
        sessionId: null,
      },
    });
  }

  minimizeSession() {
    this.isOpen = false;
    this.router.navigate([], {
      queryParams: {
        sessionId: null,
      },
    });
  }
}
