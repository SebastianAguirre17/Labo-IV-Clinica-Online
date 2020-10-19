import { IfStmt } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.interface';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    registerForm = new FormGroup({
        email: new FormControl(''),
        password: new FormControl(''),
        rol: new FormControl('PACIENTE')
    });
    constructor(private auth: AuthService, private router: Router) { }

    ngOnInit(): void {
    }

    async onRegister() {
        const { email, password, rol } = this.registerForm.value;

        try {
            const user = await this.auth.register(email, password);
               
            this.auth.updateRolUser(user, rol);

            if(rol === 'PACIENTE') 
                this.checkUserIsVerified(user);
            else 
                this.router.navigate(['/login']);
            
                
        }
        catch (err) {
            console.log(err);
        }
    }

    private checkUserIsVerified(user: User) {
        if (user && user.emailVerified) {
            this.router.navigate(['/home-paciente']);
        } else if (user) {
            this.router.navigate(['/verification']);
        } else {
            this.router.navigate(['/register']);
        }
    }

}