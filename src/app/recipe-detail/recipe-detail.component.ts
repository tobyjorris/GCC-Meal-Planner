import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../recipe';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})

export class RecipeDetailComponent implements OnInit {
  selectedRecipe: Recipe;

  constructor() { }

  ngOnInit(): void {
    this.selectedRecipe = new Recipe();
    this.selectedRecipe.title = 'White Chicken Chili';
    this.selectedRecipe.instructions = 'Cook until done, eat until full';
  }

}
