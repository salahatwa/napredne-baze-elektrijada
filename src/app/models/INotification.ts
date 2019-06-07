import { IUser } from './user.interface'

export interface INotification {
  _id?: string
  text: string
  relativeLink: string
  emitter: IUser
  receiver: string
  openedAt: Date
}
