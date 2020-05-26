import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsRoutingModule } from './groups-routing.module';
import { GroupsComponent } from './pages/groups/groups.component';
import { GroupService } from './services/group.service';
import { SharedModule } from '../feature-modules/shared/shared.module';
import { CreateGroupComponent } from './dialogs/create-group/create-group.component';
import { UserSelectComponent } from './components/user-select/user-select.component';
import { MatAutocompleteModule } from '@angular/material';
import { GroupPreviewComponent } from './dialogs/group-preview/group-preview.component';

@NgModule({
  declarations: [
    GroupsComponent,
    CreateGroupComponent,
    UserSelectComponent,
    GroupPreviewComponent,
  ],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    SharedModule,
    MatAutocompleteModule,
  ],
  entryComponents: [CreateGroupComponent, GroupPreviewComponent],
  providers: [GroupService],
})
export class GroupsModule {}
