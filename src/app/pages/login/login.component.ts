import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../models/user.interface';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


    loginForm = new FormGroup({
        email: new FormControl(''),
        password: new FormControl('')
    });

    constructor(private auth: AuthService, private router: Router) { }

    ngOnInit(): void {
    }

    async onLogin() {
        const { email, password } = this.loginForm.value;
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
