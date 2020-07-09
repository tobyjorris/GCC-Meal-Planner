import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Recipe} from '../interfaces/recipe';
import {AuthServiceService} from '../services/authService/auth-service.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;
  loggedIn = true;

  constructor(private auth: AuthServiceService) {
  }

  ngOnInit(): void {
    this.auth.checkLogin().subscribe(loggedInValue => {
      this.loggedIn = loggedInValue;
    });
  }

}
