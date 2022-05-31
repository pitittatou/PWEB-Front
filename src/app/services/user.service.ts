import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Profile} from "../models/profile.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  updateUser(data: any): Observable<any> {
    const route = environment.apiURL + "api/user/update"
    return this.http.post(route, data)
  }

  register(data: any): Observable<any> {
    const route = environment.apiURL + "api/user/register"
    return this.http.post(route, data)
  }

  get_photos() : Observable<any> {
    const route = environment.apiURL + 'api/user/getPhotos'
    return this.http.get(route)
  }

  update_photos(photos: string[]): Observable<any> {
    const route = environment.apiURL + 'api/user/updatePhotos'
    return this.http.post(route, {photos: photos})
  }

  get_profile(): Observable<any> {
    const route = environment.apiURL + 'api/user/getProfile'
    return this.http.get<Profile>(route)
  }
}
