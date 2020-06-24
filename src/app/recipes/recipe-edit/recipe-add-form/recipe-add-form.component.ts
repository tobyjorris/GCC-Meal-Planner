import {Component, OnInit} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { FirestormService} from '../../../services/firestore/firebaseservice.service';
import { Recipe } from '../../../interfaces/recipe';
import { Ingredient } from '../../../interfaces/ingredient';
import { Directions } from '../../../interfaces/directions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recipe-add-form',
  templateUrl: './recipe-add-form.component.html',
  styleUrls: ['./recipe-add-form.component.css']
})

export class RecipeAddFormComponent implements OnInit {
  recipeAddForm: FormGroup;
  editMode = false;
  editedRecipe: Recipe;
  private ingredients: Observable<any[]>;
  selectIngredients;
  private data: Ingredient[];

  constructor(private db: FirestormService) {
    this.ingredients = this.db.ingredients;
    this.ingredients.subscribe(ingredients => {
      this.data = ingredients as Ingredient[];
      this.selectIngredients = this.data.slice();
    });
  }

  ngOnInit(): void {
    this.initNewForm();

    this.db.startedEditingRecipe.subscribe(
      (recipe: Recipe) => {
        this.editMode = true;
        this.editedRecipe = Object.assign({}, recipe);
        this.recipeAddForm = new FormGroup({
          title: new FormControl(this.editedRecipe.title, Validators.required),
          proteinBase: new FormControl(this.editedRecipe.proteinBase, Validators.required),
          cookingMethod: new FormControl(this.editedRecipe.cookingMethod, Validators.required),
          credit: new FormControl(this.editedRecipe.credit, Validators.required),
          cost: new FormControl(this.editedRecipe.cost, Validators.required),
          chefNotes: new FormControl(this.editedRecipe.chefNotes, Validators.required),
          freezerLabel: new FormControl(this.editedRecipe.freezerLabel, Validators.required),
          accommodations: new FormArray(this.editedRecipe.accommodations.map((accommodation: {type: string, comment: string}) => {
            return new FormGroup({
              type: new FormControl(accommodation.type, Validators.required),
              comment: new FormControl(accommodation.comment, Validators.required),
            });
          }), Validators.required),
          ingredients: new FormArray(this.editedRecipe.ingredients.map((ingredient: Ingredient) => {
          return new FormGroup({
            name: new FormControl(ingredient.name, Validators.required),
            // tslint:disable-next-line:max-line-length
            quantity: new FormControl(ingredient.quantity, [Validators.required]),
            // Validators.pattern(/^[0-9]{0,2}.[0-9]{2}/)]
            measurement: new FormControl(ingredient.measurement, Validators.required)
          });
        }), Validators.required),
          prepDirections: new FormArray(this.editedRecipe.prepDirections.map((direction: Directions) => {
            return new FormGroup({
              content: new FormControl(direction.content, Validators.required)
            });
          }), Validators.required),
          cookDirections: new FormArray(this.editedRecipe.cookDirections.map((direction: Directions) => {
            return new FormGroup({
              content: new FormControl(direction.content, Validators.required)
            });
          }), Validators.required)
        });
      }
    );
  }

  initNewForm() {
    this.recipeAddForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      proteinBase: new FormControl(null, Validators.required),
      accommodations: new FormArray([], Validators.required),
      cookingMethod: new FormControl(null, Validators.required),
      credit: new FormControl(null, Validators.required),
      cost: new FormControl(null, Validators.required),
      chefNotes: new FormControl(null, Validators.required),
      freezerLabel: new FormControl(null, Validators.required),
      ingredients: new FormArray([], Validators.required),
      prepDirections: new FormArray([], Validators.required),
      cookDirections: new FormArray([], Validators.required)
    });
    this.recipeAddForm.markAsPristine();
    this.recipeAddForm.markAsUntouched();
    this.onAddAccommodation();
    this.onAddCookDirections();
    this.onAddIngredient();
    this.onAddPrepDirections();
  }

  onAddIngredient() {
    (this.recipeAddForm.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        quantity: new FormControl(null, [Validators.required]),
        // Validators.pattern(/^[0-9]{0,2}.[0-9]{2}/)]
        measurement: new FormControl(null, Validators.required)
      })
    );
  }

  onDeleteIngredient(index: number) {
    (this.recipeAddForm.get('ingredients') as FormArray).removeAt(index);
  }

  onAddPrepDirections() {
    (this.recipeAddForm.get('prepDirections') as FormArray).push(
      new FormGroup({
        content: new FormControl(null, Validators.required)
      })
    );
  }

  onAddCookDirections() {
    (this.recipeAddForm.get('cookDirections') as FormArray).push(
      new FormGroup({
        content: new FormControl(null, Validators.required)
      })
    );
  }

  onDeletePrepDirections(index: number) {
    (this.recipeAddForm.get('prepDirections') as FormArray).removeAt(index);
  }

  onDeleteCookDirections(index: number) {
    (this.recipeAddForm.get('cookDirections') as FormArray).removeAt(index);
  }

  onAddAccommodation() {
    (this.recipeAddForm.get('accommodations') as FormArray).push(
      new FormGroup({
        type: new FormControl(null, Validators.required),
        comment: new FormControl(null, [Validators.required]),
      })
    );
  }

  onDeleteAccommodation(index: number) {
    (this.recipeAddForm.get('accommodations') as FormArray).removeAt(index);
  }

  getAccommodationsControls() {
    return (this.recipeAddForm.get('accommodations') as FormArray).controls;
  }

  getIngredientsControls() {
    return (this.recipeAddForm.get('ingredients') as FormArray).controls;
  }

  getPrepDirectionsControls() {
    return (this.recipeAddForm.get('prepDirections') as FormArray).controls;
  }

  getCookDirectionsControls() {
    return (this.recipeAddForm.get('cookDirections') as FormArray).controls;
  }

  onSubmit() {
    const submittedRecipe = this.recipeAddForm.value;
    this.db.addNewRecipe(submittedRecipe);
    this.editMode = false;
    this.initNewForm();
  }

  onDelete() {
    this.db.deleteRecipe(this.editedRecipe.title);
    this.editMode = false;
    this.initNewForm();
  }
}
