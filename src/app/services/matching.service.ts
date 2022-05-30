import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GlobalConstants} from "../common/global-constants";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class MatchingService {

  constructor(private http: HttpClient) {
  }

  getRandomUser(): Observable<any> {
    const route = GlobalConstants.apiURL + 'api/user/getRandom'
    return this.http.get<User>(route);
  }

  getRandomUsers(nb: number): Observable<any> {
    const route = GlobalConstants.apiURL + 'api/user/getRandomUsers/' + nb
    console.log(route)
    return this.http.get<User[]>(route);
  }

  accept(userId: string) : Observable<any> {
    const route = GlobalConstants.apiURL + 'api/matching/accept'
    return this.http.post(route, {userId: userId})
  }

  reject(userId: string) : Observable<any> {
    const route = GlobalConstants.apiURL + 'api/matching/reject'
    return this.http.post(route, {userId: userId})
  }

  getMatches() : Observable<any> {
    const route = GlobalConstants.apiURL + 'api/matching/getMatches'
    return this.http.get<User[]>(route)
  }
}
