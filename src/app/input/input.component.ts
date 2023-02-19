import { Component, Input, OnInit } from "@angular/core"
import { UntypedFormControl } from "@angular/forms"

@Component({
    selector: "app-input",
    templateUrl: "./input.component.html",
    styleUrls: ["./input.component.css"]
})
export class InputComponent {
    @Input() inputType!: string
    @Input() label!: string
    @Input() control!: UntypedFormControl
    hide = true
    constructor() {}

    showErrors() {
        const { dirty, touched, errors } = this.control
        return dirty && touched && errors
    }
}
