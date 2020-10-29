import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { Turno } from 'src/app/shared/models/turno.interface';
import { User } from 'src/app/shared/models/user.interface';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-cancelar-prof',
    templateUrl: './cancelar-prof.component.html',
    styleUrls: ['./cancelar-prof.component.css']
})
export class CancelarProfComponent implements OnInit {

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
            this.listado = turnos.filter(x => x.profesional.uid == this.user.uid && (x.estado === 'PENDIENTE' || x.estado === 'ACEPTADO'));
            this.isLoading = false;
        });
    }

    cancelarTurno(turno: Turno) {
        Swal.fire({
            title: 'Atención',
            icon: 'error',
            text: '¿Desea cancelar su turno? Esta acción no tiene retorno.',
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
