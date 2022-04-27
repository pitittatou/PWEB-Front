import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GlobalConstants} from "../common/global-constants";

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  constructor(private http: HttpClient) {
  }

  getData(): Observable<any> {
    const route = GlobalConstants.apiURL + 'api/Profil'

    const formData = new FormData();
    //formData.append("data", file, file.name);
    //return this.http.post(route, formData);
  }

  
}
