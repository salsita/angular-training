import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormFieldComponent } from './form-field/form-field.component';

const sharedModules = [CommonModule, FormsModule, ReactiveFormsModule];

@NgModule({
  imports: [...sharedModules],
  declarations: [FormFieldComponent],
  exports: [...sharedModules, FormFieldComponent]
})
export class SharedModule {}
