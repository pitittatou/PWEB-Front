import { Injectable } from '@angular/core';
import {GoogleLoginProvider, SocialAuthService, SocialUser} from "angularx-social-login";
import {BehaviorSubject, first, throwError} from "rxjs";
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
  private authState = new BehaviorSubject<boolean>(false);

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
    this.update_auth_state()
  }

  login() {
    return this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((user) => {
      this.update_user(user)
      this.startRefreshTokenTimer()
      const route = GlobalConstants.apiURL + 'api/user/login'
      this.http.get<Response>(route).subscribe((resp) => {
        this.update_registered(resp.registered)
        this.update_auth_state()
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
    this.update_auth_state()
    this.socialAuthService.signOut().then(() => this.router.navigateByUrl('/connexion')
    ).catch(() => {})
  }

  get_user() {
    if (this.user.idToken) {
      return this.user
    }
    return null
  }

  // Returns an observable that output authstate:
  // - true if logged in and registered
  // - false otherwise
  get_auth_state() {
    return this.authState.asObservable()
  }

  is_logged_in() {
    return !!this.user.idToken;
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

  private update_auth_state() {
    if (this.user.idToken && this.registered) {
      this.authState.next(true)
    } else {
      this.authState.next(false)
    }
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
