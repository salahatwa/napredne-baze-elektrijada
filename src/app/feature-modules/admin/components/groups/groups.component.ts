import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormComponent } from 'src/app/models/FormComponent';
import { Component, OnInit, Input } from '@angular/core';
import {
  Group,
  GroupService,
  GroupParticipant,
} from 'src/app/services/group.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent extends FormComponent<Group> implements OnInit {
  @Input() group: Group;
  groupForm: FormGroup = this.buildForm();

  constructor(
    private formBuilder: FormBuilder,
    private groupService: GroupService
  ) {
    super();
  }

  ngOnInit() {
    this.groupForm = this.buildForm(this.group);
  }

  buildForm(group?: Group) {
    return this.formBuilder.group({
      name: [group ? group.name : '', Validators.required],
    });
  }

  get editing(): boolean {
    return this.group !== null;
  }

  submit() {
    const group = this.groupForm.value;
    this.submitted.emit({
      ...group,
      _id: this.group ? this.group._id : undefined,
    });
    this.groupForm.reset();
    this.finished.emit();
  }

  resetForm() {
    this.groupForm.reset(this.group || {});
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
        .removeParticipant(this.group._id, participant.participantId)
        .subscribe(() => {
          this.group.participants = this.group.participants.filter(
            (part) => part.participantId !== participant.participantId
          );
        });
    }
  }
}
