import { SignupComponent, ErrorModal } from './auth/signup/signup.component';
import { AuthInterceptor } from './auth/auth-services/auth-interceptor';
import { AuthGuardService } from './auth/auth-services/auth-guard.service';
import { JwtHelperService, JwtModule, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { HomeComponent } from './home/home.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { InputComponent } from './input/input.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UrlsComponent } from './urls/urls.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { SigninComponent } from './auth/signin/signin.component';

import { MyUrlsComponent } from './my-urls/my-urls.component';
import { MapComponent } from './map/map.component';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { MyUrlsOverviewComponent } from './my-urls-overview/my-urls-overview.component';
import { FirstLoginComponent } from './first-login/first-login.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { LoadingInterceptor } from './loading-interceptor/loading-interceptor';

export function tokenGetter() {
  return localStorage.getItem("id_token");
}

@NgModule({
  declarations: [AppComponent, HomeComponent, HeaderComponent, UrlsComponent,SigninComponent, SignupComponent, MyUrlsComponent, ErrorModal, MapComponent, MyUrlsOverviewComponent, InputComponent, FirstLoginComponent, SearchBarComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      },
    }),
    HttpClientModule,
    SocialLoginModule,
    ClipboardModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AppRoutingModule,
    ScullyLibModule
  ],
  providers: [
    AuthGuardService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true, //keeps the user signed in
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '973482103799-b56hi52p132ccugg83i3cu4a3qqfucnq.apps.googleusercontent.com'
            ), // your client id
          },
        ],
      } as SocialAuthServiceConfig,
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    LoadingInterceptor,
    { provide: HTTP_INTERCEPTORS, useClass:LoadingInterceptor , multi: true },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
