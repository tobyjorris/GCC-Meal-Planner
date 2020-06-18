import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Recipe} from '../../interfaces/recipe';


@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})

export class RecipeCardComponent implements OnInit {
  @Input() recipe: Recipe;
  @Output() recipeSelected = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onRecipeSelected() {
    this.recipeSelected.emit();
  }

}
