import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IChatSession } from 'src/app/models/IChatSession';
import { Observable } from 'rxjs';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-all-sessions',
  templateUrl: './all-sessions.component.html',
  styleUrls: ['./all-sessions.component.scss'],
})
export class AllSessionsComponent implements OnInit {
  sessions$: Observable<IChatSession[]>;

  @Output() select = new EventEmitter<IChatSession>();

  constructor(private sessionService: SessionService) {
    this.sessions$ = this.sessionService.fetchSessions();
  }

  ngOnInit() {}

  getLastTwoParticipant(session: IChatSession) {
    // TODO remove me from participantss
    return session.participants.slice(-2);
  }
}
