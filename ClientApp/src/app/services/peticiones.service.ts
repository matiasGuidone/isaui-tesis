import {Injectable, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
// Observable: recoge informacion de la api rest (header / body)
import {Observable, from} from 'rxjs';

@Injectable()
export class PeticionesService {

   public idsSeleccionados : number[];
   public idSeleccionado : number;
   public url : string;
  
    constructor( public _http: HttpClient, @Inject('BASE_URL') private baseUrl: string
     
   
    ){ 
    }

   //busca objetos por id
    public getById(id: string, tabla :string) : Observable<any>{
      const headers = new HttpHeaders({ });
      return this._http.get<any>(this.baseUrl + 'api/'+tabla+'/'+id, { headers: headers });
    }
    // llena el array de cada component para mostrar los datos en la tabla  
    loadGrilla(abm: string ,filtro: string[] = null) : Observable<any[]>{
      if(filtro ==null){
        return this._http.get<any[]>(this.baseUrl+'api/'+ abm);}
        else{
          let headers : HttpHeaders = new HttpHeaders({'arrayfiltros':filtro});
          return this._http.get<any[]>(this.baseUrl+'api/'+ abm, {headers:headers});
        }
      }
    // ---- Este metodo aun no le he investigado

    findDatoGrilla()/* : Observable<docente>[] */{
        let dato = document.getElementById("dato")['value'];//Js
        if(dato!=null)
        {
          const headers = new HttpHeaders({"dato": dato});
         return this._http.get<any>(this.url + 'docente', {headers:headers})
        }  
    }
   
    // POST o PUT para un registro recibe dos parametros obj : el tipo de objeto que estamos enviando 
    // desde el component y abm: la ruta del controler (ciclolectivo) -- en la condicion else leer "Documentacion"
    addSingleAbm(obj, abm:string ) : Observable<any>{
        if(+obj.id != 0){
        let params=JSON.stringify(obj);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
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
          let headers = new HttpHeaders().set('Content-Type', 'application/json');
          //mandamos la peticion post para insertar el objeto dentro de nuestra base de datos
          //nos retornara un mensaje de exito con la siguiente leyenda "Guardado Exitoso"
          //de los contrario nos figuara cual es el error por el cual no puede tomar la peticion
          return this._http.post<any>(this.baseUrl+'api/'+ abm, params, {headers:headers} );
         
;        }
  }
// Elimina el registro
  eliminar(id: number, abm: string){
    const headers = new HttpHeaders({'id' : id.toString()});
    return this._http.delete(this.baseUrl+'api/'+ abm, { headers: headers });
  }

  eliminarConFiltro(filtro: string, valor : string, abm: string){
    const headers = new HttpHeaders({'id' : '0', 'filtro' : filtro.toString(), 'valor': valor.toString()});
    return this._http.delete(this.baseUrl+'api/'+ abm, { headers: headers });
  }
   
}