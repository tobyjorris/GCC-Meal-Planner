import { Injectable } from '@angular/core';
import { Observable, Subject} from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Recipe } from '../../interfaces/recipe';
import { Ingredient } from '../../interfaces/ingredient';
import { AngularFireAuth } from '@angular/fire/auth';
import { ShoppingHistory } from '../../interfaces/shopping-history';

@Injectable({
  providedIn: 'root'
})

export class FirestoreService{
  public recipes: Observable<any[]>;
  public ingredients: Observable<any[]>;
  public history: Observable<any[]>;
  public recipeCol: AngularFirestoreCollection<Recipe>;
  public ingredientCol: AngularFirestoreCollection<Ingredient>;
  public recipeHistoryCol: AngularFirestoreCollection<ShoppingHistory>;
  startedEditingRecipe = new Subject<object>();
  recipeWasSelected = new Subject<object>();
  startedEditingIngredient = new Subject<object>();
  ingredientWasSelected = new Subject<object>();

  constructor(private db: AngularFirestore, private auth: AngularFireAuth) {
    const recipeCollection = db.collection<Recipe>('recipes');
    const ingredientCollection = db.collection<Ingredient>('ingredients');
    const recipeHistoryCollection = db.collection<ShoppingHistory>('cooking-history');
    this.recipeCol = recipeCollection;
    this.ingredientCol = ingredientCollection;
    this.recipeHistoryCol = recipeHistoryCollection;
    this.recipes = db.collection('/recipes').valueChanges();
    this.ingredients = db.collection('/ingredients').valueChanges();
    this.history = db.collection('/history').valueChanges();
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

  writeRecipesToHistory(recipe: Recipe[]) {
    const todaysDate = new Date();
    const historySubmission: ShoppingHistory = {
      recipesCooked: [],
      completedDate: todaysDate,
    };

    for (const singleRecipe of recipe) {
      const singleRecipeInfo = {recipeName: singleRecipe.title, recipeMulti: singleRecipe.multi };
      historySubmission.recipesCooked.push(singleRecipeInfo);
    }
    // this.recipeHistoryCol.doc(todaysDate.toDateString())
  }


}
