import { IChatMessage } from 'src/app/models/IChatMessage';
import { SocketEventTypes } from './../../../constants/socket-event-types';
import { SocketService } from 'src/app/services/socket.service';
import { SubsinkService } from 'src/app/services/subsink.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IChatSession } from 'src/app/models/IChatSession';

@Component({
  selector: 'app-all-sessions',
  templateUrl: './all-sessions.component.html',
  styleUrls: ['./all-sessions.component.scss'],
  providers: [SubsinkService],
})
export class AllSessionsComponent implements OnInit {
  sessions: IChatSession[];

  @Output() select = new EventEmitter<IChatSession>();

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private subsink: SubsinkService,
    private socketService: SocketService
  ) {
    this.chatService.getSessions(0, 50).subscribe((data) => {
      this.sessions = data.docs;
    });
  }

  ngOnInit() {}

  getNParticipants(session: IChatSession, sliceTo) {
    return session.participants
      .filter(
        (participant) => participant._id !== this.authService.currentUser._id
      )
      .slice(-sliceTo);
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
            const appSession = this.sessions.find(
              (appSess) => appSess._id === session._id
            );
            if (appSession) {
              appSession.lastMessage = message;
            }
          }
        ),
      this.socketService.getEvent(SocketEventTypes.SESSION_REMOVED)
        .subscribe(({ data: { sessionId } }) => {
          console.log(this.sessions,sessionId);
          this.sessions = this.sessions.filter(
            (session) => session._id !== sessionId
          );
        }),
      this.socketService.getEvent(SocketEventTypes.SESSION_CHANGED)
        .subscribe(({ data: { session } }) => {
          const sessionIndex = this.sessions.findIndex(
            (appSess) => appSess._id === session._id
          );
          if (sessionIndex !== -1) {
            this.sessions[sessionIndex] = session;
          }
        })
    );
  }
}
