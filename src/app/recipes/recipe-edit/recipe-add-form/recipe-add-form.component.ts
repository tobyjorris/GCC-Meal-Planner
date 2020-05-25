import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-recipe-add-form',
  templateUrl: './recipe-add-form.component.html',
  styleUrls: ['./recipe-add-form.component.css']
})
export class RecipeAddFormComponent implements OnInit {
  recipeAddForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.recipeAddForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      ingredients: new FormArray([], Validators.required),
      directions: new FormArray([], Validators.required)
    });
  }

  onAddIngredient() {
    const control = new FormControl(null, Validators.required);
    (this.recipeAddForm.get('ingredients') as FormArray).push(control);
  }

  onAddDirections() {
    const control = new FormControl(null, Validators.required);
    (this.recipeAddForm.get('directions') as FormArray).push(control);
  }

  getIngredientsControls() {
    return (this.recipeAddForm.get('ingredients') as FormArray).controls;
  }

  getDirectionsControls() {
    return (this.recipeAddForm.get('directions') as FormArray).controls;
  }

  onSubmit() {
    console.log(this.recipeAddForm);
  }
}
