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
import { UsuariosAdminComponent } from './usuarios-admin/usuarios-admin.component';
import { TurnosProfComponent } from './turnos-prof/turnos-prof.component';
import { CancelarProfComponent } from './cancelar-prof/cancelar-prof.component';

const routes: Routes = [

    { 
        path: 'dashboard', 
        component: PagesComponent,
        children: [
            { path: '', component: DashboardComponent, data: { titulo: 'Principal'}, canActivate: [AuthGuard] }, 
            { path: 'agregar-usuario', component: AgregarUsuarioComponent, data: { titulo: 'Agregar usuario'}, canActivate: [AdminGuard] },
            { path: 'resenia', component: ReseniaComponent, data: { titulo: 'Reseña'}, canActivate: [PacienteGuard] },
            { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Profesionales'}, canActivate: [AdminGuard] },
            { path: 'usuarios-admin', component: UsuariosAdminComponent, data: { titulo: 'Administradores'}, canActivate: [AdminGuard] },
            { path: 'sacar-turno', component: SacarTurnoComponent, data: { titulo: 'Sacar turno'}, canActivate: [PacienteGuard] },
            { path: 'cancelar-turno', component: CancelarTurnoComponent, data: { titulo: 'Cancelar turno'}, canActivate: [PacienteGuard] },
            { path: 'cancelar-prof', component: CancelarProfComponent, data: { titulo: 'Cancelar turno'}, canActivate: [ProfesionalGuard] },
            { path: 'atender-pacientes', component: AtenderPacienteComponent, data: { titulo: 'Atender paciente'}, canActivate: [ProfesionalGuard] },
            { path: 'turnos', component: TurnosComponent, data: { titulo: 'Turnos'}, canActivate: [PacienteGuard] },
            { path: 'turnos-prof', component: TurnosProfComponent, data: { titulo: 'Turnos'}, canActivate: [ProfesionalGuard] }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
