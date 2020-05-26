import { IUser } from 'src/app/models/user.interface';
import { FriendRequestService } from './../../../services/friend-request.service';
import { FriendshipService } from './../../../services/friendship.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { IFriendship } from './../../../models/IFriendship';
import { IFriendRequest } from './../../../models/IFriendRequest';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent implements OnInit {
  DEFAULT_TAKE = 10;
  friendRequests: IFriendRequest[] = [];
  sentRequests: IFriendRequest[] = [];
  friends: IUser[] = [];
  friendships: IFriendship[] = [];
  isLoading = true;

  friendsTotal = 0;
  friendRequestsTotal = 0;
  sentRequestsTotal = 0;

  constructor(
    private authService: AuthService,
    private friendshipService: FriendshipService,
    private friendRequestService: FriendRequestService
  ) {}

  ngOnInit() {
    this.loadInitialData();
  }

  loadInitialData() {
    this.getFriends();
    this.getFriendRequests();
    this.getSentRequests();
  }

  getFriends = (skip: number = 0) => {
    this.friendshipService
      .getMyFriends(skip, this.DEFAULT_TAKE)
      .subscribe((data) => {
        this.friendsTotal = data.total;
        this.friends = data.docs.map((friendship) =>
          this.getFriend(friendship)
        );
        this.friendships = data.docs;
      });
  };

  getFriendRequests = (skip: number = 0) => {
    this.friendRequestService
      .getMyPendingFriendRequests(skip, this.DEFAULT_TAKE)
      .subscribe((data) => {
        this.friendRequestsTotal = data.total;
        this.friendRequests = data.docs;
      });
  };

  getSentRequests = (skip: number = 0) => {
    this.friendRequestService
      .getMySentPendingFriendRequests(skip, this.DEFAULT_TAKE)
      .subscribe((data) => {
        this.sentRequestsTotal = data.total;
        this.sentRequests = data.docs;
      });
  };

  getFriend(friendship: IFriendship): IUser {
    return friendship.luigiId === this.authService.currentUser._id
      ? friendship.mario
      : friendship.luigi;
  }

  getFriendship(friendId:string):IFriendship{
    return this.friendships.find(
      (friendship) => this.getFriend(friendship)._id === friendId
    );
  }

  changePage(event: PageEvent, fetchFunction: Function) {
    const { pageIndex } = event;
    fetchFunction(this.DEFAULT_TAKE * pageIndex);
  }

  removeFriend(friendId: string) {
    if (confirm('You want to remove friend?')) {
      const friendship = this.getFriendship(friendId)
      this.friendshipService.deleteFriend(friendship._id).subscribe(() => {
        this.friends = this.friends.filter((friend) => friend._id !== friendId);
      });
    }
  }

  denyFriendRequest(requestId: string) {
    if (confirm('Are you sure you want to deny request?')) {
      this.friendRequestService
        .deleteMyFriendRequest(requestId)
        .subscribe(() => {
          this.friendRequests = this.friendRequests.filter(
            (request) => request._id !== requestId
          );
        });
    }
  }

  cancelFriendRequest(requestId: string) {
    if (confirm('Are you want to cancel pending request?')) {
      this.friendRequestService
        .deleteMyFriendRequest(requestId)
        .subscribe(() => {
          this.sentRequests = this.sentRequests.filter(
            (request) => request._id !== requestId
          );
        });
    }
  }

  acceptFriendRequest(requestId: string) {
    if (confirm('Are you want to accept friend?')) {
      this.friendRequestService
        .acceptFriendRequest(requestId)
        .subscribe((friendship) => {
          this.friends = [this.getFriend(friendship), ...this.friends];
          this.friendRequests = this.friendRequests.filter(
            (request) => request._id !== requestId
          );
        });
    }
  }
}
