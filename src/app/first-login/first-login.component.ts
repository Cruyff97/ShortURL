import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-first-login',
  templateUrl: './first-login.component.html',
  styleUrls: ['./first-login.component.css']
})
export class FirstLoginComponent implements OnInit {
  firstLoginForm = new FormGroup(
    {
      first_name: new FormControl(''),
      last_name: new FormControl(''),

});
  constructor() { }

  ngOnInit(): void {
  }
onSubmit(){
  console.log(this.firstLoginForm.value);
}
}
