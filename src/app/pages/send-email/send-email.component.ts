import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-send-email',
    templateUrl: './send-email.component.html',
    styleUrls: ['./send-email.component.scss']
})
export class SendEmailComponent implements OnInit {

    public user$: Observable<any> = this.auth.afAuth.user;

    constructor(private auth: AuthService) { }

    ngOnInit(): void {
    }

    async onSendEmail() {
        try {
            this.auth.sendVerificationEmail();
        }
        catch(err){
            console.log(err);
        }
    }

    async iniciarSesion() {
        await this.auth.logout();
    }
}