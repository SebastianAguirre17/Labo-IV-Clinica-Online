import { TurnoPendiente } from 'src/app/shared/models/turno-pendiente.interface';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { element } from 'protractor';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { ValidatorsService } from 'src/app/services/validators.service';
import { Turno } from 'src/app/shared/models/turno.interface';
import { User } from 'src/app/shared/models/user.interface';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-sacar-turno',
    templateUrl: './sacar-turno.component.html',
    styleUrls: ['./sacar-turno.component.css']
})
export class SacarTurnoComponent implements OnInit {

    listadoEspecialidades: any[] = [];
    listadoProfesionales: User[] = [];
    listadoTurnosDisponibles: TurnoPendiente[] = [];
    listadoDeFechas: string[] = [];
    user: User;

    especialidadSeleccionada: string;
    profesionalSeleccionado: User;
    diaSeleccionado: any;

    constructor(private dbService: DataService,
        private auth: AuthService) {
    }

    ngOnInit() {
        this.getEspecialidades();
    }

    getProfesionales(especialidad: string) {
        this.listadoProfesionales = [];
        let listadoAuxiliar: any[] = [];

        this.dbService.getAll('users').subscribe(usuarios => {
            listadoAuxiliar = usuarios.filter(x => x.role == 'PROFESIONAL' && x.emailVerified);

            listadoAuxiliar.forEach((item: User) => {
                const found = item.especialidades.find(element => element === especialidad);
                if (found != undefined)
                    this.listadoProfesionales.push(item);
            });
        });
    }

    getEspecialidades() {
        this.dbService.getAll('especialidades').subscribe(especialidades => {
            this.listadoEspecialidades = especialidades;
        });
    }

    getFechas() {
        this.dbService.getAll('turnos-pendientes').subscribe(turnos => {
            let auxTurnosPendientes = turnos.filter(turno => turno.profesional.uid === this.profesionalSeleccionado.uid &&
                                                             turno.especialidad === this.especialidadSeleccionada
            );;
            let auxFechas = [];
            auxTurnosPendientes.forEach(item => {
                auxFechas.push(item.dia);
            });

            this.listadoDeFechas = [...new Set(auxFechas)];

        });
    }

    getEspecialidadFromComponent(especialidad: string) {
        this.especialidadSeleccionada = especialidad;
        this.getProfesionales(this.especialidadSeleccionada);
    }

    getProfesionalFromComponent(profesional: User) {
        this.profesionalSeleccionado = profesional;
        this.getFechas();
    }

    getFechaFromComponent(fecha: string) {
        this.diaSeleccionado = fecha;
    }


}
