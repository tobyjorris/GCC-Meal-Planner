import {Component, OnInit} from '@angular/core';
import { FirestormService } from '../../services/firestore/firebaseservice.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ingredient-edit',
  templateUrl: './ingredient-edit.component.html',
  styleUrls: ['./ingredient-edit.component.css'],
  providers: [FirestormService]
})
export class IngredientEditComponent implements OnInit {
  ingredients: Observable<any[]>;
  constructor(private db: FirestormService) {
    this.ingredients = this.db.ingredients;
  }

  ngOnInit() {
  }

  onEditIngredient(ingredient) {
    this.db.startedEditingIngredient.next(ingredient);
    console.log(ingredient);
  }
}
