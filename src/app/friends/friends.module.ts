import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FriendsRoutingModule } from './friends-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SharedModule } from '../feature-modules/shared/shared.module';
import { FriendsComponent } from './pages/friends/friends.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [FriendsComponent],
  imports: [
    CommonModule,
    FriendsRoutingModule,
    SharedModule,
    MatTabsModule,
    MatPaginatorModule,
  ],
  entryComponents: [],
  providers: [],
})
export class FriendsModule {}
