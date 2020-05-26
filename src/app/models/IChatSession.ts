import { IUser } from './user.interface';
import { IChatMessage } from './IChatMessage';

export interface IChatSession {
  _id?: string;
  name?: string;
  participants: IUser[];
  participantIds: string[];
  type: string;
  lastMessage?: IChatMessage;
}
