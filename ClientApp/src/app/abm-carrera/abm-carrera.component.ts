import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MyModalComponent } from '../modal/MyModalComponent';
import { ModalService } from '../modal/modal-service.service';
import { Observable } from 'rxjs';
import { carrera } from '../clases/carrera';

@Component({
  selector: 'app-abm-carrera',
  templateUrl: './abm-carrera.component.html',
  styleUrls: ['./abm-carrera.component.css']
})
export class AbmCarreraComponent implements OnInit {

  carreras: carrera[];
  constructor(private location: Location, private modalService:ModalService, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private router: Router) { 
    this.modalService.setFiltro(new carrera("0","",""));
    if (this.modalService.listAbm != null && this.modalService.listAbm != undefined) {
      if(this.modalService.listAbm.getData().name == 'carrera'){
        this.editar(this.modalService.listAbm.getData().id,this.modalService.listAbm.getData() ); 
    }
  }
  }

  ngOnInit() {
    this.cargarGrilla().subscribe( res => this.carreras = res);
  }

  editar(id: number, obj:any){
    if (obj != null && obj != undefined){
      let car : carrera = new carrera(id.toString(),obj.nombre,obj.descripcion);
      this.abrirModal('Editar carrera', 'carrera' , 3, car).subscribe(
      obj => this.guardarCarrera(obj).subscribe(json => this.cargarGrilla().subscribe( res => this.carreras = res)));
    }
    else if(id!=0)
    {
      this.abrirModal('Editar carrera', 'carrera' , 3, this.carreras.find( carrera => carrera.id === id )).subscribe(
        obj => this.guardarCarrera(obj).subscribe(json => this.cargarGrilla().subscribe( res => this.carreras = res)));
    }
      else{
        let car : carrera = new carrera("0","","");
        this.abrirModal('Nueva Carrera', 'carrera' , 3, car ).subscribe(
          obj => this.guardarCarrera(obj).subscribe(json => this.cargarGrilla().subscribe( res => this.carreras = res)));}
}

  eliminar(id: number){
    this.abrirModal('Confirmación', '¿ Desea eliminar el registro ?', 1, null).subscribe(
      closed => {
    const headers = new HttpHeaders({'id' : id.toString()});
    return this.http.delete(this.baseUrl + 'api/Carrera', { headers: headers })
      .subscribe(json => this.cargarGrilla().subscribe( res => this.carreras = res))});
  }
  

  abrirModal(titulo: string, mensaje: string, tipo: number, carrera:any): Observable<any> {
    const modalRef = this.modalService.open(MyModalComponent, { title: titulo, message: mensaje, tipo: tipo , parametros : carrera });
    return modalRef.onResult();
  }

  guardarCarrera(obj) : Observable<carrera>{
        if(+obj.id != 0){
        let param : carrera = new carrera(obj.id, obj.nombre, obj.descripcion);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json'});
        return this.http.put<carrera>(this.baseUrl + 'api/Carrera', param, {headers:headers} );}
        else{
          let param : carrera = new carrera(obj.id, obj.nombre, obj.descripcion);
          let headers = new HttpHeaders({ 'Content-Type': 'application/json'});
          return this.http.post<carrera>(this.baseUrl + 'api/Carrera', param, {headers:headers} );
        }
  }

  cargarGrilla() : Observable<carrera[]>{
    const headers = new HttpHeaders({ });
    return this.http.get<carrera[]>(this.baseUrl + 'api/Carrera', { headers: headers });
  }
  seleccionar(id){
    let nodo = this.modalService.listAbm;
    while(nodo.getData().name=="carrera")
    {this.modalService.listAbm = nodo.getNext();nodo = nodo.getNext();}
    this.modalService.listAbm.getData().idcarrera = id; 
    this.location.back();
  }
}



