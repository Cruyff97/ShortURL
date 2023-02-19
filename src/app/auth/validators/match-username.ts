import { Injectable } from "@angular/core"
import {
    AbstractControl,
    FormGroup,
    ValidationErrors,
    Validator
} from "@angular/forms"

@Injectable({ providedIn: "root" })
export class MatchUsername implements Validator {
    public validate(control: AbstractControl): ValidationErrors | null {
        const { email, conf_email } = control.value

        if (email === conf_email) {
            return null
        }
        return { usernamesDontmatch: true }
    }
}
