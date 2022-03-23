import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, query, stagger } from '@angular/animations';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
collapse=false;
  signedin=false
token=localStorage.getItem('id_token');
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
   if(this.token){
     this.signedin=true
   }
   else this.signedin=false
  }
  menuOnClick() {
    document.getElementById("menu-bar")?.classList.toggle("change");
    document.getElementById("nav")?.classList.toggle("change");
    document.getElementById("menu-bg")?.classList.toggle("change-bg");
  }
onSignOut(){
  this.authService.logout();
  this.authService.signedin$.subscribe((signedin: any) => {
    this.signedin= signedin;
 
  })
  this.menuOnClick();
  this.router.navigate(['/home']);
}


}
