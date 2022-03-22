import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
signedin=false
token=localStorage.getItem('id_token');
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
   if(this.token){
     this.signedin=true
   }
   else this.signedin=false
  }
onSignOut(){
  this.authService.logout();
  this.authService.signedin$.subscribe((signedin: any) => {
    this.signedin= signedin;
 
  })
  this.router.navigate(['/home']);
}
}
