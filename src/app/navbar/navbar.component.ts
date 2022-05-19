import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";

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
  profiles: Section[] = [
    {
      name: 'Inès',
      age: 20,
      imageUrl: 'https://cdn.pixabay.com/photo/2020/03/26/10/58/norway-4970080_960_720.jpg',
    },
    {
      name: 'Thomas',
      age: 22,
      imageUrl: 'https://cdn.pixabay.com/photo/2020/03/26/10/58/norway-4970080_960_720.jpg',
    },
    {
      name: 'Jad',
      age: 23,
      imageUrl: 'https://cdn.pixabay.com/photo/2020/03/26/10/58/norway-4970080_960_720.jpg',
    },
    {
      name: 'Abdourrahmane',
      age: 19,
      imageUrl: 'https://cdn.pixabay.com/photo/2020/03/26/10/58/norway-4970080_960_720.jpg',
    },
    {
      name: 'Marion',
      age: 24,
      imageUrl: 'https://cdn.pixabay.com/photo/2020/03/26/10/58/norway-4970080_960_720.jpg',
    },
  ];

  constructor(private authService: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
  }

  onProfile() {
    this.router.navigateByUrl('/profil')
  }

  onLogOut() {
    this.authService.logout()
  }
}
