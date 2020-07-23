import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrintService } from '../../services/print.service';
import { FirestormService } from '../../services/firestore/firestore.service';
import { Recipe } from '../../interfaces/recipe';
import * as firebase from 'firebase';
import {isCombinedNodeFlagSet} from "tslint";

@Component({
  selector: 'app-print-recipe',
  templateUrl: './print-recipe.component.html',
  styleUrls: ['./print-recipe.component.css']
})
export class PrintRecipeComponent implements OnInit {
  recipeId: string;
  // printedRecipe: firebase.firestore.DocumentData;
  recipeDetails: Promise<any>[];
  recipe;

  constructor(route: ActivatedRoute, private printService: PrintService, private db: FirestormService) {
    this.recipeId = route.snapshot.params.recipeIds;
  }

  ngOnInit() {
    console.log('init Print-Recipe');
    this.db.printedRecipe.subscribe(data => {
      this.recipe = data;
      this.printService.onDataReady();
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
