import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
     selector: 'app-forgot-password',
     templateUrl: './forgot-password.component.html',
     styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

     userEmail = new FormControl('');

     constructor(private auth: AuthService, private router: Router) { }

     ngOnInit(): void {
     }

     async onReset() {
          const email = this.userEmail.value
          try {
               this.auth.resetPassword(email);    
               this.router.navigate(['/login'])
          }
          catch(err) {
               console.log(err);
          }
     }
}