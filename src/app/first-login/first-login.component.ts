import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-first-login',
  templateUrl: './first-login.component.html',
  styleUrls: ['./first-login.component.css']
})
export class FirstLoginComponent implements OnInit {
  firstLoginForm = new UntypedFormGroup(
    {
      first_name: new UntypedFormControl('', [Validators.required,Validators.minLength(2)]),
      last_name: new UntypedFormControl('', [Validators.required, Validators.minLength(2)]),

});
  constructor() { }

  ngOnInit(): void {
  }
onSubmit(){
  console.log(this.firstLoginForm.value);
}
}
