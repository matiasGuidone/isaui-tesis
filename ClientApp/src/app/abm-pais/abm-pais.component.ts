import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

//ventanas modales
import { MyModalComponent } from '../modal/MyModalComponent';
import { ModalService } from '../modal/modal-service.service';
import { Observable } from 'rxjs';
import { pais } from '../clases/pais';
 
//ventanas modales

@Component({
  selector: 'app-abm-pais',
  templateUrl: './abm-pais.component.html',
  styleUrls: ['./abm-pais.component.css']
})
export class AbmpaisComponent implements OnInit {

  paises: pais[]; 

  constructor(private location: Location, private modalService:ModalService, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private router: Router) {

   }

  ngOnInit() {
    this.cargarGrilla().subscribe( res => this.paises = res);
  }

  editar(id: number){
    if (id !=0){
    this.abrirModal('Editar pais', 'pais' , 3, this.paises.find( pais => pais.id === id )).subscribe(
      obj => this.guardarpais(obj).subscribe(json => this.cargarGrilla().subscribe( res => this.paises = res)));}
      else{
        let doc : pais = new pais("0","");
        this.abrirModal('Nuevo pais', 'pais' , 3, doc ).subscribe(
          obj => this.guardarpais(obj).subscribe(json => this.cargarGrilla().subscribe( res => this.paises = res)));}
}

  eliminar(id: number){
    this.abrirModal('Confirmación', '¿ Desea eliminar el registro ?', 1, null).subscribe(
      closed => {
    const headers = new HttpHeaders({'id' : id.toString()});
    return this.http.delete(this.baseUrl + 'api/pais', { headers: headers })
      .subscribe(json => this.cargarGrilla().subscribe( res => this.paises = res))});
  }
  

 //ventanas modales
  abrirModal(titulo: string, mensaje: string, tipo: number, pais:any): Observable<any> {
    const modalRef = this.modalService.open(MyModalComponent, { title: titulo, message: mensaje, tipo: tipo , parametros : pais });
    return modalRef.onResult();
  }

  guardarpais(obj) : Observable<pais>{
        if(+obj.id != 0){
        let param : pais = new pais(obj.id, obj.nombre);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json'});
        return this.http.put<pais>(this.baseUrl + 'api/pais', param, {headers:headers} );}
        else{ 
          let param : pais = new pais(obj.id, obj.nombre);
          let headers = new HttpHeaders({ 'Content-Type': 'application/json'});
          return this.http.post<pais>(this.baseUrl + 'api/pais', param, {headers:headers} );
        }
  }

  cargarGrilla() : Observable<pais[]>{
    const headers = new HttpHeaders({ });
    return this.http.get<pais[]>(this.baseUrl + 'api/pais', { headers: headers });
  }

  seleccionar(id){
    let nodo = this.modalService.listAbm;
    while(nodo.getData().name=="pais")
    {this.modalService.listAbm = nodo.getNext();nodo = nodo.getNext();}
    this.modalService.listAbm.getData().idpais = id; 
    this.location.back();
  }
}



