import { AuthService } from './../auth-services/auth.service';
import { SocialAuthService } from 'angularx-social-login';
import { MatchUsername } from './../validators/match-username';
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
  inputType:any="password"
  hide=true;
  authForm = new FormGroup(
    {
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(45),
        Validators.email,
      ]),
      conf_username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(45),
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30),
      ]),
      conf_password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
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
    this.authService.signUp(this.authForm.value).subscribe({
      next: (res: any) => {
        this.openDialog(ErrorModal, {data: { created: 'Account created'}});},
      error: (err: any) => {
        this.errors = err.error;
        this.openDialog(ErrorModal, {
          data: {
            dialogTitle: err.error,
          },
        });
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
  dialogTitle?: any;
dialogcreated?:any;
  more_errors?: boolean;
  one_error?: boolean;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    if(this.data.dialogTitle){
      this.data = this.data.dialogTitle;
      this.dialogTitle = this.data;
      if(this.dialogTitle[0]){
        this.more_errors= true
      }
      else{
        this.one_error=true
      }
    }
    if(this.data.created){
    this.data= this.data.created;
    this.dialogcreated= this.data;
  }
    // will log the entire data object  to the console
  }
}
