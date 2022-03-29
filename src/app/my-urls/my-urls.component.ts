import { ShortService } from './../services/short.service';

import { AuthService } from './../auth/auth.service';
import { Component, OnInit} from '@angular/core';
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
  total_clicks:number=0;
  top_location:number=0;
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
      this.spinner.hide();
    });
      /** spinner ends after 5 seconds */
    
  }
  openInfosModal(id:any) {
    this.total_clicks=0
    this.click_from=''

     console.log(id);
    console.log(this.myUrls.urls[id])
    this.id = this.myUrls.urls[id]._id
    this.shortService.getURLInfos(this.id).subscribe((infos) => {
      console.log(infos);
      this.click_from= infos.data
      infos.data.map((v:any)=> {
        this.total_clicks+=v.count  
      })
     })
    
    this.modal=!this.modal
  }

  closeInfosModal(){
    this.modal=!this.modal
  }
}
