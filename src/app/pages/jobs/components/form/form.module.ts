import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormFieldModule, InputModule } from '@app/shared/controls';
import { ButtonModule } from '@app/shared/buttons';



@NgModule({
  declarations: [
    FormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputModule,
    FormFieldModule,
    ButtonModule
  ]
})
export class FormModule { }
