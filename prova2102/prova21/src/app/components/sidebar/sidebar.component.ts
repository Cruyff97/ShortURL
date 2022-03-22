import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    trigger('hamburguerX', [
      /*
        state hamburguer => is the regular 3 lines style.
        states topX, hide, and bottomX => used to style the X element
      */
      state('hamburguer', style({})),
      // style top bar to create the X
      state(
        'topX',
        style({
          transform: 'rotate(45deg)',
          transformOrigin: 'left',
          margin: '6px',
        })
      ),
      // hides element when create the X (used in the middle bar)
      state(
        'hide',
        style({
          opacity: 0,
        })
      ),
      // style bottom bar to create the X
      state(
        'bottomX',
        style({
          transform: 'rotate(-45deg)',
          transformOrigin: 'left',
          margin: '6px',
        })
      ),
      transition('* => *', [
        animate('0.2s'), // controls animation speed
      ]),
    ]),
  ],
})
export class SidebarComponent implements OnInit,OnChanges {
  isHamburguer = true;
  showFiller = false;
  isMobile!: boolean;
  constructor(private breakpointObserver: BreakpointObserver) { }
  onClick(){
    console.log(this.isHamburguer);    
  this.isHamburguer = !this.isHamburguer;
}
ngOnInit() {
  this.isMobile=  this.breakpointObserver.isMatched('(max-width: 767px)');
  console.log(this.isMobile);
}

ngOnChanges(changes: SimpleChanges): void {
  
}


}
