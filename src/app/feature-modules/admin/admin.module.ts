import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AdminRoutingModule } from './admin-routing.module'
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EntityCrudComponent } from './components/entity-crud/entity-crud.component';
import { ProfessorComponent } from './components/professor/professor.component';
import { SectionComponent } from './components/section/section.component'

@NgModule({
  declarations: [DashboardComponent, EntityCrudComponent, ProfessorComponent, SectionComponent],
  imports: [CommonModule, AdminRoutingModule, SharedModule],
})
export class AdminModule {}
