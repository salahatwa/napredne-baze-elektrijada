import { PostTypes } from 'src/app/constants/post-types.enum';
import { IComment } from './IComment';
import { IUser } from './user.interface';

export interface IPost {
  _id?: string;
  user: IUser;
  section: string;
  title: string;
  comments?: IComment[];
  createdAt: string;
  text: string;
  __t: 'TextPost' | 'EventPost';
}
