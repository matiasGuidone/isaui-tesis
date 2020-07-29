import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

//ventanas modales
import { MyModalComponent } from '../modal/MyModalComponent';
import { ModalService } from '../modal/modal-service.service';
import { Observable } from 'rxjs';
import { menu } from '../clases/menu';
 
//ventanas modales

@Component({
  selector: 'app-abm-menu',
  templateUrl: './abm-menu.component.html',
  styleUrls: ['./abm-menu.component.css']
})
export class AbmMenuComponent implements OnInit {

  menus: menu[]; 

  constructor( private location: Location, private modalService:ModalService, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private router: Router) { 
    if (this.modalService.listAbm != null && this.modalService.listAbm != undefined) {
      if(this.modalService.listAbm.getData().name == 'menu'){
        this.editar(this.modalService.listAbm.getData().id, this.modalService.listAbm.getData()); 
    }
  }
  }

  ngOnInit() {
    this.cargarGrilla().subscribe( res => this.menus = res);
  }

 
  editar(id: number, obj:any){
    if(obj != null && obj != undefined){
      let doc : menu = new menu(id.toString(),obj.nombre,obj.componente, obj.tipo);
      this.abrirModal('Nuevo menu', 'menu' , 3, doc ).subscribe(
        obj => this.guardarmenu(obj).subscribe(json => this.cargarGrilla().subscribe( res => this.menus = res)));
    }
    else if (id !=0){
    this.abrirModal('Editar menu', 'menu' , 3, this.menus.find( menu => menu.id === id )).subscribe(
      obj => this.guardarmenu(obj).subscribe(json => this.cargarGrilla().subscribe( res => this.menus = res)));}
      else{
        let doc : menu = new menu("0","","","");
        this.abrirModal('Nuevo menu', 'menu' , 3, doc ).subscribe(
          obj => this.guardarmenu(obj).subscribe(json => this.cargarGrilla().subscribe( res => this.menus = res)));}
}

  eliminar(id: number){
    this.abrirModal('Confirmación', '¿ Desea eliminar el registro ?', 1, null).subscribe(
      closed => {
    const headers = new HttpHeaders({'id' : id.toString()});
    return this.http.delete(this.baseUrl + 'api/menu', { headers: headers })
      .subscribe(json => this.cargarGrilla().subscribe( res => this.menus = res))});
  }
 
  //ventanas modales
  abrirModal(titulo: string, mensaje: string, tipo: number, menu:any): Observable<any> {
    const modalRef = this.modalService.open(MyModalComponent, { title: titulo, message: mensaje, tipo: tipo , parametros : menu });
    return modalRef.onResult();
  }

  guardarmenu(obj) : Observable<menu>{
        if(+obj.id != 0){
        let param : menu = new menu(obj.id,obj.nombre, obj.componente, obj.tipo );
        let headers = new HttpHeaders({ 'Content-Type': 'application/json'});
        return this.http.put<menu>(this.baseUrl + 'api/menu', param, {headers:headers} );}
        else{
          
          let param : menu = new menu(obj.id,obj.nombre,obj.componente, obj.tipo );
          let headers = new HttpHeaders({ 'Content-Type': 'application/json'});
          return this.http.post<menu>(this.baseUrl + 'api/menu', param, {headers:headers} );
        }
  }

  public cargarGrilla() : Observable<menu[]>{
    const headers = new HttpHeaders({ });
    return this.http.get<menu[]>(this.baseUrl + 'api/menu', { headers: headers });
  }
  seleccionar(id){
    let nodo = this.modalService.listAbm;
    while(nodo.getData().name=="menu")
    {this.modalService.listAbm = nodo.getNext();nodo = nodo.getNext();}
    this.modalService.listAbm.getData().idmenu = id; 
    this.location.back();
  }
}



