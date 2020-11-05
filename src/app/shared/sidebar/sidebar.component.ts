import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styles: [
    ]
})
export class SidebarComponent implements OnInit {

    menuPacientes: any[];
    menuProfesionales: any[];
    menuAdmin: any[];

    constructor(private sidebar: SidebarService,
                private auth: AuthService,
                private dbService: DataService) {
        this.menuPacientes = this.sidebar.menuPacientes;
        this.menuProfesionales = this.sidebar.menuProfesionales;
        this.menuAdmin = this.sidebar.menuAdmin;
    }
    
    ngOnInit(): void {
    }

}
