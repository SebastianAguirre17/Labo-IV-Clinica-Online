import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class ValidatorsService {

    constructor() { }

    invalidTimeFormat(control: FormControl): {[s: string]: boolean} {
        
        let hora = control.value;
        let minutos = hora.substr(3, 2);
        
        if(minutos === '00' || minutos === '30') {
            return null;
        }
        
        return {
            ainvalidTimeFormat: true
        }
    }
}
