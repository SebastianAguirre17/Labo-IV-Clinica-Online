import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfesionalRoutingModule } from './profesional-routing.module';
import { ProfesionalComponent } from './profesional.component';


@NgModule({
  declarations: [ProfesionalComponent],
  imports: [
    CommonModule,
    ProfesionalRoutingModule
  ]
})
export class ProfesionalModule { }
