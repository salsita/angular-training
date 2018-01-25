import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormFieldComponent } from './form-field/form-field.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [FormFieldComponent],
  exports: [FormsModule, ReactiveFormsModule, FormFieldComponent]
})
export class SharedModule {}
