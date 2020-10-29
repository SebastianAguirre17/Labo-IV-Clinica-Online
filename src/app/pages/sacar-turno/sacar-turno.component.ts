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
    
    turnoForm: FormGroup;
    listadoMedicos: User[] = [];
    user: User;
    medico: User;

    constructor(private fb: FormBuilder,
                private auth: AuthService,
                private myValidator: ValidatorsService,
                private dbService: DataService) {
    }

    ngOnInit(): void {
        this.crearFormulario();
        this.getProfesionales();
        this.auth.user$.subscribe(userObs => {
            this.dbService.getOne(userObs.uid, 'users').subscribe((user: User) => {
                this.user = user;
            });
        });
    }

    get invalidDate() {
        return this.turnoForm.get('date').invalid && this.turnoForm.get('date').touched;
    }

    get invalidTime() {
        return this.turnoForm.get('time').invalid && this.turnoForm.get('time').touched;
    }

    get invalidMedic() {
        return this.turnoForm.get('medic').invalid && this.turnoForm.get('medic').touched;
    }

    crearFormulario() {
        this.turnoForm = this.fb.group({
            date: ['', [Validators.required, this.myValidator.invalidDate]],
            time: ['09:00', [Validators.required, Validators.min(9), Validators.max(19), this.myValidator.invalidTimeFormat]],
            especialidad: ['CLINICO', [Validators.required]],
            medic: ['', [Validators.required]]
        });
    }

    sacarTurno() {
        if (this.turnoForm.invalid) {
            return Object.values(this.turnoForm.controls).forEach(control => {
                if (control instanceof FormGroup)
                    Object.values(control.controls).forEach(control => control.markAsTouched());
                else
                    control.markAsTouched();
            });
        }
     
        Swal.fire({
            text: 'Espere por favor...',
            icon: 'info'
        });
        Swal.showLoading();

        const { especialidad, date, time, medic } = this.turnoForm.value;
        
        this.dbService.getOne(medic, 'users').subscribe(resp => {
            this.medico = resp;

            let turno: Turno = {
                profesional: this.medico,
                user: this.user,
                hora: time,
                dia: date,
                especialidad: especialidad,
                estado: 'PENDIENTE'
            }

            this.dbService.setOne(turno, 'turnos');
            this.cancelar();
            Swal.fire({
                title: 'Muy bien',
                icon: 'info',
                text: 'Su turno se cargó correctamente',
                showConfirmButton: true
            });
        });
        
    }

    cancelar() {
        this.turnoForm.reset();
        this.crearFormulario();
    }

    getProfesionales() {
        this.listadoMedicos = [];

        let espec = this.turnoForm.get('especialidad').value;
        let listadoAuxiliar: any[] = [];

        Swal.fire({
            icon: 'info',
            text: 'Espere por favor...',
        });
        Swal.showLoading();

        this.dbService.getAll('users').subscribe(usuarios => {
            listadoAuxiliar = usuarios.filter(x => x.role == 'PROFESIONAL' && x.emailVerified);
            
            listadoAuxiliar.forEach((item: User) => {
                const found = item.especialidades.find(element => element === espec);
                if(found != undefined)
                    this.listadoMedicos.push(item);
            })

            Swal.close();
        });
    }

}
