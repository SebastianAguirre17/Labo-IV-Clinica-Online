import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    turnoSeleccionado: Turno;

    reseniaForm= this.fb.group({
        text: ['', [Validators.required, Validators.minLength(2)]],
    });

    constructor(private dbService: DataService,
                private auth: AuthService,
                private fb: FormBuilder) {
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

    verResenia(turno: Turno) {
        this.turnoSeleccionado = turno;
    }

    get invalidText() {
        return this.reseniaForm.get('text').invalid && this.reseniaForm.get('text').touched;
    }

    dejarComentario() {
        if (this.reseniaForm.invalid) {
            return Object.values(this.reseniaForm.controls).forEach(control => {
                if (control instanceof FormGroup)
                    Object.values(control.controls).forEach(control => control.markAsTouched());
                else
                    control.markAsTouched();
            });
        }
       
    }
}
