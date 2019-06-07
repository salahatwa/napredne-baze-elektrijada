import { IUser } from './user.interface'

export interface IFriendship {
  sender: string | IUser //id
  receiver: string | IUser //id
  createdAt: string
  updatedAt: string
}
