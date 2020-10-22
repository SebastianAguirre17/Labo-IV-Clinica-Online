import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
     selector: 'app-forgot-password',
     templateUrl: './forgot-password.component.html',
     styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

     forma: FormGroup;

     constructor(private fb: FormBuilder, 
                 private auth: AuthService, 
                 private router: Router) { }
                 
     ngOnInit(): void {
          this.crearFormulario();
     }

     get invalidEmail() {
          return this.forma.get('email').invalid && this.forma.get('email').touched;
      }

      crearFormulario() {
          this.forma = this.fb.group({
              email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]]
          });
      }  

     async onReset() {
          if (this.forma.invalid) {
               return Object.values(this.forma.controls).forEach(control => {
                   if (control instanceof FormGroup)
                       Object.values(control.controls).forEach(control => control.markAsTouched());
                   else
                       control.markAsTouched();
               });
           }

          const email = this.forma.value
          try {
               await this.auth.resetPassword(email);    
               this.router.navigate(['/login'])
          }
          catch(err) {
               console.log(err);
          }
     }
}