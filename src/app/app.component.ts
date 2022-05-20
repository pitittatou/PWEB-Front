import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "./services/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  title = 'PWEB-Front';
  showNavbar!: boolean

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    this.authService.get_auth_state().subscribe((v) => this.showNavbar = v)
  }
}
