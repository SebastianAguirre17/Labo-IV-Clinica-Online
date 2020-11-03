import { TurnoPendiente } from 'src/app/shared/models/turno-pendiente.interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-fechas',
    templateUrl: './fechas.component.html',
    styleUrls: ['./fechas.component.css']
})
export class FechasComponent implements OnInit {

    @Input() listadoDeFechas: string[];
    @Output() fechaSeleccionada: EventEmitter<string> = new EventEmitter();

    constructor() { }

    ngOnInit(): void {
    }

    seleccionarFecha(fecha: string) {
        this.fechaSeleccionada.emit(fecha);
    }
}
