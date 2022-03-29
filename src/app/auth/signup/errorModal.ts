import { Component, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

/**
 * @title Dialog elements
 */
@Component({
  selector: 'dialog-elements-example',
  templateUrl: 'errorModal.component.html',
styles: ['h3 { color: #2eb086; }']
})
@Injectable({
  providedIn: 'root',
})
export class DialogElementsExample {
  constructor(public dialog: MatDialog) {}


}

export class DialogElementsExampleDialog {}
