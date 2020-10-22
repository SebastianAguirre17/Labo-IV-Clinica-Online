import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-home-paciente',
    templateUrl: './home-paciente.component.html',
    styleUrls: ['./home-paciente.component.scss']
})
export class HomePacienteComponent implements OnInit {

    public user$: Observable<any> = this.auth.afAuth.user;
    user: User;
   
    private itemsCollection: AngularFirestoreCollection<User>;
    items: Observable<User[]>;

    constructor(private auth: AuthService, private afs: AngularFirestore) {
        this.itemsCollection = afs.collection<User>('users');
        this.items = this.itemsCollection.valueChanges();
        this.user$.subscribe(user => {
            this.user = user;
        });
        this.items.subscribe(items => {
            for(const item of items) {
                if(item.uid === this.user.uid) {
                    this.user = item;
                    
                }
            }
        })
    }

    ngOnInit(): void {
    }

}
