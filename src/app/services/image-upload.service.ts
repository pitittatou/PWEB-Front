import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(private http: HttpClient) {}

  upload(file: File): Observable<any> {
    const route = environment.apiURL + 'api/image'

    const formData = new FormData();
    formData.append("image", file, file.name);
    return this.http.post(route, formData);
  }

  delete(fileName: string): Observable<any> {
    const route = environment.apiURL + 'api/image/' + fileName
    return this.http.delete(route);
  }
}
