import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.interface';

@Component({
    selector: 'app-titulo',
    templateUrl: './titulo.component.html',
    styleUrls: ['./titulo.component.scss']
})
export class TituloComponent implements OnInit {


    @Input() user: User;
    @Input() leyenda: string;

    constructor() { }

    ngOnInit(): void {
    }

}
