import { NgxSpinnerService } from 'ngx-spinner'
import { switchMap } from 'rxjs'

import { Component, OnInit } from '@angular/core'

import { AuthService } from '../auth/auth-services/auth.service'
import { ConfigurationService } from '../services/configuration.service'
import { ShortService } from '../services/short.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  signedin = false;
  insertedURL!: string;
  genSlug!: string;
  link: string = '';
  copy: string = 'Copy';
  customSlug?: string;
  isSavedCustomSlug: boolean = false;
  error?: string;
host?:string
backend?:string
  constructor(
    private shortservice: ShortService,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private configurationService: ConfigurationService) {
 this.host= this.configurationService.getHost()
 this.backend=this.configurationService.getBackendUrl()
    }

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
          this.link = `${this.host}/${this.genSlug}`;
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
          this.link = `${this.host}/${this.genSlug}`;
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
    this.shortservice.shortNotLogged(URL).subscribe((results) => {
      this.genSlug = `${results.data.generated_slug}`;
      this.link = `shortangular.netlify.app/${this.genSlug}`;
    });
  }

  goToUrl(url: string): void {
    window.location.href = url;
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
