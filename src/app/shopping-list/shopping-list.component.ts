import { Component, OnInit } from '@angular/core';
import {FirestormService} from '../services/firestore-service/firebaseservice.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingList: Observable<any[]>;

  constructor( private db: FirestormService ) {
    this.shoppingList = db.shoppinglist;
  }

  ngOnInit(): void {
  }

  onPrint() {
    alert('Your Recipe Has Printed');
    this.db.clearShoppingList();
  }

}
