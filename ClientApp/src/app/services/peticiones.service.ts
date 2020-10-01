import {Injectable, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
// Observable: recoge informacion de la api rest (header / body)
import {Observable, from} from 'rxjs';
/* -log- */
import {map} from 'rxjs/operators'
import {isNullOrUndefined} from 'util'
import { usuario } from '../clases/usuario';
/* -- */

@Injectable()
export class PeticionesService {
  
  logueosegundo(Headers: HttpHeaders) : Observable<any> {
    return this._http.get<any>(this.baseUrl + 'api/logueo', { headers: Headers });
  }

   public idsSeleccionados : number[];
   public idSeleccionado : number;
   public url : string;
   public classbody : string  = "bodyclasswh";
   public classtable2 : string = "table table-hover";
   public classtable : string  = "table-responsive";
   public classimg : string  = "custom-logo-link";
   public classnav : string = "navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3";

    constructor( public _http: HttpClient, @Inject('BASE_URL') private baseUrl: string
     
   
    ){ 
    }

   //busca objetos por id
    public getById(id: string, tabla :string) : Observable<any>{
      let token = localStorage.getItem("Access_Token");
        if (token == undefined || token == null){token ='';}
      const headers = new HttpHeaders({'token':token });
      return this._http.get<any>(this.baseUrl + 'api/'+tabla+'/'+id, { headers: headers });
    }
    // llena el array de cada component para mostrar los datos en la tabla  
    loadGrilla(abm: string ,filtro: string[] = null) : Observable<any[]>{
      if(filtro ==null){
        let token = localStorage.getItem("Access_Token");
        if (token == undefined || token == null){token ='';}
        const headers = new HttpHeaders({'token':token });
        return this._http.get<any[]>(this.baseUrl+'api/'+ abm, { headers: headers });}
        else{
          let token = localStorage.getItem("Access_Token");
        if (token == undefined || token == null){token ='';}
          let headers : HttpHeaders = new HttpHeaders({'arrayfiltros':filtro, 'token' : token});
          return this._http.get<any[]>(this.baseUrl+'api/'+ abm, {headers:headers});
        }
      }
   
    // POST o PUT para un registro recibe dos parametros obj : el tipo de objeto que estamos enviando 
    // desde el component y abm: la ruta del controler (ciclolectivo) -- en la condicion else leer "Documentacion"
    addSingleAbm(obj, abm:string ) : Observable<any>{
      if(Array.isArray(obj)){
        let token = localStorage.getItem("Access_Token");
        if (token == undefined || token == null){token ='';}
        let headers = new HttpHeaders({'Content-Type':'application/json', 'token' : token});//.set();
        return this._http.post<any>(this.baseUrl+'api/'+ abm, obj, {headers:headers} );
      }
      else
        if(+obj.id != 0 && obj.id != undefined){
        let params=JSON.stringify(obj);
        let token = localStorage.getItem("Access_Token");
        if (token == undefined || token == null){token ='';}
        let headers = new HttpHeaders({'Content-Type':'application/json', 'token' : token});//.set('Content-Type', 'application/json');
        return this._http.put<any>(this.baseUrl+'api/'+ abm , params, {headers:headers});
    }

        else{
          // Documentacion
          console.log("Comenzando stringify para almacenar el objeto");
          // pasamos el objeto a una variable tipo paramatros que sera params
          let params = obj;
          //convertimos el objeto de angular a tipo json para que viaje con nuestra peticion al backend
          JSON.stringify(params);
          console.log(params);
          // seteamos los header del http que el content type reciba un tipo application/json
          let token = localStorage.getItem("Access_Token");
        if (token == undefined || token == null){token ='';}
          let headers = new HttpHeaders({'Content-Type':'application/json', 'token' : token});//.set('Content-Type', 'application/json');
          //mandamos la peticion post para insertar el objeto dentro de nuestra base de datos
          //nos retornara un mensaje de exito con la siguiente leyenda "Guardado Exitoso"
          //de los contrario nos figuara cual es el error por el cual no puede tomar la peticion
          return this._http.post<any>(this.baseUrl+'api/'+ abm, params, {headers:headers} );
         
;        }
  }
// Elimina el registro
  eliminar(id: number, abm: string){
    let token = localStorage.getItem("Access_Token");
        if (token == undefined || token == null){token ='';}
    const headers = new HttpHeaders({'id' : id.toString(),'token' : token});
    return this._http.delete(this.baseUrl+'api/'+ abm, { headers: headers });
  }

  eliminarConFiltro(filtro: string, valor : string, abm: string){
    let token = localStorage.getItem("Access_Token");
        if (token == undefined || token == null){token ='';}
    const headers = new HttpHeaders({'id' : '0', 'filtro' : filtro.toString(), 'valor': valor.toString(),'token' : token });
    return this._http.delete(this.baseUrl+'api/'+ abm, { headers: headers });
  }
}