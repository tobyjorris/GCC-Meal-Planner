import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../../interfaces/recipe';
import { FirestoreService } from '../../services/firestore/firestore.service';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})

export class RecipeCardComponent {
  @Input() renderLocation: string;
  @Input() recipe: Recipe;
  @Output() viewRecipe = new EventEmitter<void>();

  constructor(private db: FirestoreService) {}

  onViewRecipe() {
    this.viewRecipe.emit();
  }

  onEditRecipe(recipe) {
    this.db.startedEditingRecipe.next(recipe);
  }

  throwClickError() {
    throw Error;
  }

}
