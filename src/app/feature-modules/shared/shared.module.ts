import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgMaterialModule } from '../ng-material/ng-material.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [],
  imports: [CommonModule, NgMaterialModule, FormsModule, ReactiveFormsModule],
  exports: [NgMaterialModule, FormsModule, ReactiveFormsModule],
})
export class SharedModule {}
