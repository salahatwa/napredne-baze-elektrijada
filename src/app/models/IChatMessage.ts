import { IEvent } from './IEvent'
import { IPost } from './IPost'
import { IUser } from './user.interface'
import { IChatSession } from './IChatSession'

export interface IChatMessage {
  _id: string
  text?: string
  sender: IUser | string
  data?: IEvent | IPost | string
  onModel?: string
  session: string | IChatSession
  filesBase64: string[]
}
