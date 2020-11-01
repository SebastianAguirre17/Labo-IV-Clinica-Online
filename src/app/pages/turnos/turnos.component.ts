import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { User } from 'src/app/shared/models/user.interface';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-turnos',
    templateUrl: './turnos.component.html',
    styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {
    listadoEspecialidades: any[] = [];
    listadoProfesionales: User[] = [];
    listadoDias: string[] = [];

    user: User;
    
    especialidadSeleccionada: string;
    profesionalSeleccionado: User;
    diaSeleccionado: any;

    constructor(private dbService: DataService,
                private auth: AuthService) {
    }

    ngOnInit() {
        this.getEspecialidades();
        this.getProfesionales();
    }

    getProfesionales() {
        this.dbService.getAll('users').subscribe(users => {
            this.listadoProfesionales = users.filter(x => x.role == 'PROFESIONAL' && x.emailVerified);
            console.log(this.listadoProfesionales);
        });
    }

    getEspecialidades() {
        this.dbService.getAll('especialidades').subscribe(especialidades => {
            this.listadoEspecialidades = especialidades;
            console.log(this.listadoEspecialidades);
        });
    }



    getFechas() {

    }
}
