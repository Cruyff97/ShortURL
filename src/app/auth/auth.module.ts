import { MyUrlsComponent } from './../my-urls/my-urls.component';
import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent, ErrorModal } from './signup/signup.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [SigninComponent, SignupComponent, MyUrlsComponent, ErrorModal],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxSpinnerModule,
  ],
})
export class AuthModule {}
