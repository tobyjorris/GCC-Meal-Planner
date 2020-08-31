import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable, Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private loggedIn = new Subject<any>();

  constructor(public auth: AngularFireAuth) {
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
