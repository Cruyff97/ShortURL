import { NgxSpinnerModule } from "ngx-spinner"

import { ClipboardModule } from "@angular/cdk/clipboard"
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http"
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { BrowserModule } from "@angular/platform-browser"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { JWT_OPTIONS, JwtHelperService, JwtModule } from "@auth0/angular-jwt"

import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { AuthGuardService } from "./auth/auth-services/auth-guard.service"
import { AuthInterceptor } from "./auth/auth-services/auth-interceptor"
import { SigninComponent } from "./auth/signin/signin.component"
import {
    ErrorModalComponent,
    SignupComponent
} from "./auth/signup/signup.component"
import { FirstLoginComponent } from "./first-login/first-login.component"
import { HeaderComponent } from "./header/header.component"
import { HomeComponent } from "./home/home.component"
import { InputComponent } from "./input/input.component"
import { LoadingInterceptor } from "./loading-interceptor/loading-interceptor"
import { MapComponent } from "./map/map.component"
import { MaterialModule } from "./material/material.module"
import { MyUrlsOverviewComponent } from "./my-urls-overview/my-urls-overview.component"
import { MyUrlsComponent } from "./my-urls/my-urls.component"
import { SearchBarComponent } from "./search-bar/search-bar.component"
import { UrlsComponent } from "./urls/urls.component"

export function tokenGetter() {
    return localStorage.getItem("id_token")
}

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        HeaderComponent,
        UrlsComponent,
        SigninComponent,
        SignupComponent,
        MyUrlsComponent,
        ErrorModalComponent,
        MapComponent,
        MyUrlsOverviewComponent,
        InputComponent,
        FirstLoginComponent,
        SearchBarComponent
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: "short-url" }),
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter
            }
        }),
        HttpClientModule,
        ClipboardModule,
        NgxSpinnerModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        AppRoutingModule
    ],
    providers: [
        AuthGuardService,
        /*         {
            provide: "SocialAuthServiceConfig",
            useValue: {
                autoLogin: true, //keeps the user signed in
                providers: [
                    {
                        id: GoogleLoginProvider.PROVIDER_ID,
                        provider: new GoogleLoginProvider(
                            "973482103799-b56hi52p132ccugg83i3cu4a3qqfucnq.apps.googleusercontent.com"
                        ) // your client id
                    }
                ]
            } as SocialAuthServiceConfig
        }, */
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        LoadingInterceptor,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoadingInterceptor,
            multi: true
        }
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent]
})
export class AppModule {}
