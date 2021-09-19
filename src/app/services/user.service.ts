import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  public url = Global.url;

  constructor(
    private _http: HttpClient
  ) { }

  saveUser(params):Observable<any>{
    params=JSON.stringify(params);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'save-user',params,{headers:headers});
  }

  login(params):Observable<any>{
    params=JSON.stringify(params);
    let headers= new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'login',params,{headers:headers});
  }
}
