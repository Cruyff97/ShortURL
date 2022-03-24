import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-urls',
  templateUrl: './urls.component.html',
  styleUrls: ['./urls.component.css'],
})
export class UrlsComponent implements OnInit {
  redirectUrl!: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const slug = params['slug'];
      return this.http
        .get(`https://croppy.herokuapp.com/v1/get-target/${slug}`)
        .subscribe((response: any) => {
          this.redirectUrl = response.data.target;
          this.goToUrl(this.redirectUrl);
        });
    });
  }

  goToUrl(url: string): void {
    window.location.href = url;
  }
}
