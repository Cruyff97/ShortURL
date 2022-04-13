import { Component, Input } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { slideInAnimation } from './animations/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent {
  title= 'short'
  constructor(private contexts: ChildrenOutletContexts) {    
  }
  signedin: any;
  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
  onLogin(tryn: any) {
    this.signedin = true;
  }
}
