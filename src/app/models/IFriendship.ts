import { IUser } from './user.interface'

export interface IFriendship {
  _id?: string
  sender: string | IUser //id
  receiver: string | IUser //id
  createdAt: string
  updatedAt: string
}
