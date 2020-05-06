import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RECIPES} from '../../mock-recipes';
import {Recipe} from '../../../recipe';


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

  onSelected() {
    this.recipeSelected.emit();
  }

}