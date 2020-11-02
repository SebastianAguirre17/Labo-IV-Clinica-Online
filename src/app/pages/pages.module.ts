import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { TurnosComponent } from './turnos/turnos.component';
import { SacarTurnoComponent } from './sacar-turno/sacar-turno.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AgregarUsuarioComponent } from './agregar-usuario/agregar-usuario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsuariosAdminComponent } from './usuarios-admin/usuarios-admin.component';
import { TurnosProfComponent } from './turnos-prof/turnos-prof.component';
import { ComponentsModule } from '../components/components.module';
import { HorariosComponent } from './horarios/horarios.component';

@NgModule({
    declarations: [
        DashboardComponent,
        PagesComponent,
        TurnosComponent,
        SacarTurnoComponent,
        UsuariosComponent,
        AgregarUsuarioComponent,
        UsuariosAdminComponent,
        TurnosProfComponent,
        HorariosComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,
        ReactiveFormsModule,
        ComponentsModule
    ],
    exports: [
        DashboardComponent,
        PagesComponent,
        TurnosComponent,
        SacarTurnoComponent,
        UsuariosComponent,
        AgregarUsuarioComponent,
        UsuariosAdminComponent,
        TurnosProfComponent,
    ]
})
export class PagesModule { }
