import { MyUrlsComponent } from './../my-urls/my-urls.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
{path: '', component: SigninComponent},
{path:'signup', component: SignupComponent},
{path:'signin', component: SigninComponent},
{path:'myUrls', component: MyUrlsComponent} 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
