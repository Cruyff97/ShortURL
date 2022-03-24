import { SocialAuthService } from 'angularx-social-login';
import { MatchUsername } from './../validators/match-username';
import { AuthService } from './../auth.service';
import { GoogleLoginProvider } from 'angularx-social-login';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatchPassword } from '../validators/match-password';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  logged: boolean = false;
  errors?: Array<any>;
  authForm = new FormGroup(
    {
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      conf_email: new FormControl('', [
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
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  loginWithGoogle(): void {
    this.socialAuthService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(() => this.router.navigate(['home']));
  }

  onSubmit() {
    if (this.authForm.invalid) {
      console.log(this.authForm);

      return;
    }
    console.log(this.authForm.value);

    this.authService.signUp(this.authForm.value).subscribe({
      next: (res: any) => console.log(res),
      error: (err: any) => {
        this.errors = err.error;
        console.log(err);

        this.openDialog(ErrorModal, {
          data: {
            dialogTitle: err.error,
          },
        });
        console.log(err.error);
      },
      complete: () => console.log('ok'),
    });
  }
  openDialog(component: any, options: any) {
    this.dialog.open(component, options);
  }
}
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
@Component({
  selector: 'error-modal',
  templateUrl: 'errorModal.component.html',
})
export class ErrorModal {
  dialogTitle: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    console.log(this.data);
    this.data = this.data.dialogTitle;
    this.dialogTitle = this.data;
    // will log the entire data object
  }
}
