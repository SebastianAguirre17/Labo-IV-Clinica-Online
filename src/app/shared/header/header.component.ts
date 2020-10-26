import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styles: [
    ]
})
export class HeaderComponent implements OnInit {

    public user$: Observable<any> = this.auth.user$;

    constructor(private auth: AuthService, private router: Router) { }

    ngOnInit(): void {

    }

    async onLogout() {
        try {
            await this.auth.logout();
            this.router.navigate(['/login']);
        }
        catch (err) {
            console.log(err);
        }
    }


}
