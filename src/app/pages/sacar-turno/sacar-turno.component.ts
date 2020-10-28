import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { ValidatorsService } from 'src/app/services/validators.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-sacar-turno',
    templateUrl: './sacar-turno.component.html',
    styleUrls: ['./sacar-turno.component.css']
})
export class SacarTurnoComponent implements OnInit {
    
    turnoForm: FormGroup;
    listadoMedicos: any[] = [];

    constructor(private fb: FormBuilder,
                private auth: AuthService,
                private myValidator: ValidatorsService,
                private dbService: DataService) { }

    ngOnInit(): void {
        this.crearFormulario();
        this.getProfesionales();
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
            date: ['', [Validators.required]],
            time: ['09:00', [Validators.required, Validators.min(9), Validators.max(18), this.myValidator.invalidTimeFormat]],
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

        console.log(this.turnoForm.value);
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
            
            listadoAuxiliar.forEach(item => {
                const found = item.especialidades.find(element => element === espec);
                if(found != undefined)
                    this.listadoMedicos.push(item);
            })

            Swal.close();
        });
    }


}
