import { AuthService } from './../auth/auth-services/auth.service';
import { ShortService } from './../services/short.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-urls',
  templateUrl: './my-urls.component.html',
  styleUrls: ['./my-urls.component.css'],
})
export class MyUrlsComponent implements OnInit {
  myUrls: any;
  id: any;
  click_number: any;
  click_from: any;
  total_clicks: number = 0;
  top_location: number = 0;
  modal: boolean = false;
  modal_deleting: boolean= false;
  urles: any;
  total_urls!: number;
  total_clicks_single!: number;
  actual_index: any;
  constructor(
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private shortService: ShortService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    
    this.authService.validateJwt().subscribe((validateRes: any) => {
      if (validateRes.status == 403) {
        this.authService.logout();
        this.router.navigate(['/home']);
      }
    });

    
    this.authService.myUrls.subscribe((res) => {
      this.myUrls = res.data;
      this.urles = res.data.urls;
      this.total_urls = this.urles.length;
      this.urles.map((url: any) => {
        this.total_clicks_single = 0;
        this.shortService.getURLInfos(url._id).subscribe((clicks: any) => {
          if (clicks.data.length > 0) {
            clicks.data.map((v: any) => (this.total_clicks += v.count));
          }
        });
      });

      this.spinner.hide();
    });
  }
  copy(slug: any) {
    return `shortangular.netlify.app/${slug}`
  }

  openInfosModal(id: any) {
    this.total_clicks_single = 0;
    this.click_from = '';

    console.log(id);
    console.log(this.myUrls.urls[id]);
    this.id = this.myUrls.urls[id]._id;
    this.shortService.getURLInfos(this.id).subscribe((infos) => {
      this.click_from = infos.data;
      infos.data.map((v: any) => {
        this.total_clicks_single += v.count;
      });
    });

    this.modal = !this.modal;
  }

  closeInfosModal() {
    this.modal = !this.modal;
  }
  openDeleteModal(index:any){
    this.actual_index = index;
    console.log(index);
    this.modal_deleting = !this.modal_deleting;
  }
  closeDeleteModal(){
    this.modal_deleting = !this.modal_deleting;
  }
  deleteUrl(index: any) {
  console.log("index",index);
  
    this.spinner.show();
    let url_id = this.myUrls.urls[index]._id;
    this.shortService.deleteUrl(url_id).subscribe((res) => {
      console.log(res);
      
      this.authService.myUrls.subscribe((res) => {
        this.myUrls = res.data;
        this.urles = res.data.urls;
        this.total_urls = this.urles.length;
        this.urles.map((url: any) => {
          this.total_clicks_single = 0;
          this.total_clicks=0
          this.shortService.getURLInfos(url._id).subscribe((clicks: any) => {
            if (clicks.data.length > 0) {
              clicks.data.map((v: any) => (this.total_clicks += v.count));
            }
          });
        });
  
        this.spinner.hide();
        this.modal_deleting = !this.modal_deleting;
      });
    });
  }
}
