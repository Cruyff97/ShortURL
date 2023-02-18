import { UntypedFormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  @Input() inputType!: string;
  @Input() label!: string;
  @Input() control!: UntypedFormControl;
  hide=true
  constructor() {}

  ngOnInit(): void {}
  showErrors() {
    const { dirty, touched, errors } = this.control;
    return dirty && touched && errors;
  }
}
