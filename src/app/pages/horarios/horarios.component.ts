import { Especialidad } from './../../shared/models/especialidades.type';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { ValidatorsService } from 'src/app/services/validators.service';
import { TurnoPendiente } from 'src/app/shared/models/turno-pendiente.interface';
import { User } from 'src/app/shared/models/user.interface';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-horarios',
    templateUrl: './horarios.component.html',
    styleUrls: ['./horarios.component.css']
})
export class HorariosComponent implements OnInit {
    
    user: User;
    especialidades: any[] = [];

    botones: Array<{ hora: string, estado: string }> = [];
    horas = [
        "09:00", "09:30","10:00", "10:30","11:00", "11:30","12:00", "12:30","13:00", "13:30","14:00", 
        "14:30","15:00", "15:30","16:00", "16:30","17:00", "17:30","18:00", "18:30"
    ];

    horasSeleccionadas = [];

    gestionForm: FormGroup = this.fb.group({
        date: ['', [Validators.required, this.myValidators.invalidDate]],
        especialidad: ['', [Validators.required]]
    });

    constructor(private fb: FormBuilder,
                private auth: AuthService,
                private myValidators: ValidatorsService,
                private dbService: DataService) {
    }

    ngOnInit() {
        this.auth.user$.subscribe(userObs => {
            this.dbService.getOne(userObs.uid, 'users').subscribe((user: User) => {
                this.user = user;
                this.especialidades = this.user.especialidades;
                this.gestionForm.setValue({
                    date: '',
                    especialidad: this.especialidades[0]
                })
            });
        });
        this.inicializarBotones();
    }

    horaPresionada(boton: { hora: string, estado: string }) {
        if (boton.estado === 'presionado')
            return;

        boton.estado = 'presionado';
        this.horasSeleccionadas.push(boton.hora)
    }

    inicializarBotones() {
        this.botones = [];
        const longitud = this.horas.length;
        for (let i = 0; i < longitud; i++) {
            this.botones.push({ hora: this.horas[i], estado: 'noPresionado' });
        }
    }

    get invalidDate() {
        return this.gestionForm.get('date').invalid && this.gestionForm.get('date').touched;
    }

    get invalidEspecialidad() {
        return this.gestionForm.get('especialidad').invalid && this.gestionForm.get('especialidad').touched;
    }

    crearUsuario() {
        if (this.gestionForm.invalid) {
            return Object.values(this.gestionForm.controls).forEach(control => {
                if (control instanceof FormGroup)
                Object.values(control.controls).forEach(control => control.markAsTouched());
                else
                control.markAsTouched();
            });
        }

        Swal.fire({
            title: 'Turnos',
            text: 'Espere por favor',
            icon: 'info'
        });
        Swal.showLoading();

        this.horasSeleccionadas.forEach(element => {
            const turno: TurnoPendiente = {
                profesional: this.user, 
                especialidad: this.gestionForm.get('especialidad').value,
                hora: element,
                dia: this.gestionForm.get('date').value,
                estado: 'PENDIENTE'
            };

            this.dbService.setOne(turno, 'turnos-pendientes');
        });
        Swal.close();
        this.horasSeleccionadas = [];
        this.inicializarBotones();

        this.cancelar();
        Swal.fire({
            title: 'Muy bien!',
            text: 'Turnos agregados con éxito',
            icon: 'info',
            showConfirmButton: true
        });
    }

    cancelar() {
        this.gestionForm.reset();
        
    }
}
