import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthServiceService {
  private loggedIn = new Subject<any>();
  loggedInStatus;

  constructor() {
    firebase.auth().onAuthStateChanged( user => {
      if (user) {
        this.loggedIn.next(true);
      } else {
        this.loggedIn.next(false);
      }
    });
  }

  checkLogin(): Observable<any> {
    return this.loggedIn.asObservable();
  }


}
