import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../recipe';
import { Ingredient } from '../../ingredient';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})

export class RecipeDetailComponent implements OnInit {
  selectedRecipe: Recipe;

  constructor() { }

  ngOnInit(): void {
    this.getSelectedRecipe();
  }

  getSelectedRecipe(): void {
    this.selectedRecipe = new Recipe();
    this.selectedRecipe.title = 'White Cucco Chili';
    this.selectedRecipe.instructions = 'Cook until done, eat until full';
    this.selectedRecipe.ingredients = [];
    const ingredientOne = new Ingredient();
    ingredientOne.name = 'Cucco';
    ingredientOne.quantity = 2;
    this.selectedRecipe.ingredients.push(ingredientOne);

    const ingredientTwo = new Ingredient();
    ingredientTwo.name = 'Chili';
    ingredientTwo.quantity = 4;
    this.selectedRecipe.ingredients.push(ingredientTwo);

    const ingredientThree = new Ingredient();
    ingredientThree.name = 'Cheese';
    ingredientThree.quantity = 600;
    this.selectedRecipe.ingredients.push(ingredientThree);
  }

}
