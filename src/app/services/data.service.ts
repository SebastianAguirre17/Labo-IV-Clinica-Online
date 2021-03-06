import { Turno } from './../shared/models/turno.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    private objetos: Observable<any[]>;
    private objeto: Observable<any>;
    private objetoDoc: AngularFirestoreDocument<any>;
    private objetosCollection: AngularFirestoreCollection<any>;
    
    public selectedObjeto: any = {
        id: null
    };


    constructor(private afs: AngularFirestore) {
        
    }

    getAll(dataNombre: string) {
        this.objetosCollection = this.afs.collection<any>(dataNombre);
        return this.objetos = this.objetosCollection.snapshotChanges()
            .pipe(map(changes => {
                return changes.map(action => {
                    const data = action.payload.doc.data() as any;
                    data.id = action.payload.doc.id;
                    return data;
                });
            }));
    }

    getOne(id: string, dataNombre: string) {
        this.objetoDoc = this.afs.doc<any>(`${dataNombre}/${id}`);
        return this.objeto = this.objetoDoc.snapshotChanges().pipe(map(action => {
            if (action.payload.exists === false) {
                return null;
            } else {
                const data = action.payload.data() as any;
                data.id = action.payload.id;
                return data;
            }
        }));
    }

    setOne(objeto: any, dataNombre: string): void {
        this.afs.collection(dataNombre).add(objeto);
    }

    updateOne(objeto: any, dataNombre: string): void {
        let id = objeto.id;
        this.objetoDoc = this.afs.doc<any>(`${dataNombre}/${id}`);
        this.objetoDoc.update(objeto);
    }

    deleteOne(id: string, dataNombre: string): void {
        this.objetoDoc = this.afs.doc<any>(`${dataNombre}/${id}`);
        this.objetoDoc.delete();
    }

    async setReseniaProfesional(turno: Turno, resenia: string) {
        const turnoRef: AngularFirestoreDocument<any> = this.afs.doc(`turnos/${turno.id}`);
        const data: any = {
            user: turno.user,
            profesional: turno.profesional,
            dia: turno.dia,
            hora: turno.hora,
            estado: turno.estado,
            resenia: resenia
        }
        return turnoRef.set(data, {
            merge: true
        })
    }

    async setComentario(turno: Turno, comentario: string) {
        const turnoRef: AngularFirestoreDocument<any> = this.afs.doc(`turnos/${turno.id}`);
        const data: any = {
            user: turno.user,
            profesional: turno.profesional,
            dia: turno.dia,
            hora: turno.hora,
            estado: turno.estado,
            resenia: turno.resenia,
            comentario: comentario
        }
        return turnoRef.set(data, {
            merge: true
        })
    }



}
