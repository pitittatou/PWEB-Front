import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GlobalConstants} from "../common/global-constants";

@Injectable({
  providedIn: 'root'
})
export class MatchingService {

  constructor(private http: HttpClient) {
  }

  get(): Observable<any> {
    const route = GlobalConstants.apiURL + 'api/user/get'
    return this.http.get(route);
  }
}
