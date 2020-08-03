import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
// Observable: recoge informacion de la api rest (header / body)
import {Observable} from 'rxjs';


@Injectable()
export class PeticionesService {

   public url : string;
    constructor( public _http: HttpClient
   
    ){
     this.url ="https://localhost:4200/api/";
    }

    loadGrilla() : Observable<any>{
        const headers = new HttpHeaders({ });
        return this._http.get<any>(this.url+ 'docente');
      }

    findDatoGrilla()/* : Observable<docente>[] */{
        let dato = document.getElementById("dato")['value'];//Js
        if(dato!=null)
        {
          const headers = new HttpHeaders({"dato": dato});
         return this._http.get<any>(this.url + 'docente', {headers:headers})
        }  
    }


    getUsers(){
        return this._http.get(this.url);
    }

    getUser(userId): Observable<any>{
        return this._http.get(this.url+ userId);
    }

    addUser(user): Observable<any>{
        let params=JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url, params, {headers: headers});
    }
   
}