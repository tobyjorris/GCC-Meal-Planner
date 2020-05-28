import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { FirestormService} from '../../../services/firestore-service/firebaseservice.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-recipe-add-form',
  templateUrl: './recipe-add-form.component.html',
  styleUrls: ['./recipe-add-form.component.css']
})

export class RecipeAddFormComponent implements OnInit {
  recipeAddForm: FormGroup;
  recipes: Observable<any[]>;
  editMode: false;

  constructor(private db: FirestormService ) {
  }

  ngOnInit(): void {
    let recipeName = '';

    this.recipeAddForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      ingredients: new FormArray([], Validators.required),
      directions: new FormArray([], Validators.required)
    });
  }

  onAddIngredient() {
    (<FormArray> this.recipeAddForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        quantity: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
        measurement: new FormControl(null, Validators.required)
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray> this.recipeAddForm.get('ingredients')).removeAt(index);
  }

  onAddDirections() {
    (<FormArray> this.recipeAddForm.get('directions')).push(
      new FormGroup({
        stepNum: new FormControl(null, Validators.required),
        content: new FormControl(null, Validators.required)
      })
    );
  }

  onDeleteDirections(index: number) {
    (<FormArray> this.recipeAddForm.get('directions')).removeAt(index);
  }

  getIngredientsControls() {
    return (this.recipeAddForm.get('ingredients') as FormArray).controls;
  }

  getDirectionsControls() {
    return (this.recipeAddForm.get('directions') as FormArray).controls;
  }

  onSubmit() {
    console.log(this.recipeAddForm.value);
    this.db.addNewDoc(this.recipeAddForm.value);
    this.recipeAddForm.reset();
  }
}
