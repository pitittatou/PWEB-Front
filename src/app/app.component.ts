import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "./services/authentication.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'PWEB-Front';
  showNavbar!: boolean

  constructor(private authService: AuthenticationService, private titleService: Title) {}

  ngOnInit() {
    this.titleService.setTitle("IN'ÇA SWIPE")
    this.authService.get_auth_state().subscribe((v) => this.showNavbar = v)
  }
}
