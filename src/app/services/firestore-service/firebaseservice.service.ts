import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Recipe } from '../../../recipe';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestormService{
  public items: Observable<any[]>;
  public shoppinglist: Observable<any[]>;
  public recipeCol: AngularFirestoreCollection<Recipe>;
  public shoppingCol: AngularFirestoreCollection<Recipe>;
  startedEditing = new Subject<object>();

  constructor(private db: AngularFirestore) {
    const recipeCollection = db.collection<Recipe>('items');
    const shoppingCollection = db.collection<Recipe>('shopping-list');
    this.recipeCol = recipeCollection;
    this.shoppingCol = shoppingCollection;
    this.items = db.collection('/items').valueChanges();
    this.shoppinglist = db.collection('/shopping-list').valueChanges();
  }

  addNewRecipe(recipe: Recipe){
    this.recipeCol.doc(recipe.title).set(recipe).then(() => console.log('Recipe successfully written'));
  }

  deleteRecipe(title: string){
    this.recipeCol.doc(title).delete().then(() => {
      console.log('Recipe successfully deleted');
    }).catch(error => {
      console.error('Error removing document: ', error);
    });
  }
}
