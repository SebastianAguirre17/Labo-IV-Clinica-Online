import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-horarios',
    templateUrl: './horarios.component.html',
    styleUrls: ['./horarios.component.css']
})
export class HorariosComponent implements OnInit {
    
    botones: Array<{ hora: string, estado: string }> = [];
    horas = [
        "09:00", "09:30","10:00", "10:30","11:00", "11:30","12:00", "12:30","13:00", "13:30","14:00", 
        "14:30","15:00", "15:30","16:00", "16:30","17:00", "17:30","18:00", "18:30"
    ]

    constructor() {
    }

    ngOnInit() {
        this.inicializarBotones();
    }

    horaPresionada(boton: { hora: string, estado: string }) {
        if (boton.estado === 'presionado')
            return;
        boton.estado = 'presionado';
    }


    inicializarBotones() {
        const longitud = this.horas.length;
        for (let i = 0; i < longitud; i++) {
            this.botones.push({ hora: this.horas[i], estado: 'noPresionado' });
        }
    }
}
