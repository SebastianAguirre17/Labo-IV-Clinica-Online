import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-especialidades',
    templateUrl: './especialidades.component.html',
    styleUrls: ['./especialidades.component.css']
})
export class EspecialidadesComponent implements OnInit {

    @Input() listadoEspecialidades: any[];
    @Output() especialidadSeleccionada: EventEmitter<string> = new EventEmitter();

    constructor() { }

    ngOnInit(): void {
    }

    seleccionarEspecialidad(especialid: string) {
        this.especialidadSeleccionada.emit(especialid);
    }

}
