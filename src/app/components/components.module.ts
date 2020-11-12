import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EspecialidadesComponent } from './especialidades/especialidades.component';
import { ProfesionalesComponent } from './profesionales/profesionales.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FechasComponent } from './fechas/fechas.component';
import { HorasComponent } from './horas/horas.component';
import { PrimerTurnoComponent } from './primer-turno/primer-turno.component';
import { InformeProfesionalesComponent } from './informe-profesionales/informe-profesionales.component';
import { InformeDiasComponent } from './informe-dias/informe-dias.component'

import { ChartsModule } from 'ng2-charts';

@NgModule({
    declarations: [
        EspecialidadesComponent,
        ProfesionalesComponent,
        FechasComponent,
        HorasComponent,
        PrimerTurnoComponent,
        InformeProfesionalesComponent,
        InformeDiasComponent
    ],
    imports: [
        CommonModule,
        ScrollingModule,
        ChartsModule
    ],
    exports: [
        EspecialidadesComponent,
        ProfesionalesComponent,
        FechasComponent,
        HorasComponent,
        PrimerTurnoComponent,
        InformeProfesionalesComponent,
        InformeDiasComponent
    ]
})
export class ComponentsModule { }
