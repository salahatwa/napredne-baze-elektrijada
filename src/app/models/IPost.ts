import { IComment } from './IComment'
import { IUser } from './user.interface'

export interface IPost {
  user: IUser
  title: string
  comments: IComment[]
  createdAt: string
  text: string
}
