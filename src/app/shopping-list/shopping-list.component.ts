import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FirestormService} from '../services/firestore-service/firebaseservice.service';
import {ShoppingListService} from '../services/localstorage-service.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnChanges {
  shoppingList;
  ingredientsArray;

  constructor( private slService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.shoppingList = this.slService.getFromStorage();
    this.ingredientsArray = this.shoppingList
      .map(x => {
        return x.ingredients;
      });
    console.log(this.ingredientsArray);
  }

  onPrint() {
    this.shoppingList = [];
    this.slService.clearShoppingList();
  }

  ngOnChanges(changes: SimpleChanges) {
  }

}
