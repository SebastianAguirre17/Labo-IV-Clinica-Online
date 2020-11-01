import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EspecialidadesComponent } from './especialidades/especialidades.component';
import { ProfesionalesComponent } from './profesionales/profesionales.component';
import { ScrollingModule } from '@angular/cdk/scrolling'


@NgModule({
    declarations: [
        EspecialidadesComponent,
        ProfesionalesComponent
    ],
    imports: [
        CommonModule,
        ScrollingModule
    ],
    exports: [
        EspecialidadesComponent,
        ProfesionalesComponent
    ]
})
export class ComponentsModule { }
