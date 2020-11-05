import { Time } from '@angular/common';
import { Estado } from './estado-turno.type';
import { User } from './user.interface';

export interface Turno {
    user?: User;
    profesional?: User; 
    especialidad?: string;
    dia?: Date;
    hora?: Time;
    estado?: Estado;
    id?: string;
    resenia?: string;
}