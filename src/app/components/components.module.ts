import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EspecialidadesComponent } from './especialidades/especialidades.component';
import { ProfesionalesComponent } from './profesionales/profesionales.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FechasComponent } from './fechas/fechas.component'


@NgModule({
    declarations: [
        EspecialidadesComponent,
        ProfesionalesComponent,
        FechasComponent
    ],
    imports: [
        CommonModule,
        ScrollingModule
    ],
    exports: [
        EspecialidadesComponent,
        ProfesionalesComponent,
        FechasComponent
    ]
})
export class ComponentsModule { }
