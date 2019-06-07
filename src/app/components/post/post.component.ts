import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { IPost } from 'src/app/models/IPost'
import * as faker from 'faker'
import { IComment } from 'src/app/models/IComment'
import { IEvent } from 'src/app/models/IEvent'
import * as moment from 'moment'
import { transformDateNumber } from '../../common'

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

  event: IEvent

  constructor() {}

  ngOnInit() {
    this.event = this.post as IEvent // for sake of recommendations
    console.log()
  }

  addComment(comment: IComment) {
    this.post.comments.push(comment)
  }

  removeComment(comment: IComment) {
    this.post.comments = this.post.comments.filter(com => com !== comment)
  }

  get isEvent() {
    if ((this.post as IEvent).startDate) {
      return true
    }
    return false
  }

  eventTime(start: boolean) {
    const { startDate, startTime, endDate, endTime } = this.event
    const date = start ? startDate : endDate
    const time = start ? startTime : endTime
    return moment(
      `${date.get('year')}-${date.get('month') + 1}-${date.get('date')} ${time.hour}:${
        time.minute
      }`
    ).format('ddd Do MMM h:mm:ss a')
  }
}
