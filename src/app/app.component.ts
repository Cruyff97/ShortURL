import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  signedin:any;
  
  onLogin(tryn:any){
    this.signedin=true
    console.log('appcomp');
    
    
  }
}
