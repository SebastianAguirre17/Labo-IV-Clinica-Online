import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { Turno } from 'src/app/shared/models/turno.interface';
import { User } from 'src/app/shared/models/user.interface';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-cancelar-turno',
    templateUrl: './cancelar-turno.component.html',
    styleUrls: ['./cancelar-turno.component.css']
})
export class CancelarTurnoComponent implements OnInit {

    listado: any[] = [];
    isLoading = false;
    user: User;

    constructor(private dbService: DataService,
        private auth: AuthService) {
    }

    ngOnInit() {
        this.auth.user$.subscribe(userObs => {
            this.dbService.getOne(userObs.uid, 'users').subscribe((user: User) => {
                this.user = user;
                this.getTurnos();
            });
        });
    }

    getTurnos() {
        this.isLoading = true;

        this.dbService.getAll('turnos').subscribe(turnos => {
            this.listado = turnos.filter(x => x.user.uid == this.user.uid && (x.estado === 'PENDIENTE' || x.estado === 'ACEPTADO'));
            this.isLoading = false;
        });
    }

    cancelarTurno(turno: Turno) {
        Swal.fire({
            title: 'Atención',
            icon: 'error',
            text: '¿Desea cancelar su turno? Si lo hace, deberá sacar un turno nuevamente',
            showCancelButton: true,
            confirmButtonText: `Aceptar`,
        }).then((result) => {
            if (result.isConfirmed) {
                turno.estado = 'CANCELADO';
                this.dbService.updateOne(turno, 'turnos');
            }
        });
    }
}
