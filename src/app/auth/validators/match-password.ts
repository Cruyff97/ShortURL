import { Injectable } from "@angular/core"
import {
    AbstractControl,
    FormGroup,
    ValidationErrors,
    Validator
} from "@angular/forms"

@Injectable({ providedIn: "root" })
export class MatchPassword implements Validator {
    public validate(control: AbstractControl): ValidationErrors | null {
        const { password, conf_password } = control.value

        if (password === conf_password) {
            return null
        }
        return { passwordsDontmatch: true }
    }
}
