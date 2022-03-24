import { AuthService } from './../auth.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  @Output() loggedEvent = new EventEmitter();
  logged: boolean = false;
  jwt?: string;
  error: any;
  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(30),
    ]),
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {}
  onLogin() {
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.error = '';
        this.spinner.show();
        localStorage.setItem('id_token', res.data.user.jwt);
        console.log(res);
      },
      error: (err) => {
        if (err.status == 404) {
          this.error = 'Account not found, Sign Up!';
        }
        console.log(err);
      },
      complete: () => {
        this.loggedEvent.emit((this.logged = true));
        this.spinner.hide();
        this.router.navigate(['home']);
      },
    });
  }
}
