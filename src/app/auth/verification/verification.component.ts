import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/shared/models/user.interface';

@Component({
    selector: 'app-verification',
    templateUrl: './verification.component.html',
    styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {

    public user$: Observable<User> = this.auth.user$

    constructor(private auth: AuthService, private router: Router) { }

    ngOnInit(): void {
    }

    async onSendEmail() {
        try {
            this.auth.sendVerificationEmail();
        }
        catch (err) {
            console.log(err);
        }
    }

    async iniciarSesion() {
        await this.auth.logout();
        this.router.navigate(['/login']);
    }

}
