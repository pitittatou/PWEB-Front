import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";
import {User} from "../models/user.model";
import {MatchingService} from "../services/matching.service";
import {environment} from "../../environments/environment";

export interface Section {
  name: string;
  age: number;
  imageUrl: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  opened = false;
  matches!: User[]
  apiUrl = environment.apiURL

  constructor(private authService: AuthenticationService, private router: Router, private matchingService: MatchingService) {}

  ngOnInit(): void {
    this.matchingService.getMatchesObs().subscribe({
      next: (matches) => {
        for (let match of matches) {
          if (!match.photos.length) {
            match.photos.push("placeholder.png")
          }
        }
        this.matches = matches
      }
    })
  }

  onProfile() {
    this.router.navigateByUrl('/profil')
  }

  onLogOut() {
    this.authService.logout()
  }
}
