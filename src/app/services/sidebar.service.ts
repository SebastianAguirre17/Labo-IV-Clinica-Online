import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SidebarService {

    menuPacientes: any[] = [
        {
            titulo: 'Pacientes',
            icono: 'mdi mdi-gauge',
            submenu: [
                { titulo: 'Ver turnos', url: 'mis-turnos' },
                { titulo: 'Sacar turno', url: 'turnos' },
            ]
        }
    ];

    menuProfesionales: any[] = [
        {
            titulo: 'Profesionales',
            icono: 'mdi mdi-gauge',
            submenu: [
                { titulo: 'Gestionar Horarios', url: 'horarios' },
                { titulo: 'Turnos', url: 'turnos-prof' }
                //{ titulo: 'Cancelar turno', url: 'cancelar-prof' }
                // { titulo: 'Atender paciente', url: 'atender-pacientes' }
            ]
        }
    ];

    menuAdmin: any[] = [
        {
            titulo: 'Admin',
            icono: 'mdi mdi-gauge',
            submenu: [
                { titulo: 'Ver Profesionales', url: 'usuarios' },
                { titulo: 'Ver Administradores', url: 'usuarios-admin' },
                { titulo: 'Agregar usuario', url: 'agregar-usuario' }
            ]
        }
    ];

    constructor() { }


}
