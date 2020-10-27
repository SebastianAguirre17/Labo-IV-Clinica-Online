import { Time } from '@angular/common';
import { ProfesionalGuard } from 'src/app/guards/profesional.guard';
import { User } from './user.interface';

export interface Turno {
    user: User,
    profesional?: User; 
    dia: Date,
    hora: Time,
    
}