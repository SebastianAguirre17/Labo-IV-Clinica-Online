import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { User } from 'src/app/shared/models/user.interface';

@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

    isLoading: boolean = false;
    listado: any[] = [];

    constructor(private dbService: DataService) { 

    }

    ngOnInit() {
        this.getUsuarios();
    }

    getUsuarios() {
        this.isLoading = true;

        this.dbService.getAll('users').subscribe(usuarios => {
            this.listado = usuarios.filter(x => x.role == 'PROFESIONAL');
            this.isLoading = false;

        });
    }

    activar(user: User) {
        user.emailVerified = true;
        this.dbService.updateOne(user, 'users');
    }

    desactivar(user: User) {
        user.emailVerified = false;
        this.dbService.updateOne(user, 'users');
    }
}
