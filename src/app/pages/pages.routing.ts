import { InformesComponent } from './informes/informes.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SacarTurnoComponent } from './sacar-turno/sacar-turno.component';
import { TurnosComponent } from './turnos/turnos.component';
import { PacienteGuard } from '../guards/paciente.guard';
import { AuthGuard } from '../guards/auth.guard';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AgregarUsuarioComponent } from './agregar-usuario/agregar-usuario.component';
import { AdminGuard } from '../guards/admin.guard';
import { ProfesionalGuard } from '../guards/profesional.guard';
import { UsuariosAdminComponent } from './usuarios-admin/usuarios-admin.component';
import { TurnosProfComponent } from './turnos-prof/turnos-prof.component';
import { HorariosComponent } from './horarios/horarios.component';

const routes: Routes = [

    { 
        path: 'dashboard', 
        component: PagesComponent,
        children: [
            { path: '', component: DashboardComponent, data: { titulo: 'Principal'}, canActivate: [AuthGuard] }, 
            { path: 'agregar-usuario', component: AgregarUsuarioComponent, data: { titulo: 'Agregar usuario'}, canActivate: [AdminGuard] },
            { path: 'informes', component: InformesComponent, data: { titulo: 'Informes'}, canActivate: [AdminGuard] },
            { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Profesionales', animation: 'Login'}, canActivate: [AdminGuard] },
            { path: 'usuarios-admin', component: UsuariosAdminComponent, data: { titulo: 'Administradores', animation: 'Register'}, canActivate: [AdminGuard] },
            { path: 'sacar-turno', component: SacarTurnoComponent, data: { titulo: 'Sacar turno'}, canActivate: [PacienteGuard] },
            { path: 'turnos', component: SacarTurnoComponent, data: { titulo: 'Sacar Turno'}, canActivate: [PacienteGuard] },
            { path: 'mis-turnos', component: TurnosComponent, data: { titulo: 'Turnos'}, canActivate: [PacienteGuard] },
            { path: 'horarios', component: HorariosComponent, data: { titulo: 'Turnos'}, canActivate: [ProfesionalGuard] },
            { path: 'turnos-prof', component: TurnosProfComponent, data: { titulo: 'Turnos'}, canActivate: [ProfesionalGuard] }
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
