import {Component, Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

/**
 * @title Dialog elements
 */
@Component({
  selector: 'dialog-elements-example',
  templateUrl: 'errorModal.component.html',
})
@Injectable({
    providedIn:'root'
})
export class DialogElementsExample {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
  }
}

export class DialogElementsExampleDialog {}