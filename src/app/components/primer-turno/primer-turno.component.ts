import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/shared/models/user.interface';

@Component({
    selector: 'app-primer-turno',
    templateUrl: './primer-turno.component.html',
    styleUrls: ['./primer-turno.component.css']
})
export class PrimerTurnoComponent implements OnInit {

    @Input() primerDia: string;
    @Input() primerHora: string;
    @Input() especialidadSeleccionada: string;
    @Input() profesionalSeleccionado: User;
    @Output() seleccionarPrimerTurno: EventEmitter<string> = new EventEmitter();

    constructor() { }

    ngOnInit(): void {
    }

    seleccionarTurno() {
        this.seleccionarPrimerTurno.emit();
    }

}
