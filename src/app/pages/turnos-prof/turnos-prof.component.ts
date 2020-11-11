import { TurnoPendiente } from 'src/app/shared/models/turno-pendiente.interface';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { Turno } from 'src/app/shared/models/turno.interface';
import { User } from 'src/app/shared/models/user.interface';

import { jsPDF } from "jspdf";
import * as XLSX from 'xlsx';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-turnos-prof',
    templateUrl: './turnos-prof.component.html',
    styleUrls: ['./turnos-prof.component.css']
})
export class TurnosProfComponent implements OnInit {


    public historiaForm = this.fb.group({
        age: ['', [Validators.required, Validators.minLength(1)]],
        peso: ['', [Validators.required, Validators.minLength(2), Validators.min(5), Validators.max(150)]],
        temp: ['', [Validators.required, Validators.minLength(2), Validators.min(30), Validators.max(42)]],
        presion: ['', [Validators.required, Validators.minLength(2)]],
        clave1: [''],
        clave2: [''],
        clave3: [''],
        valor1: [''],
        valor2: [''],
        valor3: ['']
    });

    listado: any[] = [];
    listadoPendientes: any[] = [];
    isLoading = false;
    isLoading2 = false;
    user: User;
    turnoSeleccionado: Turno;

    reseniaForm = this.fb.group({
        text: ['', [Validators.required, Validators.minLength(2)]],
    });

    constructor(private dbService: DataService,
        private auth: AuthService,
        private fb: FormBuilder) {
    }

    get invalidAge() {
        return this.historiaForm.get('age').invalid && this.historiaForm.get('age').touched;
    }

    get invalidPeso() {
        return this.historiaForm.get('peso').invalid && this.historiaForm.get('peso').touched;
    }

    get invalidPresion() {
        return this.historiaForm.get('presion').invalid && this.historiaForm.get('presion').touched;
    }

    get invalidTemp() {
        return this.historiaForm.get('temp').invalid && this.historiaForm.get('temp').touched;
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

    atenderPaciente(turno: Turno) {
        this.turnoSeleccionado = turno;
    }

    seleccionarTurno(turno: Turno) {
        this.turnoSeleccionado = turno;
        if (this.turnoSeleccionado.resenia) {
            this.reseniaForm.setValue({
                text: this.turnoSeleccionado.resenia
            });
        };
    }

    get invalidText() {
        return this.reseniaForm.get('text').invalid && this.reseniaForm.get('text').touched;
    }

    dejarResenia() {
        if (this.reseniaForm.invalid) {
            return Object.values(this.reseniaForm.controls).forEach(control => {
                if (control instanceof FormGroup)
                    Object.values(control.controls).forEach(control => control.markAsTouched());
                else
                    control.markAsTouched();
            });
        }
        this.turnoSeleccionado.resenia = this.reseniaForm.get('text').value;
        this.dbService.updateOne(this.turnoSeleccionado, 'turnos');

        Swal.fire({
            text: 'La resenia se guardó correctamente',
            title: 'Muy bien',
            showConfirmButton: true
        });
    }

    generarPdf(id: string) {
        var doc = new jsPDF({
            orientation: 'l',
            unit: 'pt',
            format: 'legal'
        });

        doc.html(document.getElementById(id), {
            callback: function (doc) {
                doc.save();
            },
            x: 5,
            y: 5
        });
    }

    generarExel(id: string) {
        let element = document.getElementById(id);
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        XLSX.writeFile(wb, 'Turnos.xlsx');
    }

    guardarHistoria() {
        if (this.historiaForm.invalid) {
            return Object.values(this.historiaForm.controls).forEach(control => {
                if (control instanceof FormGroup)
                    Object.values(control.controls).forEach(control => control.markAsTouched());
                else
                    control.markAsTouched();
            });
        }

        const { age, peso, temp, presion, clave1, clave2, clave3, valor1, valor2, valor3 } = this.historiaForm.value;

        const historia = {
            age, 
            peso, 
            temp, 
            presion
        };
        if(clave1 && valor1)
            historia[clave1] = valor1;
        if(clave2 && valor2)
            historia[clave2] = valor2;
        if(clave3 && valor3)
            historia[clave3] = valor3;

        this.turnoSeleccionado.historia = historia;
        this.turnoSeleccionado.estado = 'FINALIZADO';
        this.dbService.updateOne(this.turnoSeleccionado, 'turnos');

        Swal.fire({
            text: 'Los datos fueron cargados correctamente',
            title: 'Muy bien!',
            icon: 'info'
        });
    }
}

