import { Injectable } from '@angular/core';
import {GoogleLoginProvider, SocialAuthService, SocialUser} from "angularx-social-login";
import {first} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private user: SocialUser

  constructor(private socialAuthService: SocialAuthService, private router: Router) {
    this.user = new SocialUser()
    let data = localStorage.getItem('user')
    if (data != null) {
      let parsed_data = JSON.parse(data)
      if (parsed_data != null) {
        let stored_user = <SocialUser> parsed_data
        if (!AuthenticationService.expirated(stored_user.idToken)) {
          this.user = stored_user
        }
      }
    }
    console.log(this.user)
  }

  login() {
    return this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((user) => {
      this.update_user(user)
      this.startRefreshTokenTimer()
      this.router.navigateByUrl('')
    })
  }

  logout() {
    this.stopRefreshTokenTimer()
    this.update_user(null)
    this.socialAuthService.signOut().then(() => this.router.navigateByUrl('/connexion')
    ).catch(() => {})
  }

  get_user() {
    if (this.user.idToken) {
      return this.user
    }
    return null
  }

  is_logged_in() {
    return this.user.idToken
  }

  private update_user(user: any) {
    if (user == null) {
      this.user = new SocialUser()
    } else {
      this.user = user
    }
    localStorage.setItem('user', JSON.stringify(user))
  }

  private static expirated(token: string) {
    const jwtToken = JSON.parse(atob(token.split('.')[1]))
    const expires = new Date(jwtToken.exp * 1000)
    return expires.getTime() - Date.now()  < 0;
  }

  private refreshTokenTimeout: number | undefined;

  private startRefreshTokenTimer() {
    const jwtToken = JSON.parse(atob(this.user.idToken.split('.')[1]))

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    this.refreshTokenTimeout = window.setTimeout(() => {
      this.socialAuthService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID).then(() => {
        this.socialAuthService.authState.pipe(first()).subscribe((user) => this.update_user(user))
      }).catch(() => this.logout())
    }, timeout);
  }

  private stopRefreshTokenTimer() {
    window.clearTimeout(this.refreshTokenTimeout);
  }
}
