import { Component, OnInit } from '@angular/core';
import { Recipe } from '../interfaces/recipe';
import { AuthService } from '../services/auth/auth-service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;
  loggedIn = true;

  constructor(private auth: AuthService) {
  }

  ngOnInit(): void {
    this.auth.checkLogin().subscribe(loggedInValue => {
      this.loggedIn = loggedInValue;
    });
  }
}
