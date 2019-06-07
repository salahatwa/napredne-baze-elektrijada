import { IPost } from './IPost'
import { Moment } from 'moment'

export interface IEvent extends IPost {
  startDate: Moment
  startTime: {
    hour: string
    minute: string
    second: string
  }
  endDate: Moment
  endTime: {
    hour: string
    minute: string
    second: string
  }
}
