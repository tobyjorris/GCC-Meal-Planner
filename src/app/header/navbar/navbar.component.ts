import {Component, OnDestroy, OnInit} from '@angular/core';
import { AuthServiceService } from '../../services/authService/auth-service.service';
import {AngularFireAuth} from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loggedIn;

  constructor(public auth: AuthServiceService, public afAuth: AngularFireAuth, private router: Router) {
    this.auth.checkLogin().subscribe(loggedInValue => {
      this.loggedIn = loggedInValue;
    });
  }

  ngOnInit(): void {
  }

  signOut() {
    this.afAuth.signOut().then(() => {
      this.router.navigateByUrl('/profile').then();
    });
  }
}
