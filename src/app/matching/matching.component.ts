import {Component, HostListener, OnInit} from '@angular/core';
import {User} from "../models/user.model";
import {MatchingService} from "../services/matching.service";
import {trigger, keyframes, animate, transition} from '@angular/animations';
import * as kf from './keyframes';
import {Title} from "@angular/platform-browser";
import {environment} from "../../environments/environment";

export enum KEY_CODE {
  RIGHT_ARROW = "A", LEFT_ARROW = 37
}

@Component({
  selector: 'app-matching',
  templateUrl: './matching.component.html',
  styleUrls: ['./matching.component.scss'],
  animations: [trigger('cardAnimator', [transition('* => swipeleft', animate(600, keyframes(kf.swipeleft))), transition('* => swiperight', animate(600, keyframes(kf.swiperight))),])]
})

export class MatchingComponent implements OnInit {
  animationState!: string
  users: User[] = []
  apiUrl: string = environment.apiURL
  selectedPhotoIdx: number = 0
  requestSent: boolean = false
  loaded: boolean = false

  constructor(private matchingService: MatchingService, private titleService: Title) {
  }

  ngOnInit() {
    this.titleService.setTitle("IN'ÇA SWIPE")
    this.getUsers(10)
  }

  @HostListener('window:keyup', ['$event']) keyEvent(event: KeyboardEvent) {
    if (event.key === "ArrowRight") {
      this.onAccept();
    }
    if (event.key === "ArrowLeft") {
      this.onReject();
    }
  }

  getUsers(nb: number, trim: number = 0): void {
    this.matchingService.getRandomUsers(nb).subscribe({
      next: (users) => {
        for (let user of users) {
          if (!user.photos.length) {
            user.photos.push("placeholder.png")
          }
        }
        this.users = this.users.concat(users.slice(trim))
        this.requestSent = false
        this.loaded = true
      }, error: () => {
        console.log("Error trying to get users")
        this.requestSent = false
        this.loaded = true
      }
    })
  }

  onNextPhoto() {
    this.selectedPhotoIdx = (this.selectedPhotoIdx + 1) % this.users[0].photos.length
  }

  onPreviousPhoto() {
    this.selectedPhotoIdx = (((this.selectedPhotoIdx - 1) % this.users[0].photos.length) + this.users[0].photos.length) % this.users[0].photos.length // modulo bug fix
  }

  onReject() {
    if (!this.animationState) {
      this.startAnimation("swipeleft")
      if (this.users.length <= 10 && !this.requestSent) {
        this.requestSent = true
        this.getUsers(20, this.users.length)
      }

      this.matchingService.reject(this.users[0].userId).subscribe({
        next: () => {
        }, error: (e) => {
          console.log(e)
        }
      })
    }
  }

  onAccept() {
    if (!this.animationState) {
      this.startAnimation("swiperight")


      if (this.users.length <= 10 && !this.requestSent) {
        this.requestSent = true
        this.getUsers(20, this.users.length)
      }

      this.matchingService.accept(this.users[0].userId).subscribe({
        next: (match) => {
          if (match) {
            this.matchingService.addMatch(match)
          }
        }, error: (e) => {
          console.log(e)
        }
      })
    }
  }

  startAnimation(state: any) {
    if (!this.animationState) {
      this.animationState = state
    }
  }

  resetAnimationState() {
    this.animationState = ''
    this.users.shift()
    this.selectedPhotoIdx = 0
  }
}

