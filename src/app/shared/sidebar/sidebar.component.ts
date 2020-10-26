import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from 'src/app/services/auth.service';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styles: [
    ]
})
export class SidebarComponent implements OnInit {

    public user$: Observable<any> = this.auth.user$;

    menuPacientes: any[];
    menuProfesionales: any[];
    menuAdmin: any[];

    constructor(private sidebar: SidebarService,
                private auth: AuthService) {
        this.menuPacientes = this.sidebar.menuPacientes;
        this.menuProfesionales = this.sidebar.menuProfesionales;
        this.menuAdmin = this.sidebar.menuAdmin;

    }
    
    ngOnInit(): void {
        
    }

}
