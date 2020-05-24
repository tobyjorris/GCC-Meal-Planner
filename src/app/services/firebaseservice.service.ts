import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestormService{
  public items: Observable<any[]>;

  constructor(db: AngularFirestore) {
    this.items = db.collection('/items').valueChanges();
  }
}
