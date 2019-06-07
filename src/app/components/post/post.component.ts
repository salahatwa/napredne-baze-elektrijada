import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { IPost } from 'src/app/models/IPost'
import * as faker from 'faker'
import { IComment } from 'src/app/models/IComment'

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Output() postRemoved = new EventEmitter<IPost>()

  @Input() post: IPost = {
    user: { name: faker.name.findName(), imageURL: faker.image.avatar() },
    title: faker.name.title(),
    text: faker.lorem.paragraph(),
    comments: Array.from({ length: 5 }, (v, i) => {
      return {
        createdAt: faker.date.recent().toDateString(),
        text: faker.lorem.paragraph(),
        user: { name: faker.name.findName(), imageURL: faker.image.avatar() },
        imageURL: i % 2 === 0 ? faker.image.cats() : null,
      } as IComment
    }),
    createdAt: faker.date.recent().toDateString(),
  }

  constructor() {}

  ngOnInit() {
    console.log(faker.name.findName())
  }

  addComment(comment: IComment) {
    this.post.comments.push(comment)
  }

  removeComment(comment: IComment) {
    this.post.comments = this.post.comments.filter(com => com !== comment)
  }
}
