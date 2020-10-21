import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import { Observable, of } from 'rxjs';
import { User } from '../models/user.interface';
import { first, switchMap } from 'rxjs/operators';
import { RoleVlidator } from '../helpers/role-validator.class';
import Swal from 'sweetalert2';
import { Role } from '../models/roles.types';

@Injectable({
    providedIn: 'root'
})
export class AuthService extends RoleVlidator {

    public user$: Observable<User>;

    constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore) {
        
        super();
        
        this.user$ = this.afAuth.authState.pipe(
            switchMap((user) => {
                if (user) {
                    return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
                }
                return of(null);
            })
        )
    }

    async resetPassword(email: string) {
        try {
            return this.afAuth.sendPasswordResetEmail(email);
        }
        catch (error) {
            Swal.fire({
                text: error.message,
                allowOutsideClick: false,
                icon: 'error'
            });
        }
    }

    async sendVerificationEmail(): Promise<void> {
        return (await this.afAuth.currentUser).sendEmailVerification();
    }

    async login(email: string, password: string): Promise<User> {
        Swal.fire({
            text: 'Espere por favor',
            allowOutsideClick: false,
            icon: 'info'
        });
        Swal.showLoading();
        try {
            const { user } = await this.afAuth.signInWithEmailAndPassword(
                email,
                password
            );
            
            return user;
        } catch (error) {
            Swal.fire({
                text: error.message,
                allowOutsideClick: false,
                icon: 'error'
            });
        }
    }

    async register(email: string, password: string): Promise<User> {
        Swal.fire({
            text: 'Espere por favor',
            allowOutsideClick: false,
            icon: 'info'
        });
        Swal.showLoading();
        try {
            const { user } = await this.afAuth.createUserWithEmailAndPassword(
                email,
                password
            );
            await this.sendVerificationEmail();
            return user;
        } catch (error) {
            Swal.fire({
                text: error.message,
                allowOutsideClick: false,
                icon: 'error'
            });
        }
    }

    async logout() {
        try {
            return this.afAuth.signOut();
        }
        catch (err) {
            console.log(err);
        }
    }

    updateRolUser(user: User, rol: Role) {
        const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
        const data: User = {
            uid: user.uid,
            email: user.email,
            emailVerified: user.emailVerified,
            role: rol
        }

        return userRef.set(data, { merge: true });
    }
}