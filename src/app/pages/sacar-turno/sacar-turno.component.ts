import { TurnoPendiente } from 'src/app/shared/models/turno-pendiente.interface';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
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
    listadoDeHoras: any[] = [];
    user: User;

    especialidadSeleccionada: string;
    profesionalSeleccionado: User;
    horaSeleccionada: any;
    diaSeleccionado: any;

    primerDia: any;
    primerHora: any;

    constructor(private dbService: DataService,
        private auth: AuthService) {
    }

    ngOnInit() {
        this.auth.user$.subscribe(userObs => {
            this.dbService.getOne(userObs.uid, 'users').subscribe((user: User) => {
                this.user = user;
            });
        });
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
            this.listadoTurnosDisponibles = turnos.filter(turno => turno.profesional.uid === this.profesionalSeleccionado.uid &&
                turno.especialidad === this.especialidadSeleccionada &&
                turno.estado === 'PENDIENTE'
            );
            let auxFechas = [];
            this.listadoTurnosDisponibles.forEach(item => {
                auxFechas.push(item.dia);
            });
            auxFechas.sort();
            this.listadoDeFechas = [...new Set(auxFechas)];
            this.setPrimerTurnoDisponible(); //TODO
        });
    }

    getEspecialidadFromComponent(especialidad: string) {
        this.listadoProfesionales = [];
        this.listadoTurnosDisponibles = [];
        this.listadoDeHoras = [];
        this.listadoDeFechas = [];
        this.profesionalSeleccionado = null;
        this.especialidadSeleccionada = null;

        this.especialidadSeleccionada = especialidad;
        this.getProfesionales(this.especialidadSeleccionada);
    }

    getProfesionalFromComponent(profesional: User) {
        this.listadoTurnosDisponibles = [];
        this.listadoDeHoras = [];
        this.listadoDeFechas = [];
        this.primerHora = null;
        this.primerDia = null;

        this.profesionalSeleccionado = profesional;
        this.getFechas();
    }

    getFechaFromComponent(fecha: string) {
        this.listadoDeHoras = [];

        this.diaSeleccionado = fecha;
        let horarios = this.listadoTurnosDisponibles.filter(turno => turno.dia === this.diaSeleccionado);
        horarios.forEach((item: TurnoPendiente) => {
            this.listadoDeHoras.push(item.hora);
        });
        this.listadoDeHoras.sort();
    }

    getHoraFromComponent(hora: any) {
        this.horaSeleccionada = hora;
        this.sacarTurno();
    }

    sacarTurno() {
        Swal.fire({
            title: 'Confirmar Turno',
            html: ` <p>Dia: ${this.diaSeleccionado}</p>
                    <p>Hora: ${this.horaSeleccionada}</p>
                    <p>Especialidad: ${this.especialidadSeleccionada}</p>
                    <p>Profesional: ${this.profesionalSeleccionado.name}</p>`,
            showConfirmButton: true,
            showCancelButton: true,
            icon: 'info'
        }).then((result) => {
            if (result.isConfirmed) {
                const turno: Turno = {
                    user: this.user,
                    profesional: this.profesionalSeleccionado,
                    hora: this.horaSeleccionada,
                    dia: this.diaSeleccionado,
                    estado: 'PENDIENTE',
                    especialidad: this.especialidadSeleccionada
                };
                this.dbService.setOne(turno, 'turnos');

                const turnoPendiente: TurnoPendiente = this.getCurrentTurno();
                turnoPendiente.estado = 'FINALIZADO';
                this.dbService.updateOne(turnoPendiente, 'turnos-pendientes');

                this.limpiarTodo();

                Swal.fire({
                    title: 'Muy bien!',
                    text: 'Turno confirmado',
                    icon: 'info'
                });
            }
        });
    }

    sacarPrimerTurno() {
        Swal.fire({
            title: 'Confirmar Turno',
            html: ` <p>Dia: ${this.primerDia}</p>
                    <p>Hora: ${this.primerHora}</p>
                    <p>Especialidad: ${this.especialidadSeleccionada}</p>
                    <p>Profesional: ${this.profesionalSeleccionado.name}</p>`,
            showConfirmButton: true,
            showCancelButton: true,
            icon: 'info'
        }).then((result) => {
            if (result.isConfirmed) {
                const turno: Turno = {
                    user: this.user,
                    profesional: this.profesionalSeleccionado,
                    hora: this.primerHora,
                    dia: this.primerDia,
                    estado: 'PENDIENTE',
                    especialidad: this.especialidadSeleccionada
                };
                this.dbService.setOne(turno, 'turnos');

                const turnoPendiente: TurnoPendiente = this.getPrimerTurno();
                turnoPendiente.estado = 'FINALIZADO';
                this.dbService.updateOne(turnoPendiente, 'turnos-pendientes');

                this.limpiarTodo();

                Swal.fire({
                    title: 'Muy bien!',
                    text: 'Turno confirmado',
                    icon: 'info'
                });
            }
        });
    }

    getCurrentTurno() {
        let turnos = this.listadoTurnosDisponibles.filter(turno => turno.hora === this.horaSeleccionada &&
            turno.dia === this.diaSeleccionado &&
            turno.profesional.uid === this.profesionalSeleccionado.uid);
        return turnos[0];
    }


    getPrimerTurno() {
        let turnos = this.listadoTurnosDisponibles.filter(turno => turno.hora === this.primerHora &&
            turno.dia === this.primerDia &&
            turno.profesional.uid === this.profesionalSeleccionado.uid);
        return turnos[0];
    }

    setPrimerTurnoDisponible() {
        if (this.listadoDeFechas.length > 0) {
            let auxHoras = [];
            this.primerDia = this.listadoDeFechas[0];

            let horarios = this.listadoTurnosDisponibles.filter(turno => turno.dia === this.primerDia);
            horarios.forEach((item: TurnoPendiente) => {
                auxHoras.push(item.hora);
            });
            auxHoras.sort();

            this.primerHora = auxHoras[0];
        }
    }

    limpiarTodo () {
        this.listadoTurnosDisponibles = [];
        this.listadoProfesionales = [];
        this.listadoDeHoras = [];
        this.listadoDeFechas = [];
        this.primerHora = null;
        this.primerDia = null;
        this.horaSeleccionada = null;
        this.diaSeleccionado = null;
        this.profesionalSeleccionado = null;
        this.especialidadSeleccionada = null;
    }
}
