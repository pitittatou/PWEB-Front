import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProfilComponent } from "../profil/profil.component"; 
@Injectable({
  providedIn: 'root'
})

export class ProfilService {
 

  constructor(private http: HttpClient) {
  }

  getData(body:any): Observable<any> {   
    const headers = new HttpHeaders({ 'content-type': 'application/json'} ); 
    
    return this.http.post('http://localhost:3000/profil',body,{'headers': headers});
  }

  
}
