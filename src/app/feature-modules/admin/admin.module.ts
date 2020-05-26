import { GroupsModule } from './../../groups/groups.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EntityCrudComponent } from './components/entity-crud/entity-crud.component';
import { ProfessorComponent } from './components/professor/professor.component';
import { SectionComponent } from './components/section/section.component';
import { GroupsComponent } from './components/groups/groups.component';
import { StatisticsComponent } from './components/statistics/statistics.component';

@NgModule({
  declarations: [
    DashboardComponent,
    EntityCrudComponent,
    ProfessorComponent,
    SectionComponent,
    GroupsComponent,
    StatisticsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    GroupsModule,
  ],
})
export class AdminModule {}
