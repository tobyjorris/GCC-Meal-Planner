import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { AuthServiceService } from '../../services/authService/auth-service.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loggedIn;

  constructor(public auth: AuthServiceService) {
    // this.auth.loggedIn.subscribe(value => {
    //   this.loggedIn = value;
    //   console.log(value);
    // });
    this.auth.checkLogin().subscribe(value => {
      this.loggedIn = value;
    });
    console.log(this.loggedIn);
  }

  ngOnInit(): void {
  }

}
