import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

//ventanas modales
import { MyModalComponent } from '../modal/MyModalComponent';
import { ModalService } from '../modal/modal-service.service';
import { Observable } from 'rxjs';
import { domicilio } from '../clases/domicilio';
 
//ventanas modales

@Component({
  selector: 'app-abm-domicilio',
  templateUrl: './abm-domicilio.component.html',
  styleUrls: ['./abm-domicilio.component.css']
})
export class AbmdomicilioComponent implements OnInit {

  domicilios: domicilio[]; 
  constructor( private location: Location, private modalService:ModalService, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private router: Router) { 
    if (this.modalService.listAbm != null && this.modalService.listAbm != undefined) {
    if(this.modalService.listAbm.getData().name == 'domicilio'){
      this.editar(this.modalService.listAbm.getData().id, this.modalService.listAbm.getData()); 
  }
}
  }

  ngOnInit() {
    this.cargarGrilla().subscribe( res => this.domicilios = res);
  }

  editar(id: number, obj:any){
    if(obj != null && obj != undefined){
      let doc : domicilio = new domicilio(id.toString(),obj.direccion,obj.idlocalidad, obj.idprovincia, obj.idpais);
      this.abrirModal('Nuevo domicilio', 'domicilio' , 3, doc ).subscribe(
        obj => this.guardardomicilio(obj).subscribe(json => this.cargarGrilla().subscribe( res => this.domicilios = res)));
    }
    else if (id !=0){
    this.abrirModal('Editar domicilio', 'domicilio' , 3, this.domicilios.find( domicilio => domicilio.id === id )).subscribe(
      obj => this.guardardomicilio(obj).subscribe(json => this.cargarGrilla().subscribe( res => this.domicilios = res)));}
      else{
        let doc : domicilio = new domicilio("0","","","","");
        this.abrirModal('Nuevo domicilio', 'domicilio' , 3, doc ).subscribe(
          obj => this.guardardomicilio(obj).subscribe(json => this.cargarGrilla().subscribe( res => this.domicilios = res)));}
}
 
eliminar(id: number){
    this.abrirModal('Confirmación', '¿ Desea eliminar el registro ?', 1, null).subscribe(
      closed => {
    const headers = new HttpHeaders({'id' : id.toString()});
    return this.http.delete(this.baseUrl + 'api/domicilio', { headers: headers })
      .subscribe(json => this.cargarGrilla().subscribe( res => this.domicilios = res))});
  }
  

 //ventanas modales
  abrirModal(titulo: string, mensaje: string, tipo: number, domicilio:any): Observable<any> {
    const modalRef = this.modalService.open(MyModalComponent, { title: titulo, message: mensaje, tipo: tipo , parametros : domicilio });
    return modalRef.onResult();
  }

  guardardomicilio(obj) : Observable<domicilio>{
        if(+obj.id != 0){
        let param : domicilio = new domicilio(obj.id, obj.direccion, obj.idlocalidad, obj.idprovincia, obj.idpais);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json'});
        return this.http.put<domicilio>(this.baseUrl + 'api/domicilio', param, {headers:headers} );}
        else{ 
          let param : domicilio = new domicilio(obj.id, obj.direccion, obj.idlocalidad, obj.idprovincia, obj.idpais);
          let headers = new HttpHeaders({ 'Content-Type': 'application/json'});
          return this.http.post<domicilio>(this.baseUrl + 'api/domicilio', param, {headers:headers} );
        }
  }

  cargarGrilla() : Observable<domicilio[]>{
    const headers = new HttpHeaders({ });
    return this.http.get<domicilio[]>(this.baseUrl + 'api/domicilio', { headers: headers });
  }
  
  seleccionar(id){
    let nodo = this.modalService.listAbm;
    while(nodo.getData().name=="domicilio")
    {this.modalService.listAbm = nodo.getNext();nodo = nodo.getNext();}
    this.modalService.listAbm.getData().iddomicilio = id; 
    this.location.back();
  }
}



