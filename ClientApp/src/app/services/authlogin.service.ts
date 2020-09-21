import { Inject, Injectable } from '@angular/core';
import {HttpClient, HttpHeaders}  from '@angular/common/http';
import {usuario} from '../clases/usuario';
import {loginI} from '../clases/login';
import {tap} from 'rxjs/operators';
import { observable, BehaviorSubject, Observable } from 'rxjs';


@Injectable()
export class AuthLoginService {
//authServer: string = 'http://localhost:5001/';
authSubject= new BehaviorSubject(false);
private token: string;

  constructor(private _http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  login( user ) : Observable<any>/* user: usuario */
  {
    /* user.nombre="maxi";
    user.codigo="123456";
   */
   let Headers : HttpHeaders = new HttpHeaders({'usuario': user.nombre , 'pass': user.codigo});
      //return this._http.get<any>(this.baseUrl + 'api/Usuario?nombre=' + user.nombre + '&codigo=' + user.codigo );
     return this._http.get<any>(this.baseUrl +'api/logueo', {headers: Headers}).pipe(tap((res)=>{
      if(res){ 
          this.saveToken(res.accessToken, res.expiresIn);
          console.log(res);
      }
    })); 
  }

  logout(): void
  {
    this.token='';
    localStorage.removeItem("Access_Token");
    localStorage.removeItem("Expires_In");
  }

  private saveToken(token: string, expiresIn: string): void{
    localStorage.setItem("Access_Token", token);
    localStorage.setItem("Expires_In", expiresIn);
    this.token= token;
  }

  private getToken(): string
  {
    if(!this.token)
    {
      this.token = localStorage.getItem("Access_Token");
    }
    return this.token;
  }
}
