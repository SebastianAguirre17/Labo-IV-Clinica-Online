import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EspecialidadesComponent } from './especialidades/especialidades.component';
import { ProfesionalesComponent } from './profesionales/profesionales.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FechasComponent } from './fechas/fechas.component';
import { HorasComponent } from './horas/horas.component'


@NgModule({
    declarations: [
        EspecialidadesComponent,
        ProfesionalesComponent,
        FechasComponent,
        HorasComponent
    ],
    imports: [
        CommonModule,
        ScrollingModule
    ],
    exports: [
        EspecialidadesComponent,
        ProfesionalesComponent,
        FechasComponent,
        HorasComponent
    ]
})
export class ComponentsModule { }
