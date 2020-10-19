import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { HomeProfesionalComponent } from './home-profesional/home-profesional.component';
import { HomePacienteComponent } from './home-paciente/home-paciente.component';



@NgModule({
    declarations: [
        NavbarComponent,
        HomeAdminComponent,
        HomeProfesionalComponent,
        HomePacienteComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        NavbarComponent,
        HomeAdminComponent,
        HomeProfesionalComponent,
        HomePacienteComponent
    ]
})
export class ComponentsModule { }
