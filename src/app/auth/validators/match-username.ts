import { Injectable } from "@angular/core";
import {  AbstractControl, FormGroup, ValidationErrors, Validator } from "@angular/forms";

@Injectable ({providedIn: 'root'})
export class MatchUsername implements Validator {
public validate(control: AbstractControl): ValidationErrors | null {
    
        const {username, conf_username}= control.value;
        
        if(username===conf_username){
            return null
        }
        return {'usernamesDontmatch': true}
            
        }
}

