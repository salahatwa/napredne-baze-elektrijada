import { IUser } from './user.interface';

export interface IFriendship {
  _id?: string;
  mario: IUser;
  luigi: IUser;
  marioId: string;
  luigiId: string;
  createdAt: string;
  updatedAt: string;
  chatSessionId: string;
}
