import { AuthService } from 'src/app/services/auth/auth.service';
import { map } from 'rxjs/operators';
import { ChatService } from 'src/app/services/chat.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IChatSession } from 'src/app/models/IChatSession';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-all-sessions',
  templateUrl: './all-sessions.component.html',
  styleUrls: ['./all-sessions.component.scss'],
})
export class AllSessionsComponent implements OnInit {
  sessions$: Observable<IChatSession[]>;

  @Output() select = new EventEmitter<IChatSession>();

  constructor(
    private chatService: ChatService,
    private authService: AuthService
  ) {
    this.sessions$ = this.chatService
      .getSessions()
      .pipe(map((data) => data.docs));
  }

  ngOnInit() {}

  getLastTwoParticipant(session: IChatSession) {
    return session.participants
      .filter(
        (participant) => participant._id !== this.authService.currentUser._id
      )
      .slice(-2);
  }
}
