import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/shared/models/user.interface';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
        password: ['', [Validators.required, Validators.minLength(8)]]
    });

    constructor(private fb: FormBuilder,
        private auth: AuthService,
        private router: Router) { }

    ngOnInit(): void {
    }

    get invalidEmail() {
        return this.loginForm.get('email').invalid && this.loginForm.get('email').touched;
    }

    get invalidPassword() {
        return this.loginForm.get('password').invalid && this.loginForm.get('password').touched;
    }

    async onLogin() {
        if (this.loginForm.invalid) {
            return Object.values(this.loginForm.controls).forEach(control => {
                if (control instanceof FormGroup)
                    Object.values(control.controls).forEach(control => control.markAsTouched());
                else
                    control.markAsTouched();
            });
        }

        const { email, password } = this.loginForm.value;
        try {
            const user = await this.auth.login(email, password);

            if (user) {
                this.auth.user$.subscribe(userObs => {
                    if(userObs) {
                        if(userObs.emailVerified) {
                            this.router.navigate(['/dashboard']);
                        }else {
                            if (userObs.role === 'PACIENTE' && user.emailVerified) {
                                this.auth.updateEmailVerified(userObs);
                                console.log('Entreeeee');
                                this.router.navigate(['/dashboard']);
                            } else {
                                this.router.navigate(['/verification']);
                            }
    
                        }
                    }
                    else {
                        console.log('ERR');
                    }
                    Swal.close();
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    setAdmin() {
        this.loginForm.setValue({
            email: 'admin@admin.com',
            password: '11111111'
        });
    }

    setProfesional() {
        this.loginForm.setValue({
            email: 'prof@prof.com',
            password: '11111111'
        });
    }

    setPaciente() {
        this.loginForm.setValue({
            email: 'sebaaguirre2012@outlook.com',
            password: '11111111'
        });
    }
}
