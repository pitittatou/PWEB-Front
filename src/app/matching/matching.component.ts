import {Component, OnInit} from '@angular/core';
import {User} from "../models/user.model";
import {MatchingService} from "../services/matching.service";
import {GlobalConstants} from "../common/global-constants";

@Component({
  selector: 'app-matching',
  templateUrl: './matching.component.html',
  styleUrls: ['./matching.component.scss']
})

export class MatchingComponent implements OnInit{
  user!: User;
  i!:number;
  apiUrl: string = GlobalConstants.apiURL
  selectedPhotoIdx: number = 0

  constructor(private matchingService: MatchingService ) {}

  ngOnInit() {
    this.getUser()
  }

  getUser(): void {
    this.matchingService.getRandomUser().subscribe({
      next: (user) => {
        this.user = user
        console.log(user)
        if (!this.user.photos.length) {
          this.user.photos.push('placeholder.jpg')
        }
      },
      error: () => {
        console.log("Error trying to get a user")
      }
    })
  }

  onNextPhoto() {
    this.selectedPhotoIdx = (this.selectedPhotoIdx + 1) % this.user.photos.length
  }

  onPreviousPhoto() {
    this.selectedPhotoIdx = (this.selectedPhotoIdx - 1) % this.user.photos.length
  }

  onReject() {
    this.matchingService.reject(this.user.userId).subscribe(() => this.getUser(),
      (e) => console.log(e))
  }

  onAccept() {
    this.matchingService.accept(this.user.userId).subscribe(() => this.getUser(),
      (e) => console.log(e))
  }
}
