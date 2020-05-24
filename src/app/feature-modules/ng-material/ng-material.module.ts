import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatDatepickerModule } from '@angular/material/datepicker'

import {
  MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatNativeDateModule,
  DateAdapter,
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS,
  MatSelectModule,
  MatExpansionModule,
  MatToolbarModule,
  MatMenuModule,
  MatListModule,
} from '@angular/material'
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_FORMATS,
} from '@angular/material-moment-adapter'

@NgModule({
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatExpansionModule,
    MatToolbarModule,
    MatSelectModule,
    MatMenuModule,
    MatListModule,
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class NgMaterialModule {}
