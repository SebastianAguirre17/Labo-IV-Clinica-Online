import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class PacienteGuard implements CanActivate {

    constructor(private auth: AuthService) {
    }

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        return this.auth.user$.pipe(
            take(1),
            map((user) => user && this.auth.isPatient(user) && user.emailVerified),
            tap((canPatient) => {
                if (!canPatient) {
                    Swal.fire({
                        text: 'Debe ser paciente para acceder a la ruta especificada.',
                        allowOutsideClick: false,
                        showCloseButton: true,
                        icon: 'error',
                        title: 'Acceso denegado'
                    });
                }
            })
        )
    }
}