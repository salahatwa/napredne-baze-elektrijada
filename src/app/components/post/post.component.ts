import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { IPost } from "src/app/models/IPost";
import * as faker from "faker";
import { IComment } from "src/app/models/IComment";
import { IEvent } from "src/app/models/IEvent";
import { PostService } from "src/app/services/post.service";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.scss"],
})
export class PostComponent implements OnInit {
  @Output() postRemoved = new EventEmitter<IPost>();

  @Input() post: IPost = {
    _id: faker.random.uuid(),
    user: {
      _id: faker.random.uuid(),
      name: faker.name.findName(),
      imageURL: faker.image.avatar(),
    },
    title: faker.name.title(),
    text: faker.lorem.paragraph(),
    comments: Array.from({ length: 5 }, (v, i) => {
      return {
        createdAt: faker.date.recent().toDateString(),
        text: faker.lorem.paragraph(),
        user: { name: faker.name.findName(), imageURL: faker.image.avatar() },
        imageURL: i % 2 === 0 ? faker.image.cats() : null,
      } as IComment;
    }),
    createdAt: faker.date.recent().toDateString(),
  };

  event: IEvent;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.event = this.post as IEvent; // for sake of recommendations
  }

  addComment(comment: IComment) {
    this.postService.addComment(this.post._id, comment).subscribe((comment) => {
      this.post.comments = [...this.post.comments, comment];
    });
  }

  removeComment(comment: IComment) {
    this.post.comments = this.post.comments.filter((com) => com !== comment);
  }

  get isEvent() {
    if ((this.post as IEvent).startsAt) {
      return true;
    }
    return false;
  }
}
