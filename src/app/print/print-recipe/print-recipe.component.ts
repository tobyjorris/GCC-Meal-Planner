import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrintService } from '../../services/print/print.service';

@Component({
  selector: 'app-print-recipe',
  templateUrl: './print-recipe.component.html',
  styleUrls: ['./print-recipe.component.scss']
})
export class PrintRecipeComponent implements OnInit {
  recipeId: string;
  recipe;

  constructor(route: ActivatedRoute, private printService: PrintService, private router: Router) {
    this.recipeId = route.snapshot.params.recipeIds;
  }

  ngOnInit() {
    this.printService.printedRecipe.subscribe(data => {
      this.recipe = data;
    });
    setTimeout(() => {
      window.print();
      this.router.navigate([{ outlets: { print: null }}]);
    });
  }
}
