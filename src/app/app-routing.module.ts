import { MapComponent } from './map/map.component';
import { UrlsComponent } from './urls/urls.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate  } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { MyUrlsComponent } from './my-urls/my-urls.component';
import { 
  AuthGuardService as AuthGuard 
} from './auth/auth-services/auth-guard.service';
import { FirstLoginComponent } from './first-login/first-login.component';
const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: { animation: 'togglePage' },
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
    data: { animation: 'togglePage' },
  },
  { path: 'signup', component: SignupComponent, canActivate: [AuthGuard]  },
  { path: 'signin', component: SigninComponent, canActivate:[AuthGuard] },
  { path: 'myUrls', component: MyUrlsComponent,},
  // slug path must be the last
  { path: ':slug', component: UrlsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
