import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    public user$: Observable<any> = this.auth.afAuth.user;

    constructor(private auth: AuthService, private router: Router) { }

    ngOnInit(): void {

    }

    async onLogout() {
        try {
            await this.auth.logout();
            this.router.navigate(['/login']);
        }
        catch(err) {
            console.log(err);
        }
    }

}
