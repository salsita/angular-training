import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFieldComponent {
  @Input() label = '';
  @Input() type = 'text';
  @Input() control: FormControl = null;

  get errors() {
    return this.control && this.control.errors && Object.keys(this.control.errors);
  }
}
