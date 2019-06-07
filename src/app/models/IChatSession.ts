import { IUser } from './user.interface'
import { IChatMessage } from './IChatMessage'

export interface IChatSession {
  _id?: string
  participants: IUser[]
  type: string
  messages?: IChatMessage[]
}
