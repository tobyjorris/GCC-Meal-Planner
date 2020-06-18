import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirestormService } from '../../services/firestore/firebaseservice.service';
import { Ingredient} from '../../interfaces/ingredient';

@Component({
  selector: 'app-ingredient-edit-form',
  templateUrl: './ingredient-edit-form.component.html',
  styleUrls: ['./ingredient-edit-form.component.css']
})

export class IngredientEditFormComponent implements OnInit {
  ingredientAddForm: FormGroup;
  editMode = false;
  editedIngredient: Ingredient;

  constructor(private db: FirestormService) {
  }

  ngOnInit(): void {
    this.ingredientAddForm = new FormGroup({
      name: new FormControl([], Validators.required),
      department: new FormControl([], Validators.required),
      measurement: new FormControl([], Validators.required),
    });

    this.db.startedEditingIngredient.subscribe(
      (ingredient: Ingredient) => {
        this.editMode = true;
        this.editedIngredient = Object.assign({}, ingredient);
        this.ingredientAddForm = new FormGroup({
          name: new FormControl(this.editedIngredient.name, Validators.required),
          department: new FormControl(this.editedIngredient.department, Validators.required),
          measurement: new FormControl(this.editedIngredient.measurement, Validators.required),
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
    this.editMode = false;
    this.ingredientAddForm = new FormGroup({
      name: new FormControl([], Validators.required),
      department: new FormControl([], Validators.required),
      measurement: new FormControl([], Validators.required),
    });
    this.ingredientAddForm.markAsPristine();
    this.ingredientAddForm.markAsUntouched();
  }

  onDelete() {
    this.db.deleteIngredient(this.editedIngredient.name);
    this.editMode = false;
    this.ingredientAddForm = new FormGroup({
      name: new FormControl([], Validators.required),
      department: new FormControl([], Validators.required),
      measurement: new FormControl([], Validators.required),
    });
    this.ingredientAddForm.markAsPristine();
    this.ingredientAddForm.markAsUntouched();
  }
}
