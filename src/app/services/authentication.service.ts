import { Injectable } from '@angular/core';
import {GoogleLoginProvider, SocialAuthService, SocialUser} from "angularx-social-login";
import {first} from "rxjs";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {GlobalConstants} from "../common/global-constants";

export interface Response {
  registered: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private user: SocialUser
  private registered: boolean

  constructor(private socialAuthService: SocialAuthService, private router: Router, private http: HttpClient) {
    this.user = new SocialUser()
    this.registered = false

    let data = sessionStorage.getItem('registered')
    if (data != null) {
      let parsed_data = JSON.parse(data)
      if (parsed_data != null) {
        this.registered = <boolean> parsed_data
      }
    }

    data = sessionStorage.getItem('user')
    if (data != null) {
      let parsed_data = JSON.parse(data)
      if (parsed_data != null) {
        let stored_user = <SocialUser> parsed_data
        if (!AuthenticationService.expirated(stored_user.idToken)) {
          this.user = stored_user
        }
      }
    }
  }

  login() {
    return this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((user) => {
      this.update_user(user)
      this.startRefreshTokenTimer()
      const route = GlobalConstants.apiURL + '/api/auth'
      this.http.post<Response>(route, {idToken: this.user.idToken}).subscribe((resp) => {
        this.update_registered(resp.registered)
        if (this.registered) {
          this.router.navigateByUrl('')
        } else {
          this.router.navigateByUrl('/inscription')
        }
      })
    })
  }

  logout() {
    this.stopRefreshTokenTimer()
    this.update_user(null)
    this.update_registered(false)
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

  is_registered() {
    return this.registered
  }

  private update_user(user: any) {
    if (user == null) {
      this.user = new SocialUser()
    } else {
      this.user = user
    }
    sessionStorage.setItem('user', JSON.stringify(user))
  }

  private update_registered(state: boolean) {
    this.registered = state
    sessionStorage.setItem('registered', JSON.stringify(state))
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
