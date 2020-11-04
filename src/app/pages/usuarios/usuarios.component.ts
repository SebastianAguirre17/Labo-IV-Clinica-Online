import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { User } from 'src/app/shared/models/user.interface';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

    isLoading: boolean = false;
    listado: any[] = [];
    profesionalSeleccionado;

    public especialidadForm = this.fb.group({
        especialidad: ['CLINICO', Validators.required]
    });

    constructor(private dbService: DataService, private fb: FormBuilder) { 

    }

    ngOnInit() {
        this.getUsuarios();
    }

    get invalidEspecialidad() {
        return this.especialidadForm.get('especialidad').invalid && this.especialidadForm.get('especialidad').touched;
    }

    getUsuarios() {
        this.isLoading = true;

        this.dbService.getAll('users').subscribe(usuarios => {
            this.listado = usuarios.filter(x => x.role == 'PROFESIONAL');
            this.isLoading = false;

        });
    }

    activar(user: User) {
        user.emailVerified = true;
        this.dbService.updateOne(user, 'users');
    }

    desactivar(user: User) {
        user.emailVerified = false;
        this.dbService.updateOne(user, 'users');
    }

    agregarEspecialidad() {
        let especialidadesRef = this.profesionalSeleccionado.especialidades;
        if(especialidadesRef.length === 3) {
            Swal.fire({
                text: 'No puede tener más de 3 especialidades',
                icon: 'error',
                title: 'Error',
            });
        }

        let buscar = this.especialidadForm.get('especialidad').value;
        let found = especialidadesRef.find(item => item === buscar);
        if(found === undefined) {
            this.profesionalSeleccionado.especialidades.push(buscar);
            this.dbService.updateOne(this.profesionalSeleccionado, 'users');
            Swal.fire({
                text: 'Especialidad agregada',
                icon: 'info',
                title: 'Muy bien!',
            });
        }else {
            Swal.fire({
                text: 'El profesional ya posee la especialidad seleccionada',
                icon: 'error',
                title: 'Error',
            });
        }
    }

    seleccionarProfesional(user: User) {
        this.profesionalSeleccionado = user;
    }
}
