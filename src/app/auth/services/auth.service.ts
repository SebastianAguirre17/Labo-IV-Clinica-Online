import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(public afAuth: AngularFireAuth) { }

    async login(email: string, password: string) {
        try {
            const user = this.afAuth.signInWithEmailAndPassword(email, password);
            return user;
        }
        catch(err) {
            console.log(err);
        }
    }

    async register(email: string, password: string) {
        try {
            const user = await this.afAuth.createUserWithEmailAndPassword(email, password);
            return user;
        }
        catch(err) {
            console.log(err);
        }
    }

    async logout() {
        try {
            return this.afAuth.signOut();
        }
        catch(err) {
            console.log(err);
        }
    }

    async getCurrentUser() {
        try {
            return this.afAuth.authState.pipe(first()).toPromise();
        }
        catch(err) {
            console.log(err);
        }
    }
}
