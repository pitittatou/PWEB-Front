import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {GlobalConstants} from "../common/global-constants";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  updateUser(data: any): Observable<any> {
    const route = GlobalConstants.apiURL + "api/user/update"
    return this.http.post(route, JSON.stringify(data))
  }
}
