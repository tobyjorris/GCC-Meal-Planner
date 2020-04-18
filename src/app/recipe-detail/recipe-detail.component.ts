import {Component, OnInit} from '@angular/core';
import {RECIPES} from '../mock-recipes';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})

export class RecipeDetailComponent implements OnInit {
  recipes = RECIPES;

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.recipes);
  }
}
