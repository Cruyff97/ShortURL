import { SocialAuthService } from 'angularx-social-login';
import { MatchUsername } from './../validators/match-username';
import { AuthService } from './../auth.service';
import { GoogleLoginProvider } from 'angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatchPassword } from '../validators/match-password';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  logged: boolean = false;
  authForm = new FormGroup(
    {
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      conf_username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(30),
      ]),
      conf_password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(30),
      ]),
    },
    {
      validators: [this.matchpassword.validate, this.matchusername.validate],
    }
  );
  constructor(
    private matchpassword: MatchPassword,
    private matchusername: MatchUsername,
    private authService: AuthService,
    private socialAuthService: SocialAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  loginWithGoogle(): void {
    this.socialAuthService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(() => this.router.navigate(['home']));
  }

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }
    console.log(this.authForm.value);

    this.authService.signUp(this.authForm.value).subscribe({
      next: (res: any) => console.log(res),
      error: (err: any) => console.log(err),
      complete: () => console.log('ok'),
    });
  }
}
