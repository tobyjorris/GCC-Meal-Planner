import {Component, OnInit} from '@angular/core';
import {RECIPES} from '../mock-recipes';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})

export class RecipeCardComponent implements OnInit {
  recipes = RECIPES;
  ingredients = [];

  constructor() {
  }

  ngOnInit(): void {
    // console.log(this.recipes);
    // const recipe = this.recipes;
    // for (const recipeItem of recipe) {
    //   // console.log(recipe);
    //   // console.log(recipeItem.ingredients);
    //   this.ingredients.push(recipeItem.ingredients);
    // }
    // console.log(this.ingredients);
  }
}
