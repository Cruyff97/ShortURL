import { ShortService } from './../services/short.service';

import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-my-urls',
  templateUrl: './my-urls.component.html',
  styleUrls: ['./my-urls.component.css'],
})
export class MyUrlsComponent implements OnInit {
  myUrls: any;
  id: any;
  infos: any = [];

  constructor(
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private shortService: ShortService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.authService.myUrls.subscribe((res) => {
      this.myUrls = res.data;
      this.myUrls.urls.map((data: any) => {
        this.id = data._id;
        this.shortService.getURLInfos(this.id).subscribe((infos) => {
          this.infos?.push(infos.data.clicks.length);
        });
      });
    });

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 700);
  }
  copied() {}
}
