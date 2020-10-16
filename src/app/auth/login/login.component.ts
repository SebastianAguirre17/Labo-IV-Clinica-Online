import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

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
            const user = this.auth.login(email, password);
            if(user) {
                this.router.navigate(['/home']);
            }
        }
        catch(err) {
            console.log(err);
        }
    }

}
