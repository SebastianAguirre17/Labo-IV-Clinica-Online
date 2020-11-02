import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { Turno } from 'src/app/shared/models/turno.interface';
import { User } from 'src/app/shared/models/user.interface';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-turnos',
    templateUrl: './turnos.component.html',
    styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {
  
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
            this.listado = turnos.filter(x => x.user.uid === this.user.uid);
            this.isLoading = false;
        });
    }

    cancelarTurno(turno: Turno) {
        turno.estado = 'CANCELADO';
        this.dbService.updateOne(turno, 'turnos');
        Swal.fire({
            title: 'Atención',
            text: 'Su turno ha sido cancelado',
            icon: 'info',
            showConfirmButton: true

        });
    }
}
