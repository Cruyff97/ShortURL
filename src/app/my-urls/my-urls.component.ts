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
  click_number: any;
  click_from:any;
  modal:boolean=false;
urles:any;
  constructor(
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private shortService: ShortService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.authService.myUrls.subscribe((res) => {
      this.myUrls = res.data;
      this.urles=this.myUrls.urls
      console.log("urles", this.urles);
      });
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 700);
  }
  openInfosModal(id:any) {
    console.log(id);
    console.log(this.myUrls.urls[id])
    this.id = this.myUrls.urls[id]._id
    this.shortService.getURLInfos(this.id).subscribe((infos) => {
      console.log(infos.data);
      this.click_from= infos.data
      this.click_number=infos.data.map((clicks:any)=> clicks.count)
      console.log("number", this.click_number);
      
    })
    
    this.modal=!this.modal
  }

  closeInfosModal(){
    this.modal=!this.modal
  }
}
