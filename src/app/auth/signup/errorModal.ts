import { Component, Injectable } from "@angular/core"
import { MatDialog } from "@angular/material/dialog"

/**
 * @title Dialog elements
 */
@Component({
    selector: "dialog-elements-example",
    templateUrl: "errorModal.component.html",
    styles: ["h3 { color: #11d596; }"]
})
@Injectable({
    providedIn: "root"
})
export class DialogElementsExample {
    dialogcreated?: any
    dialogTitle?: any
    constructor(public dialog: MatDialog) {}
}

export class DialogElementsExampleDialog {}
