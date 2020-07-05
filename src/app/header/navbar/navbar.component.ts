import {Component, OnDestroy, OnInit} from '@angular/core';
import { AuthServiceService } from '../../services/authService/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loggedIn;

  constructor(public auth: AuthServiceService) {
    this.auth.checkLogin().subscribe(loggedInValue => {
      this.loggedIn = loggedInValue;
    });
  }

  ngOnInit(): void {
  }
}
