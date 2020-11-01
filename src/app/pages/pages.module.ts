import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { TurnosComponent } from './turnos/turnos.component';
import { SacarTurnoComponent } from './sacar-turno/sacar-turno.component';
import { CancelarTurnoComponent } from './cancelar-turno/cancelar-turno.component';
import { ReseniaComponent } from './resenia/resenia.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AgregarUsuarioComponent } from './agregar-usuario/agregar-usuario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AtenderPacienteComponent } from './atender-paciente/atender-paciente.component';
import { UsuariosAdminComponent } from './usuarios-admin/usuarios-admin.component';
import { TurnosProfComponent } from './turnos-prof/turnos-prof.component';
import { CancelarProfComponent } from './cancelar-prof/cancelar-prof.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
    declarations: [
        DashboardComponent,
        PagesComponent,
        TurnosComponent,
        SacarTurnoComponent,
        CancelarTurnoComponent,
        ReseniaComponent,
        UsuariosComponent,
        AgregarUsuarioComponent,
        AtenderPacienteComponent,
        UsuariosAdminComponent,
        TurnosProfComponent,
        CancelarProfComponent
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
        CancelarTurnoComponent,
        ReseniaComponent,
        UsuariosComponent,
        AgregarUsuarioComponent,
        AtenderPacienteComponent,
        UsuariosAdminComponent,
        TurnosProfComponent,
        CancelarProfComponent
    ]
})
export class PagesModule { }
