import { AuthService } from './../auth/auth.service';
import { ShortService } from './../services/short.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  signedin = false;
  insertedURL!: string;
  genSlug!: string;
  urlBase: string = 'https://croppy.herokuapp.com';
  token = localStorage.getItem('id_token');
  link: string='';

  constructor(
    private shortservice: ShortService,
    private authService: AuthService
  ) {
    this.authService.signedin$.subscribe((signedin: any) => {
      this.signedin = signedin;
    });
  }

  ngOnInit(): void {
this.authService.validateJwt().subscribe((validateRes: any) => {
if(validateRes.status==403){
  this.authService.logout();
}

})

  }
  onInsertedURLlogged(URL: string, jwt: any) {
    this.shortservice.shortLogged(URL, jwt).subscribe((results) => {
      this.genSlug = `${results.data.generated_slug}`;
      this.link=`shortangular.netlify.app/${this.genSlug}`
    });
  }
  onInsertedURL(URL: string) {
    console.log('notlogged');

    this.shortservice.shortNotLogged(URL).subscribe((results) => {
      this.genSlug = `${results.data.generated_slug}`;
      this.link=`shortangular.netlify.app/${this.genSlug}`
    });
  }
}
