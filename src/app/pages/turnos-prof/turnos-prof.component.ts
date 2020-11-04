import { TurnoPendiente } from 'src/app/shared/models/turno-pendiente.interface';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { Turno } from 'src/app/shared/models/turno.interface';
import { User } from 'src/app/shared/models/user.interface';

@Component({
    selector: 'app-turnos-prof',
    templateUrl: './turnos-prof.component.html',
    styleUrls: ['./turnos-prof.component.css']
})
export class TurnosProfComponent implements OnInit {

    
    listado: any[] = [];
    listadoPendientes: any[] = [];
    isLoading = false;
    isLoading2 = false;
    user: User;

    constructor(private dbService: DataService,
                private auth: AuthService) {
    }

    ngOnInit() {
        this.auth.user$.subscribe(userObs => {
            this.dbService.getOne(userObs.uid, 'users').subscribe((user: User) => {
                this.user = user;
                this.getTurnos();
                this.getTurnosPendientes();
            });
        });
    }

    getTurnos() {
        this.isLoading = true;

        this.dbService.getAll('turnos').subscribe(turnos => {
            this.listado = turnos.filter(x => x.profesional.uid === this.user.uid);
            this.isLoading = false;
        });
    }

    getTurnosPendientes() {
        this.isLoading2 = true;

        this.dbService.getAll('turnos-pendientes').subscribe((turnos: TurnoPendiente[]) => {
            this.listadoPendientes = turnos.filter(x => x.profesional.uid === this.user.uid && x.estado === 'PENDIENTE');
            this.isLoading2 = false;
        });
    }

    aceptarTurno(turno: Turno) {
        turno.estado = 'ACEPTADO';
        this.dbService.updateOne(turno, 'turnos');
    }

    rechazarTurno(turno: Turno) {
        turno.estado = 'RECHAZADO';
        this.dbService.updateOne(turno, 'turnos');
    }

    cancelarTurno(turno: Turno) {
        turno.estado = 'CANCELADO';
        this.dbService.updateOne(turno, 'turnos');
    }

    cancelarTurnoPendiente(turno: TurnoPendiente) {
        turno.estado = 'CANCELADO';
        this.dbService.updateOne(turno, 'turnos-pendientes');
    }

}
