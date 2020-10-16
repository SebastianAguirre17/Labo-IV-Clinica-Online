import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    registerForm = new FormGroup({
        email: new FormControl(''),
        password: new FormControl('')
    });

    constructor(private auth: AuthService, private router: Router) { }

    ngOnInit(): void {
    }

    onRegister() { 
        const { email, password } = this.registerForm.value;

        try {
            const user = this.auth.register(email, password);

            if(user) {
                this.router.navigate(['/login']);
            }
        }
        catch(err) {
            console.log(err);
        }
    }

}
