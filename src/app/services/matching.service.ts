import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, first, Observable} from "rxjs";
import {GlobalConstants} from "../common/global-constants";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class MatchingService {
  private matches = new BehaviorSubject<User[]>([]);

  constructor(private http: HttpClient) {
    this.getMatches().subscribe({
      next: (matches) => {
        this.matches.next(matches)
        this.startRefreshMatchesTimer()
      }
    })
  }

  getMatchesObs() {
    return this.matches.asObservable()
  }

  getRandomUsers(nb: number): Observable<any> {
    const route = GlobalConstants.apiURL + 'api/user/getRandomUsers/' + nb
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

  private refreshMatchesTimeout: number | undefined;

  private startRefreshMatchesTimer() {
    const timeout = 30*1000;
    this.refreshMatchesTimeout = window.setTimeout(() => {
      this.getMatches().subscribe({
        next: (matches) => {
          console.log("refresh")
          this.matches.next(matches)
          this.startRefreshMatchesTimer()
        }
      })
    }, timeout);
  }
}
