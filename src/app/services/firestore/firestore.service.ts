import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  constructor(private db: AngularFirestore, private auth: AngularFireAuth) {
    this.recipeCol = db.collection<Recipe>('recipes');
    this.ingredientCol = db.collection<Ingredient>('ingredients');
    this.recipeHistoryCol = db.collection<ShoppingHistory>('history');
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

  writeRecipesToHistory(recipes: Recipe[]) {
    const todaysDate = Date.now();
    console.log(todaysDate, new Date(todaysDate).toDateString());
    const historySubmission: ShoppingHistory = {
      recipesCooked: [],
      completedDate: todaysDate
    };
    for (const singleRecipe of recipes) {
      const singleRecipeInfo = {recipeName: singleRecipe.title, recipeMulti: singleRecipe.multi };
      historySubmission.recipesCooked.push(singleRecipeInfo);
    }
    this.recipeHistoryCol.doc(todaysDate.toString()).set(historySubmission).then(() => {
      console.log('History Submission Successful');
    }).catch(error => {
      console.error('Error Saving History Submission', error);
    });
  }
}
