import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENVIRONMENT } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EleveService {
  private URL_API = ENVIRONMENT.API + "/eleve";
  constructor(private httpClient:HttpClient) { }
  getAll(request):Observable<any>{
    return this.httpClient.get(this.URL_API,request);
  }
  add(eleve: any): Observable<any> {
    return this.httpClient.post(this.URL_API , eleve);
  }
}
