import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    }

    getProfesionales(especialidad: string) {
        this.listadoProfesionales = [];
        let listadoAuxiliar: any[] = [];

        this.dbService.getAll('users').subscribe(usuarios => {
            listadoAuxiliar = usuarios.filter(x => x.role == 'PROFESIONAL' && x.emailVerified);
            
            listadoAuxiliar.forEach((item: User) => {
                const found = item.especialidades.find(element => element === especialidad);
                if(found != undefined)
                    this.listadoProfesionales.push(item);
            });
        });
    }

    getEspecialidades() {
        this.dbService.getAll('especialidades').subscribe(especialidades => {
            this.listadoEspecialidades = especialidades;
        });
    }

    getEspecialidadFromComponent(especialidad: string) {
        this.especialidadSeleccionada = especialidad;
        this.getProfesionales(this.especialidadSeleccionada);
    }

    getFechas() {

    }

}
