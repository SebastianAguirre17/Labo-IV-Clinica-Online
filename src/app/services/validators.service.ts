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

    invalidDate(control: FormControl): {[s: string]: boolean} {
        
        let hoy = new Date().getTime();
        let diaElegido = new Date(control.value);
        let proximo = new Date();
        proximo.setDate(new Date().getDate() + 14);

        if(diaElegido.getTime() < hoy || diaElegido.getTime() > proximo.getTime() || diaElegido.getDay() === 5 || diaElegido.getDay() === 6) {
            return {
                ainvalidTimeFormat: true
            }
        }
        return null;
    }
}
