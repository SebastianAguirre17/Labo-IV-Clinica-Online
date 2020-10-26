import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

    public listadoParaCompartir: Array<any>;

    isLoading: boolean = false;
    listado: any;

    constructor(private dbService: DataService) { }

    ngOnInit() {
       this.getUsuarios();
    }

    getUsuarios() {
        this.isLoading = true;
        this.dbService.GetUsers()
            .then(result => {
                this.isLoading = false;
                this.listado = result;
            });
    }

    activar() {
        console.log('Activar usuario');
    }
}
