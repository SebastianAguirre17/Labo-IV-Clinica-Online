import { IfStmt } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FileItem } from 'src/app/models/file-item.class';
import { User } from 'src/app/models/user.interface';
import { CargaImagenesService } from 'src/app/services/carga-imagenes.service';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    mostrarImagenes: boolean = false;
    estaSobreElemento: boolean = false;
    archivos: FileItem[] = [];

    forma: FormGroup;

    registerForm = new FormGroup({
        email: new FormControl(''),
        password: new FormControl(''),
        rol: new FormControl('PROFESIONAL')
    });

    constructor(private auth: AuthService, 
                private router: Router, 
                public _carga: CargaImagenesService,
                private data: DataService,
                private fb: FormBuilder) { }

    ngOnInit(): void {

        this.crearFormulario();
    }

    get invalidEmail() {
        return this.forma.get('email').invalid && this.forma.get('email').touched;
    }

    get invalidPassword() {
        return this.forma.get('password').invalid && this.forma.get('password').touched;
    }

    crearFormulario() {
        this.forma = this.fb.group({
            email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            rol: ['PROFESIONAL', Validators.required]
        });
    }

    async onRegister() {
        if (this.forma.invalid) {
            return Object.values(this.forma.controls).forEach(control => {
                if (control instanceof FormGroup)
                    Object.values(control.controls).forEach(control => control.markAsTouched());
                else
                    control.markAsTouched();
            });
        }

        const { email, password, rol } = this.forma.value;
        
        try {
            const user = await this.auth.register(email, password);
            
            this.auth.updateRolUser(user, rol);
            
            Swal.close();
            if(rol === 'PACIENTE') {
                this.cargarImagenes(user);
                this.router.navigate(['/verification']);
            }
            else 
                this.router.navigate(['/login']);
        }
        catch (err) {
            console.log(err);
        }
    }

    cambiarElementoSeleccionado() {
        if(this.forma.value.rol === 'PACIENTE')
            this.mostrarImagenes = true;
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