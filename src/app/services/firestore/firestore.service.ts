import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Recipe } from '../../interfaces/recipe';
import {Ingredient} from '../../interfaces/ingredient';

@Injectable({
  providedIn: 'root'
})

export class FirestormService{
  public recipes: Observable<any[]>;
  public ingredients: Observable<any[]>;
  public shoppinglist: Observable<any[]>;
  public recipeCol: AngularFirestoreCollection<Recipe>;
  public shoppingCol: AngularFirestoreCollection<Recipe>;
  public ingredientCol: AngularFirestoreCollection<Ingredient>;
  startedEditingRecipe = new Subject<object>();
  recipeWasSelected = new Subject<object>();
  startedEditingIngredient = new Subject<object>();
  ingredientWasSelected = new Subject<object>();

  constructor(private db: AngularFirestore) {
    const recipeCollection = db.collection<Recipe>('recipes');
    const shoppingCollection = db.collection<Recipe>('shopping-list');
    const ingredientCollection = db.collection<Ingredient>('ingredients');
    this.recipeCol = recipeCollection;
    this.shoppingCol = shoppingCollection;
    this.ingredientCol = ingredientCollection;
    this.recipes = db.collection('/recipes').valueChanges();
    this.shoppinglist = db.collection('/shopping-list').valueChanges();
    this.ingredients = db.collection('/ingredients').valueChanges();
  }

  addNewRecipe(recipe: Recipe){
    this.recipeCol.doc(recipe.title).set(recipe).then(() => {
      console.log('Recipe successfully written');
    }).catch(error => {
      console.error('Error adding document: ', error);
    });
  }

  deleteRecipe(title: string){
    this.recipeCol.doc(title).delete().then(() => {
      console.log('Recipe successfully deleted');
    }).catch(error => {
      console.error('Error removing document: ', error);
    });
  }

  addNewIngredient(ingredient: Ingredient) {
    this.ingredientCol.doc(ingredient.name).set(ingredient).then(() => {
      console.log('Ingredient successfully written');
    }).catch(error => {
      console.error('Error adding document: ', error);
    });
  }

  deleteIngredient(name: string) {
    this.ingredientCol.doc(name).delete().then(() => {
      console.log('Ingredient successfully deleted');
    }).catch(error => {
      console.error('Error removing document: ', error);
    });
  }

  fetchRecipe(name: string) {
    return this.recipeCol.doc(name);
  }
}
