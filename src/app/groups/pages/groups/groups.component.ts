import { Component, OnInit } from '@angular/core';
import { Group, GroupService } from '../../services/group.service';
import { MatDialog } from '@angular/material';
import { CreateGroupComponent } from '../../dialogs/create-group/create-group.component';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent implements OnInit {
  groups: Group[];

  constructor(private groupService: GroupService, public dialog: MatDialog) {
    this.groupService.fetchGroups().subscribe((grps) => (this.groups = grps));
  }

  ngOnInit() {}

  openCreateGroupDialog(): void {
    const dialogRef = this.dialog.open(CreateGroupComponent);

    // dialogRef.afterClosed().subscribe();
  }
}
