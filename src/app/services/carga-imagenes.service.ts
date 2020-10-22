import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import Swal from 'sweetalert2';
import { FileItem } from '../models/file-item.class';
import { User } from '../models/user.interface';

@Injectable({
    providedIn: 'root'
})
export class CargaImagenesService {

    private CARPETA_IMAGENES = 'img';

    constructor(private afs: AngularFirestore) { }

    cargarImagenesFirebase(imagenes: FileItem[], user: User) {
        let contadorDeImagenes = 0;
        const storageRef = firebase.storage().ref();
        for(const item of imagenes) {
            item.subiendo = true;
            if(item.progreso >= 100) {
                continue;
            }

            const uploadTask: firebase.storage.UploadTask = storageRef.child(`${this.CARPETA_IMAGENES}/${item.nombre}`)
                                                                        .put(item.archivo);
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                (snapshot: firebase.storage.UploadTaskSnapshot) => item.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
                (err) => {
                    Swal.fire({
                        text: err.message,
                        allowOutsideClick: false,
                        icon: 'error'
                    });
                },
                async () => {
                    console.log('Imagen cargada correctamente');
                    item.url = await uploadTask.snapshot.ref.getDownloadURL();
                    contadorDeImagenes++;
                    this.guardarReferenciaImagen(item.url, user, contadorDeImagenes);
                }
            )
        }
    }

    private guardarReferenciaImagen(url: string, user: User, contador: number) {
        const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

        if(contador === 1) {
            userRef.update({
                img1: url
            })
        }else {
            userRef.update({
                img2: url
            })
        }
    }
}
