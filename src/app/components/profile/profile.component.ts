import { FriendshipService } from './../../services/friendship.service';
import { IFriendship } from './../../models/IFriendship';
import { FriendRequestService } from './../../services/friend-request.service';
import { IFriendRequest } from './../../models/IFriendRequest';
import { UserService } from './../../services/user.service';
import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { Roles } from 'src/app/services/auth/roles.enum';
import { UserForm } from 'src/app/models/UserFormComponent';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { switchMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { SubsinkService } from 'src/app/services/subsink.service';
import { ImagePickerComponent } from 'src/app/feature-modules/shared/components/image-picker/image-picker.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [SubsinkService],
})
export class ProfileComponent extends UserForm implements OnInit {
  itsMe: boolean;
  isAdmin: boolean;
  rolesList = Object.keys(Roles).map((key) => Roles[key]);

  friend: IFriendship | null;
  friendRequest: IFriendRequest | null;

  @ViewChild(ImagePickerComponent, { static: true })
  imagePicker: ImagePickerComponent;

  constructor(
    injector: Injector,
    private route: ActivatedRoute,
    private authService: AuthService,
    private subsink: SubsinkService,
    private userService: UserService,
    private friendRequestService: FriendRequestService,
    private friendshipService: FriendshipService
  ) {
    super(injector);

    this.isAdmin = this.authService.currentUser.roles.includes(Roles.ADMIN);

    this.subsink.add(
      this.route.paramMap.subscribe((params) => {
        const id = params.get('id');
        this.itsMe = this.authService.currentUser._id === id;
        this.fetchUser(id);
      })
    );
  }

  ngOnInit() {
    super.ngOnInit();
  }

  fetchUser(id: string) {
    this.subsink.add(
      this.userService.getUserProfile(id).subscribe((profile) => {
        this.friend = profile.friendship;
        this.friendRequest = profile.friendRequest;
        this.user = profile.user;
        this.userForm = this.buildForm(this.user);
      })
    );
  }

  editUser() {
    this.subsink.add(
      this.userService
        .updateUserProfile(this.getUserBody())
        .subscribe((user) => {
          this.userForm = this.buildForm(user);
        })
    );
  }

  resetInitialForm() {
    this.userForm.reset(this.user);
    this.imagePicker.reset();
  }

  updateImage(base64: string) {
    this.userForm.markAsDirty();
    this.userForm.patchValue({ imageBase64: base64 });
  }

  sendFriendRequest() {
    this.subsink.add(
      this.friendRequestService
        .sendFriendRequestToUser(this.user._id)
        .subscribe((request) => {
          this.friendRequest = request;
        })
    );
  }

  denyFriendRequest(requestId: string) {
    this.subsink.add(
      this.friendRequestService
        .deleteMyFriendRequest(requestId)
        .subscribe(() => {
          this.friendRequest = null;
        })
    );
  }

  acceptFriendRequest(requestId: string) {
    this.subsink.add(
      this.friendRequestService
        .acceptFriendRequest(requestId)
        .subscribe((friendship) => {
          this.friendRequest = null;
          this.friend = friendship;
        })
    );
  }

  removeFriend(friendshipId: string) {
    this.subsink.add(
      this.friendshipService.deleteFriend(friendshipId).subscribe(() => {
        this.friend = null;
      })
    );
  }

  get myUserId() {
    return this.authService.currentUser._id;
  }
}
