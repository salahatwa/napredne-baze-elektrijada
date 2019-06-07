import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgMaterialModule } from '../ng-material/ng-material.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ImagePickerComponent } from './components/image-picker/image-picker.component'
import { FlexLayoutModule } from '@angular/flex-layout'
import { HoverableDirective } from 'src/app/directives/hoverable.directive'

@NgModule({
  declarations: [ImagePickerComponent, HoverableDirective],
  imports: [
    CommonModule,
    NgMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
  exports: [
    NgMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ImagePickerComponent,
    FlexLayoutModule,
    HoverableDirective,
  ],
})
export class SharedModule {}
