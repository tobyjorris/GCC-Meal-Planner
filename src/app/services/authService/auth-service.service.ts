import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthServiceService {
  public loggedIn = new Subject<boolean>();

  constructor() {
  }

  checkLogin() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log('auth-service ran a check & its TRUE');
        return true;
      } else {
        console.log('auth-service ran a check & its FALSE');
        return false;
      }
    });
  }


}
