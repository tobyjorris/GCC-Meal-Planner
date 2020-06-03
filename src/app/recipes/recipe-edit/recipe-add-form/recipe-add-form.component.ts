import {Component, OnInit} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { FirestormService} from '../../../services/firestore-service/firebaseservice.service';
import { Recipe } from '../../../../recipe';
import {Ingredient} from '../../../../ingredient';
import {Directions} from '../../../../directions';


@Component({
  selector: 'app-recipe-add-form',
  templateUrl: './recipe-add-form.component.html',
  styleUrls: ['./recipe-add-form.component.css']
})

export class RecipeAddFormComponent implements OnInit {
  recipeAddForm: FormGroup;
  editMode = false;
  editedRecipe: Recipe;

  constructor(private db: FirestormService) {
  }

  ngOnInit(): void {
    this.recipeAddForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      ingredients: new FormArray([], Validators.required),
      directions: new FormArray([], Validators.required)
    });

    this.db.startedEditing.subscribe(
      (recipe: Recipe) => {
        this.editMode = true;
        this.editedRecipe = Object.assign({}, recipe);
        this.recipeAddForm = new FormGroup({
          title: new FormControl(this.editedRecipe.title, Validators.required),
          ingredients: new FormArray(this.editedRecipe.ingredients.map((ingredient: Ingredient) => {
          return new FormGroup({
            name: new FormControl(ingredient.name, Validators.required),
            quantity: new FormControl(ingredient.quantity, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
            measurement: new FormControl(ingredient.measurement, Validators.required)
          });
        }), Validators.required),
          directions: new FormArray(this.editedRecipe.directions.map((direction: Directions) => {
            return new FormGroup({
              stepNum: new FormControl(direction.stepNum, Validators.required),
              content: new FormControl(direction.content, Validators.required)
            });
          }), Validators.required)
        });
      }
    );
  }

  onAddIngredient() {
    (this.recipeAddForm.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        quantity: new FormControl(null, [Validators.required, Validators.pattern(/^[+]?([1-9][0-9]*(?:[\.][0-9]*)?|0*\.0*[1-9][0-9]*)(?:[eE][+-][0-9]+)?$/)]),
        measurement: new FormControl(null, Validators.required)
      })
    );
  }

  onDeleteIngredient(index: number) {
    (this.recipeAddForm.get('ingredients') as FormArray).removeAt(index);
  }

  onAddDirections() {
    (this.recipeAddForm.get('directions') as FormArray).push(
      new FormGroup({
        stepNum: new FormControl(null, Validators.required),
        content: new FormControl(null, Validators.required)
      })
    );
  }

  onDeleteDirections(index: number) {
    (this.recipeAddForm.get('directions') as FormArray).removeAt(index);
  }

  getIngredientsControls() {
    return (this.recipeAddForm.get('ingredients') as FormArray).controls;
  }

  getDirectionsControls() {
    return (this.recipeAddForm.get('directions') as FormArray).controls;
  }

  onSubmit() {
    console.log(this.recipeAddForm.value);
    this.db.addNewRecipe(this.recipeAddForm.value);
    this.editMode = false;
    this.recipeAddForm = new FormGroup({
      title: new FormControl('', Validators.required),
      ingredients: new FormArray([], Validators.required),
      directions: new FormArray([], Validators.required),
    });
    this.recipeAddForm.markAsPristine();
    this.recipeAddForm.markAsUntouched();
  }

  onDelete() {
    this.db.deleteRecipe(this.editedRecipe.title);
    this.editMode = false;
    this.recipeAddForm = new FormGroup({
      title: new FormControl('', Validators.required),
      ingredients: new FormArray([], Validators.required),
      directions: new FormArray([], Validators.required),
    });
    this.recipeAddForm.markAsPristine();
    this.recipeAddForm.markAsUntouched();
  }
}
