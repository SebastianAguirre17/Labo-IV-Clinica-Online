import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {

    constructor(private auth: AuthService) {
    }

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        return this.auth.user$.pipe(
            take(1),
            map((user) => user && this.auth.isAdmin(user)),
            tap((canAdmin) => {
                if(!canAdmin) {
                    console.log('Acceso denegado!');
                }
            })
        )
    }
}