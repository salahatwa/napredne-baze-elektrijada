import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IPost } from 'src/app/models/IPost';
import * as faker from 'faker';
import { IComment } from 'src/app/models/IComment';
import { IEvent } from 'src/app/models/IEvent';
import { PostService } from 'src/app/services/post.service';
import { IUser } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Roles } from 'src/app/services/auth/roles.enum';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Output() postRemoved = new EventEmitter<IPost>();

  @Input() post: IPost;

  event: IEvent;

  currentUser: IUser;

  constructor(
    private postService: PostService,
    private authService: AuthService
  ) {
    this.currentUser = this.authService.currentUser;
  }

  ngOnInit() {
    this.event = this.post as IEvent; // for sake of recommendations
  }

  addComment(commentBody: IComment) {
    this.postService.addComment(this.post._id, commentBody).subscribe((comment) => {
      this.post.comments = [...this.post.comments, comment];
    });
  }

  removeComment(comment: IComment) {
    if (confirm('Are you sure you want to delete comment?')) {
      this.postService.deleteComment(comment._id).subscribe(() => {
        this.post.comments = this.post.comments.filter(
          (com) => com !== comment
        );
      });
    }
  }

  get isEvent() {
    if ((this.post as IEvent).startsAt) {
      return true;
    }
    return false;
  }

  get isAdmin(): boolean {
    return this.currentUser.roles.includes(Roles.ADMIN);
  }
}
