import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; //injectar
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

//ventanas modales
import { MyModalComponent } from '../modal/MyModalComponent';
import { ModalService } from '../modal/modal-service.service';
import { Observable } from 'rxjs';
import { docente } from '../clases/docente';
 
//ventanas modales

@Component({
  selector: 'app-abm-docente',
  templateUrl: './abm-docente.component.html',
  styleUrls: ['./abm-docente.component.css']
})
export class AbmDocenteComponent implements OnInit {

  docentes: docente[]; 

  constructor( private location: Location, private modalService:ModalService, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private router: Router) { 
    if (this.modalService.listAbm != null && this.modalService.listAbm != undefined) {
      if(this.modalService.listAbm.getData().name == 'docente'){
        this.editar(this.modalService.listAbm.getData().id, this.modalService.listAbm.getData()); 
    }
  }
  }

  ngOnInit() {
    this.cargarGrilla().subscribe( res => this.docentes = res);
  }

 
  editar(id: number, obj:any){
    if(obj != null && obj != undefined){
      let doc : docente = new docente(id.toString(),obj.nombre,obj.apellido, obj.dni, obj.correo, obj.telefono, obj.iddomicilio, obj.idusuario);
      this.abrirModal('Nuevo docente', 'docente' , 3, doc ).subscribe(
        obj => this.guardardocente(obj).subscribe(json => this.cargarGrilla().subscribe( res => this.docentes = res)));
    }
    else if (id !=0){
    this.abrirModal('Editar docente', 'docente' , 3, this.docentes.find( docente => docente.id === id )).subscribe(
      obj => this.guardardocente(obj).subscribe(json => this.cargarGrilla().subscribe( res => this.docentes = res)));}
      else{
        let doc : docente = new docente("0","","","","","","","");
        this.abrirModal('Nuevo docente', 'docente' , 3, doc ).subscribe(
          obj => this.guardardocente(obj).subscribe(json => this.cargarGrilla().subscribe( res => this.docentes = res)));}
}

  eliminar(id: number){
    this.abrirModal('Confirmación', '¿ Desea eliminar el registro ?', 1, null).subscribe(
      closed => {
    const headers = new HttpHeaders({'id' : id.toString()});
    return this.http.delete(this.baseUrl + 'api/docente', { headers: headers })
      .subscribe(json => this.cargarGrilla().subscribe( res => this.docentes = res))});
  }
 
  //ventanas modales
  abrirModal(titulo: string, mensaje: string, tipo: number, docente:any): Observable<any> {
    const modalRef = this.modalService.open(MyModalComponent, { title: titulo, message: mensaje, tipo: tipo , parametros : docente });
    return modalRef.onResult();
  }

  guardardocente(obj) : Observable<docente>{
        if(+obj.id != 0){
        let param : docente = new docente(obj.id, obj.nombre,obj.apellido, obj.dni, obj.correo, obj.telefono, obj.iddomicilio, obj.idusuario);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json'});
        return this.http.put<docente>(this.baseUrl + 'api/docente', param, {headers:headers} );}
        else{
          
          let param : docente = new docente(obj.id, obj.nombre,obj.apellido, obj.dni, obj.correo, obj.telefono, obj.iddomicilio, obj.idusuario);
          let headers = new HttpHeaders({ 'Content-Type': 'application/json'});
          return this.http.post<docente>(this.baseUrl + 'api/docente', param, {headers:headers} );
        }
  }

  cargarGrilla() : Observable<docente[]>{
    const headers = new HttpHeaders({ });
    return this.http.get<docente[]>(this.baseUrl + 'api/docente', { headers: headers });
  }
  seleccionar(id){
    let nodo = this.modalService.listAbm;
    while(nodo.getData().name=="docente")
    {this.modalService.listAbm = nodo.getNext();nodo = nodo.getNext();}
    this.modalService.listAbm.getData().iddocente = id; 
    this.location.back();
  }
   // modelo back, front
   // controlers (api)
   // component vista
  
 //suscribir 

   buscarDatoGrilla()/* : Observable<docente>[] */{
    let dato = document.getElementById("dato")['value'];//Js
    if(dato!=null)
    {
      const headers = new HttpHeaders({"dato": dato});
     return this.http.get<docente[]>(this.baseUrl + 'api/docente', {headers:headers})
     .subscribe( res => this.docentes = res)
 
    }
   
  } 

}



