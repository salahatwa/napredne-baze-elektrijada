import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IPost } from 'src/app/models/IPost';
import { ChatService } from 'src/app/services/chat.service';
import { IChatSession } from 'src/app/models/IChatSession';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-share-post',
  templateUrl: './share-post.component.html',
  styleUrls: ['./share-post.component.scss'],
})
export class SharePostComponent implements OnInit {
  sessions: IChatSession[] = [];
  sentTo: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<SharePostComponent>,
    private chatService: ChatService,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: IPost
  ) {}

  ngOnInit() {
    this.chatService
      .getSessions()
      .subscribe((res) => (this.sessions = res.docs));
  }

  getChatName(session: IChatSession) {
    return (
      session.participants.find(
        (p) => p._id !== this.authService.currentUser._id
      ) || { username: '' }
    ).username;
  }

  sendPostAsMessage(sessionId: string) {
    this.sentTo.push(sessionId);
  }

  close(): void {
    this.dialogRef.close();
  }
}
