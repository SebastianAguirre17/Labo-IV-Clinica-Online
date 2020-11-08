import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EspecialidadesComponent } from './especialidades/especialidades.component';
import { ProfesionalesComponent } from './profesionales/profesionales.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FechasComponent } from './fechas/fechas.component';
import { HorasComponent } from './horas/horas.component';
import { PrimerTurnoComponent } from './primer-turno/primer-turno.component'


@NgModule({
    declarations: [
        EspecialidadesComponent,
        ProfesionalesComponent,
        FechasComponent,
        HorasComponent,
        PrimerTurnoComponent
    ],
    imports: [
        CommonModule,
        ScrollingModule
    ],
    exports: [
        EspecialidadesComponent,
        ProfesionalesComponent,
        FechasComponent,
        PrimerTurnoComponent,
        HorasComponent
    ]
})
export class ComponentsModule { }
