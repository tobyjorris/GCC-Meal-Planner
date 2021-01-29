import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {FirestoreService} from '../services/firestore/firestore.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  history: Observable<any[]>;

  constructor(private db: FirestoreService ) {
    this.history = this.db.history;
  }

  ngOnInit(): void {
  }

}
