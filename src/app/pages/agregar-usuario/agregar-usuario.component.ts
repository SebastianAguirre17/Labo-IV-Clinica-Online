import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/shared/models/user.interface';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-agregar-usuario',
    templateUrl: './agregar-usuario.component.html',
    styleUrls: ['./agregar-usuario.component.css']
})
export class AgregarUsuarioComponent implements OnInit {

    usuarioForm: FormGroup = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
        password: ['', [Validators.required, Validators.minLength(8)]]
    });

    constructor(private fb: FormBuilder,
                private auth: AuthService) { }

    ngOnInit(): void {

    }

    get invalidEmail() {
        return this.usuarioForm.get('email').invalid && this.usuarioForm.get('email').touched;
    }

    get invalidPassword() {
        return this.usuarioForm.get('password').invalid && this.usuarioForm.get('password').touched;
    }

    get invalidName() {
        return this.usuarioForm.get('name').invalid && this.usuarioForm.get('name').touched;
    }

    crearUsuario() {
        if (this.usuarioForm.invalid) {
            return Object.values(this.usuarioForm.controls).forEach(control => {
                if (control instanceof FormGroup)
                    Object.values(control.controls).forEach(control => control.markAsTouched());
                else
                    control.markAsTouched();
            });
        }

        const { email, password, name } = this.usuarioForm.value;

        this.auth.register(email, password).then(user => {
            if(user) {
                this.auth.updateStateUser(user, name).then((user) => {
                    Swal.fire({
                        icon: 'info',
                        title: 'Usuario agregado',
                        text: 'El usuario fue creado correctamente',
                        showConfirmButton: true
                    });
                });
                this.cancelar();
            }
            Swal.close();
        });
    }

    cancelar() {
        this.usuarioForm.reset();

        this.usuarioForm.setValue({
            name: '',
            email: '',
            password: '',
            role: 'PROFESIONAL'
        });
    }
}
