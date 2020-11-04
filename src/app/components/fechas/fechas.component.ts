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

    transformFecha (fecha: string) {
        return  `${fecha.substr(8, 2)}-${fecha.substr(5, 2)}-${fecha.substr(0, 4)}`;
    }
}
