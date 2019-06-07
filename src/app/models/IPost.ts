import { IComment } from './IComment'
import { IUser } from './user.interface'

export interface IPost {
  _id: string
  user: IUser
  title: string
  comments?: IComment[]
  createdAt: string
  text: string
  __t?: PostTypes // samo u slucaju nasledjenih
}

export enum PostTypes {
  EVENT = 'EventPost',
  TEXT_POST = 'TextPost',
}
