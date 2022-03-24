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

  constructor(
    private shortservice: ShortService,
    private authService: AuthService
  ) {
    this.authService.signedin$.subscribe((signedin: any) => {
      this.signedin = signedin;
      console.log(this.signedin);
    });
  }

  ngOnInit(): void {}
  onInsertedURLlogged(URL: string, jwt: any) {
    console.log('logged');
    this.shortservice.shortLogged(URL, jwt).subscribe((results) => {
      this.genSlug = `${results.data.generated_slug}`;
    });
  }
  onInsertedURL(URL: string) {
    console.log('notlogged');

    this.shortservice.shortNotLogged(URL).subscribe((results) => {
      this.genSlug = `${results.data.generated_slug}`;
    });
  }
}
