import { IUser } from 'src/app/models/user.interface';
export interface IFriendRequest {
  _id?: string;
  sender: IUser;
  receiver: IUser;
  senderId: string;
  receiverId: string;
  createdAt: string;
  updatedAt: string;
}
