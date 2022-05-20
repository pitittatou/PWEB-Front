import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";
import {User} from "../models/user.model";
import {MatchingService} from "../services/matching.service";
import {GlobalConstants} from "../common/global-constants";

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
  apiUrl = GlobalConstants.apiURL

  constructor(private authService: AuthenticationService, private router: Router, private matchingService: MatchingService) {}

  ngOnInit(): void {
  }

  onProfile() {
    this.router.navigateByUrl('/profil')
  }

  onLogOut() {
    this.authService.logout()
  }

  onGetMatches() {
    this.matchingService.getMatches().subscribe((matches) => {
      this.matches = matches
      console.log(matches)
        for (let match of this.matches) {
          if(!match.photos.length) {
            match.photos.push("placeholder.jpg")
          }
        }
    },
      (e) => {
        console.log(e)
      })
  }
}
