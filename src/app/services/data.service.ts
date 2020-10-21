import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    url = '';

    constructor(private http: HttpClient) { }

    getEspecialidades () {
        return this.http.get(this.url)
    }
}
