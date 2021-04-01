import { Inject, Injectable } from '@angular/core';
import {HttpClient, HttpHeaders}  from '@angular/common/http';
import {usuario} from '../clases/usuario';
import {tap} from 'rxjs/operators';
import { observable, BehaviorSubject, Observable } from 'rxjs';
import { ModalService } from '../modal/modal-service.service';
import { MyModalComponent } from '../modal/MyModalComponent';


@Injectable()
export class AuthLoginService {
authSubject= new BehaviorSubject(false);
private token: string;
public componenteGuard:string =''; 
public componentes : any[]=new Array<any>();
  foto: any;
  constructor(private _http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  login( user ) : Observable<any>/* user: usuario */
  {
    /* user.nombre="maxi";
    user.codigo="123456";
   */

   let Headers : HttpHeaders = new HttpHeaders({'usuario': user.nombre , 'pass': user.codigo, 'token':''});
      //return this._http.get<any>(this.baseUrl + 'api/Usuario?nombre=' + user.nombre + '&codigo=' + user.codigo );
     return this._http.get<any>(this.baseUrl +'api/logueo', {headers: Headers}).pipe(tap((res)=>{
      if(res){
          let json = JSON.parse(res.toString()); 
          //si hay varios roles se abre un dialogo al usuario para el ingreso de uno específico
          if(Array.isArray(json.rol.nombrerol)){
             return json;
          } 
          else{
            console.log(json);
          this.saveToken(json.accessToken, json.expiresIn, JSON.stringify(json.componentes), JSON.stringify(json.rol));
          }
      }
    }));
  }

  logout(): void
  {
    this.token='';
    localStorage.removeItem("Access_Token");
    localStorage.removeItem("Expires_In");
    localStorage.removeItem("Componentes");
    localStorage.setItem("InicioSesion", "false" );
    localStorage.removeItem("Rol");
  }

   saveToken(token: string, expiresIn: string, componentes: string, rol: string): void{
    localStorage.setItem("Access_Token", token);
    localStorage.setItem("Expires_In", expiresIn);
    localStorage.setItem("Componentes", componentes);
    localStorage.setItem("Rol",rol);
    localStorage.setItem("InicioSesion", "true" );
    this.token = token;
    //cargar componentes del usuario seleccionado
  }

  public getNombreUsuario(){
    return JSON.parse(localStorage.getItem("Rol")? localStorage.getItem("Rol"): '{"nombreusuario":""}').nombreusuario; 
  }

  public getNombreTipoUsuario(){
    return JSON.parse(localStorage.getItem("Rol")? localStorage.getItem("Rol"): '{"nombrerol":""}').nombrerol; 
  }

  public getEstilo(){
    return JSON.parse(localStorage.getItem("Rol")? localStorage.getItem("Rol"): '{"estilo":""}').estilo; 
  }

  public getFoto(){
    return JSON.parse(localStorage.getItem("Rol")? localStorage.getItem("Rol"): '{"foto":""}').foto; 
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
