import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Skill, User } from '../users.interfaces';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Input() skills: Skill[] = [];
  @Input()
  user: User = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    skills: []
  };

  @Output() submit = new EventEmitter<User>();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  addSkill() {
    (this.form.get('skills') as FormArray).push(new FormControl());
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, Validators.required],
      skills: this.formBuilder.array(this.user.skills)
    });
  }

  removeSkill(index: number) {
    (this.form.get('skills') as FormArray).removeAt(index);
  }

  onSubmit() {
    this.submit.emit(this.form.value);
  }
}
