import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-first-login',
  templateUrl: './first-login.component.html',
  styleUrls: ['./first-login.component.css']
})
export class FirstLoginComponent implements OnInit {
  firstLoginForm = new FormGroup(
    {
      first_name: new FormControl('', [Validators.required,Validators.minLength(2)]),
      last_name: new FormControl('', [Validators.required, Validators.minLength(2)]),

});
  constructor() { }

  ngOnInit(): void {
  }
onSubmit(){
  console.log(this.firstLoginForm.value);
}
}
