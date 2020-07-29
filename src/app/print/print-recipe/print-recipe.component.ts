import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { PrintService } from '../../services/print.service';

@Component({
  selector: 'app-print-recipe',
  templateUrl: './print-recipe.component.html',
  styleUrls: ['./print-recipe.component.css']
})
export class PrintRecipeComponent implements OnInit {
  recipeId: string;
  recipe;

  constructor(route: ActivatedRoute, private printService: PrintService, private router: Router) {
    this.recipeId = route.snapshot.params.recipeIds;
  }

  ngOnInit() {
    console.log('init Print-Recipe');
    this.printService.printedRecipe.subscribe(data => {
      this.recipe = data;
    });
    setTimeout(() => {
      window.print();
      this.router.navigate([{ outlets: { print: null }}]);
    });
    // *** Tutorial Way ***
    // this.recipeDetails = this.recipeIds.map(id => this.getInvoiceDetails(id));
    // Promise.all(this.recipeDetails)
    //   .then(() => this.printService.onDataReady());

    // *** My Firestore Way ***
    // this.db.fetchRecipe(this.recipeId).ref.get().then(doc => {
    //   if (doc.exists) {
    //     console.log('document data', doc.data());
    //     this.printedRecipe = doc.data();
    //     this.printService.onDataReady();
    //   } else {
    //     console.log('no such document!');
    //   }
    // }).catch(error => {
    //   console.log('error getting document', error);
    // });
  }

  getInvoiceDetails(recipeId) {
    // const amount = Math.floor((Math.random() * 100));
    // return new Promise(resolve =>
    //   setTimeout(() => resolve({amount}), 1000)
    // );
  }

}
