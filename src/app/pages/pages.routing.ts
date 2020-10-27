import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReseniaComponent } from './resenia/resenia.component';
import { SacarTurnoComponent } from './sacar-turno/sacar-turno.component';
import { CancelarTurnoComponent } from './cancelar-turno/cancelar-turno.component';
import { TurnosComponent } from './turnos/turnos.component';
import { PacienteGuard } from '../guards/paciente.guard';
import { AuthGuard } from '../guards/auth.guard';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AgregarUsuarioComponent } from './agregar-usuario/agregar-usuario.component';
import { AdminGuard } from '../guards/admin.guard';
import { AtenderPacienteComponent } from './atender-paciente/atender-paciente.component';
import { ProfesionalGuard } from '../guards/profesional.guard';

const routes: Routes = [

    { 
        path: 'dashboard', 
        component: PagesComponent,
        children: [
            { path: '', component: DashboardComponent, data: { titulo: 'Principal'}, canActivate: [AuthGuard] }, 
            { path: 'agregar-usuario', component: AgregarUsuarioComponent, data: { titulo: 'Agregar usuario'}, canActivate: [AdminGuard] },
            { path: 'resenia', component: ReseniaComponent, data: { titulo: 'Reseña'}, canActivate: [PacienteGuard] },
            { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Usuarios'}, canActivate: [AdminGuard] },
            { path: 'sacar-turno', component: SacarTurnoComponent, data: { titulo: 'Sacar turno'}, canActivate: [PacienteGuard] },
            { path: 'cancelar-turno', component: CancelarTurnoComponent, data: { titulo: 'Cancelar turno'}, canActivate: [PacienteGuard] },
            { path: 'atender-pacientes', component: AtenderPacienteComponent, data: { titulo: 'Atender paciente'}, canActivate: [ProfesionalGuard] },
            { path: 'turnos', component: TurnosComponent, data: { titulo: 'Turnos'}, canActivate: [PacienteGuard] }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
