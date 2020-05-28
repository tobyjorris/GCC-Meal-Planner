import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Recipe} from '../../recipe';
import Item = firebase.analytics.Item;
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FirestormService{
  public items: Observable<any[]>;
  public recipeCol: AngularFirestoreCollection<Recipe>;

  constructor(db: AngularFirestore) {
    const recipeCollection = db.collection<Recipe>('items');
    this.recipeCol = recipeCollection;
    this.items = db.collection('/items').valueChanges();
  }

  addNewDoc(newRecipe: Recipe){
    this.recipeCol.add(newRecipe);
  }
}
