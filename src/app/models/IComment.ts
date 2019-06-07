import { IUser } from './user.interface'

export interface IComment {
  _id: string
  user: IUser
  text?: string
  createdAt: string
  imageURL?: string
  imageBase64?: string //ovako mi saljes
}
