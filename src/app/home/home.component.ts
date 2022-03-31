import { AuthService } from './../auth/auth-services/auth.service';
import { ShortService } from './../services/short.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

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
  link: string = '';
  copy:string='Copy';
  constructor(
    private shortservice: ShortService,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
  ) {}

  ngOnInit(): void {
        this.signedin = this.authService.loggedIn();
  }
  onInsertedURLlogged(URL: string, jwt: any) {
    this.spinner.show();
    this.shortservice.shortLogged(URL, jwt).subscribe((results) => {
      this.genSlug = `${results.data.generated_slug}`;
      this.link = `shortangular.netlify.app/${this.genSlug}`;
      this.spinner.hide();
    });
  }
  onInsertedURL(URL: string) {
    console.log('notlogged');

    this.shortservice.shortNotLogged(URL).subscribe((results) => {
      this.genSlug = `${results.data.generated_slug}`;
      this.link = `shortangular.netlify.app/${this.genSlug}`;
    });
  }

  copied() {
    this.copy = 'Copied!';
    setTimeout(() => {
      this.copy='Copy'  
      }, 1000);
  
  }
}
