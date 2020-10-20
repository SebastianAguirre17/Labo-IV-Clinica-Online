import { IfStmt } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FileItem } from 'src/app/models/file-item.class';
import { User } from 'src/app/models/user.interface';
import { CargaImagenesService } from 'src/app/services/carga-imagenes.service';
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


    registerForm = new FormGroup({
        email: new FormControl(''),
        password: new FormControl(''),
        rol: new FormControl('PROFESIONAL')
    });
    constructor(private auth: AuthService, private router: Router, public _carga: CargaImagenesService) { }

    ngOnInit(): void {
    }

    async onRegister() {
        const { email, password, rol } = this.registerForm.value;
        
        try {
            const user = await this.auth.register(email, password);
            
            this.auth.updateRolUser(user, rol);
            
            if(rol === 'PACIENTE') {
                this.cargarImagenes(user);
                this.checkUserIsVerified(user);
            }
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

    cambiarElementoSeleccionado() {
        if(this.registerForm.value.rol === 'PACIENTE')
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