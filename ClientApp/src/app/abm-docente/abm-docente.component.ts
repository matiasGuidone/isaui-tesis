import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  isAdd : boolean = false;
  constructor( private location: Location, private modalService:ModalService, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private router: Router) { }

  ngOnInit() {
    this.cargarGrilla().subscribe( res => this.docentes = res);
  }

  editar(id: number){
    if (id !=0){
    this.abrirModal('Editar docente', '' , 3, this.docentes.find( docente => docente.id === id )).subscribe(
      obj => this.guardarDocente(obj).subscribe(json => this.cargarGrilla().subscribe( res => this.docentes = res)));}
      else{
        let doc : docente = new docente("0","","","", "","","","");
        this.abrirModal('Nueve Docente', '' , 3, doc ).subscribe(
          obj => this.guardarDocente(obj).subscribe(json => this.cargarGrilla().subscribe( res => this.docentes = res)));}
}

  eliminar(id: number){
    this.abrirModal('Confirmación', '¿ Desea eliminar el registro ?', 1, null).subscribe(
      closed => {
    const headers = new HttpHeaders({'id' : id.toString()});
    return this.http.delete(this.baseUrl + 'api/Docente', { headers: headers })
      .subscribe(json => this.cargarGrilla().subscribe( res => this.docentes = res))});
  }
  




 //ventanas modales
  abrirModal(titulo: string, mensaje: string, tipo: number, docente:any): Observable<any> {
    const modalRef = this.modalService.open(MyModalComponent, { title: titulo, message: mensaje, tipo: tipo , parametros : docente });
    return modalRef.onResult();
  }

  guardarDocente(obj) : Observable<docente>{
        if(+obj.id != 0){
        let param : docente = new docente(obj.id, obj.nombre, obj.apellido, obj.dni, obj.correro, obj.telefono, obj.iddomicio, obj.idususairo);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json'});
        return this.http.put<docente>(this.baseUrl + 'api/Docente', param, {headers:headers} );}
        else{
          let param : docente = new docente(obj.id, obj.nombre, obj.apellido, obj.dni,  obj.correro, obj.telefono, obj.iddomicio, obj.idususairo);
          let headers = new HttpHeaders({ 'Content-Type': 'application/json'});
          return this.http.post<docente>(this.baseUrl + 'api/Docente', param, {headers:headers} );
        }
  }

  cargarGrilla() : Observable<docente[]>{
    const headers = new HttpHeaders({ });
    return this.http.get<docente[]>(this.baseUrl + 'api/Docente', { headers: headers });
  }
  seleccionar(id){
    let nodo = this.modalService.listAbm;
    while(nodo.getData().name=="docente")
    {this.modalService.listAbm = nodo.getNext();nodo = nodo.getNext();}
    this.modalService.listAbm.getData().iddocente = id; 
    this.location.back();
  }
}



