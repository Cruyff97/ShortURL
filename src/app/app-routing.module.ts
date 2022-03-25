import { UrlsComponent } from './urls/urls.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: { animation: 'togglePage' }
  },
  { path: '', redirectTo: '/home', pathMatch: 'full', data: { animation: 'togglePage' } },
  { path: ':slug', component: UrlsComponent }]

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
export class AppRoutingModule {}
