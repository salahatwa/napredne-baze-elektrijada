import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FriendsRoutingModule } from './friends-routing.module';
import { SharedModule } from '../feature-modules/shared/shared.module';
import { FriendsComponent } from './pages/friends/friends.component';

@NgModule({
  declarations: [FriendsComponent],
  imports: [
    CommonModule,
    FriendsRoutingModule,
    SharedModule,
  ],
  entryComponents: [],
  providers: [],
})
export class FriendsModule {}
