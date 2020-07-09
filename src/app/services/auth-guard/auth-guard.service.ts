import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthServiceService} from '../authService/auth-service.service';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private router: Router, private auth: AuthServiceService) {
    console.log('haha');
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // console.log('can activate log 3', this.loggedIn);
    if (!firebase.auth().currentUser) {
      this.router.navigateByUrl('/profile').then(r => console.log(r));
      return false;
    } else {
      return true;
    }
  }
}
