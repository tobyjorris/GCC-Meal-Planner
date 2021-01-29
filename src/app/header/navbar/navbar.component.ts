import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth-service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  loggedIn;

  constructor(public auth: AuthService, public afAuth: AngularFireAuth, private router: Router) {
    this.auth.checkLogin().subscribe(loggedInValue => {
      this.loggedIn = loggedInValue;
      console.log('this.loggedIn', this.loggedIn);
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
