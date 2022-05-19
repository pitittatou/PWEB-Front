import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {GlobalConstants} from "../common/global-constants";
import {SocialAuthService} from "angularx-social-login";

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(private http: HttpClient) {
  }

  upload(file: File): Observable<any> {
    const route = GlobalConstants.apiURL + 'api/image'

    const formData = new FormData();
    formData.append("image", file, file.name);
    return this.http.post(route, formData);
  }

  delete(fileName: string): Observable<any> {
    const route = GlobalConstants.apiURL + 'api/image/' + fileName
    return this.http.delete(route);
  }
}
