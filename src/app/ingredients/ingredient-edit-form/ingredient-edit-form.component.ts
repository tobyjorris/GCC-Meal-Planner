import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { Ingredient} from '../../interfaces/ingredient';
import { RecipesService } from '../../services/recipes/recipes.service';

@Component({
  selector: 'app-ingredient-edit-form',
  templateUrl: './ingredient-edit-form.component.html',
  styleUrls: ['./ingredient-edit-form.component.scss']
})

export class IngredientEditFormComponent implements OnInit {
  ingredientAddForm: FormGroup;
  ingredientEditMode = false;
  editedIngredient: Ingredient;

  constructor(private db: FirestoreService, private recipesService: RecipesService ) {
  }

  ngOnInit(): void {
    this.ingredientAddForm = new FormGroup({
      name: new FormControl([], Validators.required),
      department: new FormControl([], Validators.required),
    });

    this.recipesService.startedEditingIngredient.subscribe(
      (ingredient: Ingredient) => {
        this.ingredientEditMode = true;
        this.editedIngredient = Object.assign({}, ingredient);
        this.ingredientAddForm = new FormGroup({
          name: new FormControl(this.editedIngredient.name, Validators.required),
          department: new FormControl(this.editedIngredient.department, Validators.required),
        });
      }
    );
  }

  // getIngredientsControls() {
  //   return (this.ingredientAddForm.get('ingredients') as FormArray).controls;
  // }

  onSubmit() {
    const submittedIngredient = this.ingredientAddForm.value;
    console.log(submittedIngredient);
    this.db.addNewIngredient(submittedIngredient);
    this.ingredientEditMode = false;
    this.ingredientAddForm = new FormGroup({
      name: new FormControl([], Validators.required),
      department: new FormControl([], Validators.required),
    });
    this.ingredientAddForm.markAsPristine();
    this.ingredientAddForm.markAsUntouched();
  }

  onDelete() {
    this.db.deleteIngredient(this.editedIngredient.name);
    this.ingredientEditMode = false;
    this.ingredientAddForm = new FormGroup({
      name: new FormControl([], Validators.required),
      department: new FormControl([], Validators.required),
    });
    this.ingredientAddForm.markAsPristine();
    this.ingredientAddForm.markAsUntouched();
  }
}
