import { LoadingInterceptor } from './../../loading-interceptor/loading-interceptor';
import { AuthService } from './../auth-services/auth.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
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
  loginForm = new UntypedFormGroup({
    username: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(45),
    Validators.email    ]),
    password: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(30),
    ]),
  });
  constructor(
    private router: Router,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private loadingInterceptor: LoadingInterceptor
  ) {}

  ngOnInit(): void {}
  onLogin() {
    
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.error = '';
        localStorage.setItem('id_token', res.data.user.jwt);
        localStorage.setItem('username', res.data.user.username);
      },
      error: (err) => {
        if (err.status == 404) {
          this.error = 'Account not found, Sign Up!';
        }
       },
      complete: () => {
        this.loggedEvent.emit((this.logged = true));
        this.router.navigate(['myUrls']);
      },
    });
  }
}
