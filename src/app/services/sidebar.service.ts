import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SidebarService {

    menuPacientes: any[] = [
        {
            titulo: 'Menú Pacientes',
            icono: 'mdi mdi-gauge',
            submenu: [
                { titulo: 'Ver turnos', url: 'turnos' },
                { titulo: 'Sacar turno', url: 'sacar-turno' },
                { titulo: 'Cancelar turno', url: 'cancelar-turno' },
                { titulo: 'Dejar reseña', url: 'resenia' }
            ]
        }
    ];

    menuProfesionales: any[] = [
        {
            titulo: 'Principal',
            icono: 'mdi mdi-gauge',
            submenu: [
                { titulo: 'Definir horarios', url: 'turnos' },
                { titulo: 'Ver turnos pendientes', url: 'sacar-turno' },
                { titulo: 'Cancelar turno', url: 'cancelar-turno' },
                { titulo: 'Atender paciente', url: 'resenia' }
            ]
        }
    ];

    menuAdmin: any[] = [
        {
            titulo: 'Admin',
            icono: 'mdi mdi-gauge',
            submenu: [
                { titulo: 'Ver usuarios', url: 'usuarios' },
                { titulo: 'Agregar usuario', url: 'agregar-usuario' }
            ]
        }
    ];

    constructor() { }


}
