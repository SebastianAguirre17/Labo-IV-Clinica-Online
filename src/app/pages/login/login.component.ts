import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../models/user.interface';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    forma: FormGroup;

    constructor(private fb: FormBuilder, 
                private auth: AuthService, 
                private router: Router) { }

    ngOnInit(): void {
        this.crearFormulario();
    }

    get invalidEmail() {
        return this.forma.get('email').invalid && this.forma.get('email').touched;
    }

    get invalidPassword() {
        return this.forma.get('password').invalid && this.forma.get('password').touched;
    }

    crearFormulario() {
        this.forma = this.fb.group({
            email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
            password: ['', [Validators.required, Validators.minLength(8)]],
        });
    }

    async onLogin() {

        if (this.forma.invalid) {
            return Object.values(this.forma.controls).forEach(control => {
                if (control instanceof FormGroup)
                    Object.values(control.controls).forEach(control => control.markAsTouched());
                else
                    control.markAsTouched();
            });
        }

        const { email, password } = this.forma.value;
        try {
            const user = await this.auth.login(email, password);

            
            if (user) {
                // TODO
                this.auth.user$.subscribe(user => {
                    // console.log(user.role);
                    if (user.role === 'PACIENTE')
                        this.checkUserIsVerified(user);
                    else
                        this.checkTypeUser(user);
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    private checkUserIsVerified(user: User) {
        if (user && user.emailVerified)
            this.router.navigate(['/home-paciente']);
        else if (user)
            this.router.navigate(['/verification']);
    }

    private checkTypeUser(user: User) {
        if (user && user.role === 'ADMIN')
            this.router.navigate(['/home-admin']);
        else if (user)
            this.router.navigate(['/home-profesional']);
    }

   
}
