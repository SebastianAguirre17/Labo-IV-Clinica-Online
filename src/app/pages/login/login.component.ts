import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
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
                this.auth.user$.subscribe(userObs => {
                    if (userObs.role === 'PACIENTE')
                        this.checkUserIsVerified(user);
                    else if (userObs.role === 'ADMIN')
                        this.router.navigate(['/home-admin']);
                    else if (userObs.role === 'PROFESIONAL')
                        this.router.navigate(['/home-profesional']);
                    
                    Swal.close();
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

        Swal.close();
    }

    setAdmin() {
        this.forma.setValue({
            email: 'admin@admin.com',
            password: '11111111'
        });
    }

    setProfesional() {
        this.forma.setValue({
            email: 'prof@prof.com',
            password: '11111111'
        });
    }

    setPaciente() {
        this.forma.setValue({
            email: 'sebaaguirre2012@gmail.com',
            password: '11111111'
        });
    }
    

}
