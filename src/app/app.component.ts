import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "./services/authentication.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  title = 'PWEB-Front';
  showNavbar!: Observable<boolean>

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    this.showNavbar = this.authService.get_auth_state()
  }
}
