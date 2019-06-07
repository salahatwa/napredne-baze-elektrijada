import { IPost } from './IPost'

export interface IEvent extends IPost {
  startDate: string
  startTime: string
  endDate: string
  endTime: string
}
