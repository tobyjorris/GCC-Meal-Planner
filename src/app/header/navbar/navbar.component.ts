import {Component, OnChanges, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import { AuthServiceService } from '../../services/authService/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loggedIn;

  constructor(public auth: AuthServiceService) {
  }

  ngOnInit(): void {
    this.loggedIn = this.auth.checkLogin();
    console.log('Navbar on Init', this.loggedIn);
  }

}
