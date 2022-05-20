import {Component, OnInit} from '@angular/core';
import {User} from "../models/user.model";
import {MatchingService} from "../services/matching.service";
import {GlobalConstants} from "../common/global-constants";
import { trigger, keyframes, animate, transition } from '@angular/animations';
import * as kf from './keyframes';

@Component({
  selector: 'app-matching',
  templateUrl: './matching.component.html',
  styleUrls: ['./matching.component.scss'],
  animations: [
    trigger('cardAnimator', [

      transition('* => swipeleft', animate(1000, keyframes(kf.swipeleft))),
      transition('* => swiperight', animate(1000, keyframes(kf.swiperight))),

    ])
  ]
})

export class MatchingComponent implements OnInit{
  animationState!: string;
  user!: User;
  apiUrl: string = GlobalConstants.apiURL
  selectedPhotoIdx: number = 0
  blockRequests = false


  constructor(private matchingService: MatchingService ) {}

  ngOnInit() {
    this.getUser()
  }

  getUser(): void {
    this.matchingService.getRandomUser().subscribe({
      next: (user) => {
        this.user = user
        this.selectedPhotoIdx = 0
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
    if (!this.blockRequests) {
      this.blockRequests = true
      this.matchingService.reject(this.user.userId).subscribe(() => {
          this.getUser()
          this.blockRequests = false
        },
        (e) => console.log(e))
    }
  }

  onAccept() {
    if (!this.blockRequests) {
      this.blockRequests = true
      this.matchingService.accept(this.user.userId).subscribe(() => {
          this.getUser()
        this.blockRequests = false
        },
      (e) => console.log(e))
    }
  }

  startAnimation(state:any) {
    console.log(state)

    if (!this.animationState) {
      this.animationState = state;
    }
  }

  resetAnimationState(){
    this.animationState = '';
  }

}

