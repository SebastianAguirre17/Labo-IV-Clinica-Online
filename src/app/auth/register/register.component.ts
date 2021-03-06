import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CargaImagenesService } from 'src/app/services/carga-imagenes.service';
import { FileItem } from 'src/app/shared/models/file-item.class';
import { User } from 'src/app/shared/models/user.interface';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    mostrarImagenes: boolean = false;
    seleccion: boolean = false;
    estaSobreElemento: boolean = false;
    archivos: FileItem[] = [];

    siteKey: string;

    public registerForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        role: ['PROFESIONAL', Validators.required],
        recaptcha: ['', Validators.required],
        especialidad: ['CLINICO', Validators.required]
    });

    constructor(private fb: FormBuilder,
                private auth: AuthService,
                private router: Router,
                private _carga: CargaImagenesService) { 
        this.siteKey = '6LfrydsZAAAAAKvM5aDY2_8WkPMg9mhVnXeaRE99';
    }

    ngOnInit(): void {
    }

    get invalidEmail() {
        return this.registerForm.get('email').invalid && this.registerForm.get('email').touched;
    }

    get invalidPassword() {
        return this.registerForm.get('password').invalid && this.registerForm.get('password').touched;
    }

    get invalidName() {
        return this.registerForm.get('name').invalid && this.registerForm.get('name').touched;
    }

    get invalidCaptcha() {
        return this.registerForm.get('recaptcha').invalid && this.registerForm.get('recaptcha').touched;
    }

    async onRegister() {
        if (this.registerForm.invalid) {
            return Object.values(this.registerForm.controls).forEach(control => {
                if (control instanceof FormGroup)
                    Object.values(control.controls).forEach(control => control.markAsTouched());
                else
                    control.markAsTouched();
            });
        }

        const { email, password, role, name, especialidad } = this.registerForm.value;
        
        try {
            const user = await this.auth.register(email, password);
            
            this.auth.updateRolUser(user, role, name);
            
            Swal.close();
            if(role === 'PACIENTE') {
                this.cargarImagenes(user);
                this.router.navigate(['/verification']);
            }
            else if(role === 'PROFESIONAL') {
                this.auth.updateEspecialidad(user, especialidad);
                this.router.navigate(['/login']);
            }
            else 
                this.router.navigate(['/login']);
        }
        catch (err) {
            console.log(err);
        }
    }

    cambiarElementoSeleccionado() {
        if(this.registerForm.value.role === 'PACIENTE') 
            this.mostrarImagenes = true
        else    
            this.mostrarImagenes = false;
    }

    limpiar() {
        this.archivos = [];
    }

    cargarImagenes(user: User) {
        this._carga.cargarImagenesFirebase(this.archivos, user);
    }

}
