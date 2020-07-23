import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

//ventanas modales
import { MyModalComponent } from '../modal/MyModalComponent';
import { ModalService } from '../modal/modal-service.service';
import { Observable } from 'rxjs';
import { localidad } from '../clases/localidad';
 
//ventanas modales

@Component({
  selector: 'app-abm-localidad',
  templateUrl: './abm-localidad.component.html',
  styleUrls: ['./abm-localidad.component.css']
})
export class AbmlocalidadComponent implements OnInit {

  localidades: localidad[]; 
  constructor(  private location: Location, private modalService:ModalService, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private router: Router) {
    if (this.modalService.listAbm != null && this.modalService.listAbm != undefined) {
      if(this.modalService.listAbm.getData().name == 'localidad'){
        this.editar(this.modalService.listAbm.getData().id, this.modalService.listAbm.getData()); 
    }
  }
   }

  ngOnInit() {
    this.cargarGrilla().subscribe( res => this.localidades = res);
  }

  editar(id: number, obj:any){
    if(obj != null && obj != undefined){
      let doc : localidad = new localidad(id.toString(),obj.nombre, obj.idprovincia );
      this.abrirModal('Nueva localidad', 'localidad' , 3, doc ).subscribe(
        obj => this.guardarlocalidad(obj).subscribe(json => this.cargarGrilla().subscribe( res => this.localidades = res)));
    }
    else if (id !=0){
    this.abrirModal('Editar localidad', 'localidad' , 3, this.localidades.find( localidad => localidad.id === id )).subscribe(
      obj => this.guardarlocalidad(obj).subscribe(json => this.cargarGrilla().subscribe( res => this.localidades = res)));}
      else{
        let doc : localidad = new localidad("0","","");
        this.abrirModal('Nueva localidad', 'localidad' , 3, doc ).subscribe(
          obj => this.guardarlocalidad(obj).subscribe(json => this.cargarGrilla().subscribe( res => this.localidades = res)));}
}

  eliminar(id: number){
    this.abrirModal('Confirmación', '¿ Desea eliminar el registro ?', 1, null).subscribe(
      closed => {
    const headers = new HttpHeaders({'id' : id.toString()});
    return this.http.delete(this.baseUrl + 'api/localidad', { headers: headers })
      .subscribe(json => this.cargarGrilla().subscribe( res => this.localidades = res))});
  }
  

 //ventanas modales
  abrirModal(titulo: string, mensaje: string, tipo: number, localidad:any): Observable<any> {
    const modalRef = this.modalService.open(MyModalComponent, { title: titulo, message: mensaje, tipo: tipo , parametros : localidad });
    return modalRef.onResult();
  }

  guardarlocalidad(obj) : Observable<localidad>{
        if(+obj.id != 0){
        let param : localidad = new localidad(obj.id, obj.nombre, obj.idprovincia);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json'});
        return this.http.put<localidad>(this.baseUrl + 'api/localidad', param, {headers:headers} );}
        else{ 
          let param : localidad =  new localidad(obj.id, obj.nombre, obj.idprovincia);
          let headers = new HttpHeaders({ 'Content-Type': 'application/json'});
          return this.http.post<localidad>(this.baseUrl + 'api/localidad', param, {headers:headers} );
        }
  }

  cargarGrilla() : Observable<localidad[]>{
    const headers = new HttpHeaders({ });
    return this.http.get<localidad[]>(this.baseUrl + 'api/localidad', { headers: headers });
  }

  seleccionar(id){
    let nodo = this.modalService.listAbm;
    while(nodo.getData().name=="localidad")
    {this.modalService.listAbm = nodo.getNext();nodo = nodo.getNext();}
    this.modalService.listAbm.getData().idlocalidad = id; 
    this.location.back();
  }
}



