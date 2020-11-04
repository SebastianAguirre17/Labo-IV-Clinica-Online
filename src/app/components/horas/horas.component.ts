import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-horas',
    templateUrl: './horas.component.html',
    styleUrls: ['./horas.component.css']
})
export class HorasComponent implements OnInit {

    @Input() listadoDeHoras: any[];
    @Output() horaSeleccionada: EventEmitter<string> = new EventEmitter();

    constructor() { }

    ngOnInit(): void {
    }

    seleccionarHora(hora: any) {
        this.horaSeleccionada.emit(hora);
    }
}
