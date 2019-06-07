import { IUser } from './user.interface'

export interface IComment {
  user: IUser
  text?: string
  createdAt: string
  imageURL?: string
}
