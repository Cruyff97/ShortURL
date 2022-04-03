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
  link: string = '';
  copy: string = 'Copy';
  customSlug?: string;
  isSavedCustomSlug: boolean = false;
  error?: string;
  constructor(
    private shortservice: ShortService,
    private authService: AuthService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.signedin = this.authService.loggedIn();
  }
  onInsertedURLlogged(URL: string, customSlug?: string) {
    this.spinner.show();
    if (customSlug !== undefined) {
      this.shortservice.shortLogged(URL, customSlug).subscribe(
        (results) => {
          this.error=undefined
          this.genSlug = `${results.data.generated_slug}`;
          this.link = `shortangular.netlify.app/${this.genSlug}`;
          this.spinner.hide();
        },
        (error) => {
          this.error = error;
          this.spinner.hide();
        }
      );
    } else {
      this.shortservice.shortLogged(URL).subscribe(
        (results) => {
this.error=undefined
          this.genSlug = `${results.data.generated_slug}`;
          this.link = `shortangular.netlify.app/${this.genSlug}`;
          this.spinner.hide();
        },
        (error) => {
          this.error = error;
          this.spinner.hide();
        }
      );
    }
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
      this.copy = 'Copy';
    }, 1000);
  }

  saveCustomSlug(customSlug: string | undefined) {
    this.isSavedCustomSlug = !this.isSavedCustomSlug;
    this.customSlug = customSlug;
  }
}
