import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-profesionales',
    templateUrl: './profesionales.component.html',
    styleUrls: ['./profesionales.component.css']
})
export class ProfesionalesComponent implements OnInit {

    @Input() listadoProfesionales: any[];
    @Output() profesionalaSeleccionado: EventEmitter<string> = new EventEmitter();

    constructor() { }

    ngOnInit(): void {
    }

    seleccionarProfesional(profesional: string) {
        this.profesionalaSeleccionado.emit(profesional);
    }
}
