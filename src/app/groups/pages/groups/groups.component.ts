import { Component, OnInit } from '@angular/core';
import { Group, GroupService } from '../../services/group.service';
import { MatDialog } from '@angular/material';
import { CreateGroupComponent } from '../../dialogs/create-group/create-group.component';
import { GroupPreviewComponent } from '../../dialogs/group-preview/group-preview.component';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent implements OnInit {
  groups: Group[];

  constructor(private groupService: GroupService, public dialog: MatDialog) {
    this.groupService
      .fetchGroups()
      .subscribe((res) => (this.groups = res.docs));
  }

  ngOnInit() {}

  openCreateGroupDialog(): void {
    const dialogRef = this.dialog.open(CreateGroupComponent);
    dialogRef.afterClosed().subscribe((grp) => grp && this.groups.push(grp));
  }

  openGroupPreview(group: Group): void {
    const dialogRef = this.dialog.open(GroupPreviewComponent, {
      data: group,
    });
    dialogRef.afterClosed().subscribe((grp: Group) => {
      if (grp) {
        this.groups = this.groups.filter((g) => g._id !== grp._id);
      }
    });
  }
}
