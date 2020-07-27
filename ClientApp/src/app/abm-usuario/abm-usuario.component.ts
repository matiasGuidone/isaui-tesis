import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MyModalComponent } from '../modal/MyModalComponent';
import { ModalService } from '../modal/modal-service.service';
import { Observable } from 'rxjs';
import { usuario } from '../clases/usuario';


@Component({
  selector: 'app-abm-usuario',
  templateUrl: './abm-usuario.component.html',
  styleUrls: ['./abm-usuario.component.css']
})
export class AbmUsuarioComponent implements OnInit {

  usuarios: usuario[]; 

  constructor( private location: Location, private modalService:ModalService, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private router: Router) { 
    if (this.modalService.listAbm != null && this.modalService.listAbm != undefined) {
      if(this.modalService.listAbm.getData().name == 'usuario'){
        this.editar(this.modalService.listAbm.getData().id, this.modalService.listAbm.getData()); 
    }
  }
  }

  ngOnInit() {
    this.cargarGrilla().subscribe( res => this.usuarios = res);
  }

 
  editar(id: number, obj:any){
    if(obj != null && obj != undefined){
      let usu : usuario = new usuario(id.toString(),obj.nombre,obj.codigo, obj.codigoayuda, obj.correro);
      this.abrirModal('Nuevo usuario', 'usuario' , 3, usu ).subscribe(
        obj => this.guardarusuario(obj).subscribe(json => this.cargarGrilla().subscribe( res => this.usuarios = res)));
    }
    else if (id !=0){
    this.abrirModal('Editar usuario', 'usuario' , 3, this.usuarios.find( usuario => usuario.id === id )).subscribe(
      obj => this.guardarusuario(obj).subscribe(json => this.cargarGrilla().subscribe( res => this.usuarios = res)));}
      else{
        let usu : usuario = new usuario("0","","","","");
        this.abrirModal('Nuevo usuario', 'usuario' , 3, usu ).subscribe(
          obj => this.guardarusuario(obj).subscribe(json => this.cargarGrilla().subscribe( res => this.usuarios = res)));}
}

  eliminar(id: number){
    this.abrirModal('Confirmación', '¿ Desea eliminar el registro ?', 1, null).subscribe(
      closed => {
    const headers = new HttpHeaders({'id' : id.toString()});
    return this.http.delete(this.baseUrl + 'api/usuario', { headers: headers })
      .subscribe(json => this.cargarGrilla().subscribe( res => this.usuarios = res))});
  }
 
  //ventanas modales
  abrirModal(titulo: string, mensaje: string, tipo: number, usuario:any): Observable<any> {
    const modalRef = this.modalService.open(MyModalComponent, { title: titulo, message: mensaje, tipo: tipo , parametros : usuario });
    return modalRef.onResult();
  }

  guardarusuario(obj) : Observable<usuario>{
        if(+obj.id != 0){
        let param : usuario = new usuario(obj.id, obj.nombre, obj.codigo, obj.codigoayuda, obj.correo);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json'});
        return this.http.put<usuario>(this.baseUrl + 'api/usuario', param, {headers:headers} );}
        else{
          
          let param : usuario = new usuario(obj.id, obj.nombre, obj.codigo, obj.codigoayuda, obj.correo);
          let headers = new HttpHeaders({ 'Content-Type': 'application/json'});
          return this.http.post<usuario>(this.baseUrl + 'api/usuario', param, {headers:headers} );
        }
  }

  cargarGrilla() : Observable<usuario[]>{
    const headers = new HttpHeaders({ });
    return this.http.get<usuario[]>(this.baseUrl + 'api/usuario', { headers: headers });
  }
  seleccionar(id){
    let nodo = this.modalService.listAbm;
    while(nodo.getData().name=="usuario")
    {this.modalService.listAbm = nodo.getNext();nodo = nodo.getNext();}
    this.modalService.listAbm.getData().idusuario = id; 
    this.location.back();
  }
}



