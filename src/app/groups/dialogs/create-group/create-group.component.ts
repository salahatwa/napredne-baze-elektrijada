import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { GroupService, Group } from 'src/app/services/group.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss'],
})
export class CreateGroupComponent implements OnInit {
  groupForm = this.formBuilder.group({
    name: ['', Validators.required],
    participantIds: [[]],
  });

  constructor(
    public dialogRef: MatDialogRef<CreateGroupComponent>,
    private groupService: GroupService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  createGroup() {
    this.groupService
      .createGroup(this.groupForm.value as Group)
      .subscribe((grp) => {
        this.dialogRef.close(grp);
      });
  }
}
