import { IUser } from './user.interface'
import { IFriendRequest } from './IFriendRequest'
import { IFriendship } from './IFriendship'

export interface IUserProfile {
  user: IUser
  friendRequest: IFriendRequest
  friendship: IFriendship
}
