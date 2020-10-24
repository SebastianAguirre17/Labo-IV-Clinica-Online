import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-home-admin',
    templateUrl: './home-admin.component.html',
    styleUrls: ['./home-admin.component.scss']
})
export class HomeAdminComponent implements OnInit {

    public user$: Observable<any> = this.auth.afAuth.user;
    user: User;
    leyenda = 'Como Administrar podrá agregar usuarios administradores y definir especialidades a los profesionales.';

    private itemsCollection: AngularFirestoreCollection<User>;
    items: Observable<User[]>;

    constructor(private auth: AuthService, private afs: AngularFirestore) {
        this.itemsCollection = afs.collection<User>('users');
        this.items = this.itemsCollection.valueChanges();
        this.user$.subscribe(user => {
            this.user = user;
        });
        this.items.subscribe(items => {
            for (const item of items) {
                if (item.uid === this.user.uid) {
                    this.user = item;

                }
            }
        })
    }

    ngOnInit(): void {
    }

}
