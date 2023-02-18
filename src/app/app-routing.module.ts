import { NgModule } from '@angular/core'
import { CanActivate, RouterModule, Routes } from '@angular/router'

import { AuthGuardService as AuthGuard } from './auth/auth-services/auth-guard.service'
import { SigninComponent } from './auth/signin/signin.component'
import { SignupComponent } from './auth/signup/signup.component'
import { FirstLoginComponent } from './first-login/first-login.component'
import { HomeComponent } from './home/home.component'
import { MapComponent } from './map/map.component'
import { MyUrlsComponent } from './my-urls/my-urls.component'
import { ShortService } from './services/short.service'
import { UrlsComponent } from './urls/urls.component'

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
  // { path: 'firstlogin', component: FirstLoginComponent,}, //not ready backend part
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
export class AppRoutingModule {

/*   constructor(private shortService:ShortService){
    this.shortService.getTarget(slug)
  } */
}
