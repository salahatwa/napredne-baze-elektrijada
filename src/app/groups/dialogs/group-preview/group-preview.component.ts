import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CreateGroupComponent } from '../create-group/create-group.component';
import {
  Group,
  GroupService,
  GroupParticipant,
} from '../../services/group.service';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-group-preview',
  templateUrl: './group-preview.component.html',
  styleUrls: ['./group-preview.component.scss'],
})
export class GroupPreviewComponent implements OnInit {
  invitationsForm = this.formBuilder.group({
    users: [[]],
  });

  get formUsers() {
    return (this.invitationsForm.get('users') || { value: [] })
      .value as string[];
  }

  get currentGroupUserIds() {
    return this.data.participants.map((p) => p.participantId);
  }

  get currentUserId() {
    return this.authService.currentUser._id;
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private groupService: GroupService,
    public dialogRef: MatDialogRef<CreateGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Group
  ) {}

  ngOnInit() {}

  sendInvitations() {
    this.groupService
      .sendInvitations(this.data._id, this.invitationsForm.get('users').value)
      .subscribe((grp: Group) => {
        this.data.participants = grp.participants;
        this.invitationsForm.reset();
      });
  }

  removeFromGroup(participant: GroupParticipant) {
    if (
      confirm(
        `Are you sure you want to remove ${
          participant.participant.name || participant.participant.username
        }?`
      )
    ) {
      this.groupService
        .removeParticipant(this.data._id, participant.participantId)
        .subscribe(() => {
          this.data.participants = this.data.participants.filter(
            (part) => part.participantId !== participant.participantId
          );
        });
    }
  }

  deleteGroup() {
    if (confirm(`Are you sure you want to delete group: ${this.data.name}?`)) {
      this.groupService.deleteGroup(this.data._id).subscribe(() => {
        this.close(this.data);
      });
    }
  }

  close(group?: Group): void {
    this.dialogRef.close(group);
  }
}
