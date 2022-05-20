import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {GlobalConstants} from "../common/global-constants";
import {HttpClient} from "@angular/common/http";
import {UpdateProfileForm} from "../models/update-profile-form.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  updateUser(data: any): Observable<any> {
    const route = GlobalConstants.apiURL + "api/user/update"
    return this.http.post(route, data)
  }

  register(data: any): Observable<any> {
    const route = GlobalConstants.apiURL + "api/user/register"
    return this.http.post(route, data)
  }

  get_photos() : Observable<any> {
    const route = GlobalConstants.apiURL + 'api/user/getPhotos'
    return this.http.get(route)
  }

  update_photos(photos: string[]): Observable<any> {
    const route = GlobalConstants.apiURL + 'api/user/updatePhotos'
    return this.http.post(route, {photos: photos})
  }

  get_profile(): Observable<any> {
    const route = GlobalConstants.apiURL + 'api/user/getProfile'
    return this.http.get<UpdateProfileForm>(route)
  }
}
