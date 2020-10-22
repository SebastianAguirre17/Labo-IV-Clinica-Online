import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../models/user.interface';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    url = '';

    constructor(private http: HttpClient, 
                private afs: AngularFirestore) { }

    getEspecialidades () {
        return this.http.get(this.url)
    }

}
