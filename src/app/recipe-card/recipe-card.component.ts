import {Component, OnInit} from '@angular/core';
import {RECIPES} from '../mock-recipes';


@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})

export class RecipeCardComponent implements OnInit {
  recipes = RECIPES;

  constructor() {
  }

  ngOnInit(): void {
  }
}
