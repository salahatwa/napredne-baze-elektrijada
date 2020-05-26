import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgMaterialModule } from '../ng-material/ng-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImagePickerComponent } from './components/image-picker/image-picker.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HoverableDirective } from 'src/app/feature-modules/shared/directives/hoverable.directive';
import { CanSeeDirective } from './directives/can-see.directive';
import { MustBeAuthenticatedDirective } from './directives/must-be-authenticated.directive';

@NgModule({
  declarations: [
    ImagePickerComponent,
    HoverableDirective,
    CanSeeDirective,
    MustBeAuthenticatedDirective,
  ],
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
    CanSeeDirective,
    MustBeAuthenticatedDirective,
  ],
})
export class SharedModule {}
