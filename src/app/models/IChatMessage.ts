import { IEvent } from './IEvent';
import { IPost } from './IPost';
import { IUser } from './user.interface';
import { IChatSession } from './IChatSession';

export type MessageDataType = 'Post';
export interface IChatMessage {
  _id?: string;
  text?: string;
  sender: string | IUser;
  data?: IEvent | IPost | string;
  onModel?: MessageDataType;
  session: string | IChatSession;
  filesBase64?: string[];
  files?: string[];
  createdAt: string;
  ref?: string;
}
