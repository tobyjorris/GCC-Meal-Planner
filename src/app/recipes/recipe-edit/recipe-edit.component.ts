import { Component, OnInit } from '@angular/core';
import {FirestormService} from '../../services/firestore/firebaseservice.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
  providers: [FirestormService]
})
export class RecipeEditComponent implements OnInit {
  recipes: Observable<any[]>;
  constructor(private db: FirestormService) {
    this.recipes = this.db.recipes;
  }

  ngOnInit(): void {
  }

  onEditRecipe(recipe) {
    this.db.startedEditingRecipe.next(recipe);
  }
}
