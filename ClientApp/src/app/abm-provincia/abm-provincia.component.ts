import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

//ventanas modales
import { MyModalComponent } from '../modal/MyModalComponent';
import { ModalService } from '../modal/modal-service.service';
import { Observable } from 'rxjs';
import { provincia } from '../clases/provincia';

//ventanas modales

@Component({
  selector: 'app-abm-provincia',
  templateUrl: './abm-provincia.component.html',
  styleUrls: ['./abm-provincia.component.css']
})
export class AbmprovinciaComponent implements OnInit {

  provincias: provincia[];
  isAdd : boolean = false;
  constructor(private location: Location, private modalService: ModalService, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private router: Router) {
    if (this.modalService.listAbm != null && this.modalService.listAbm != undefined) {
      if (this.modalService.listAbm.getData().name == 'provincia') {
        this.editar(this.modalService.listAbm.getData().id, this.modalService.listAbm.getData());
      }
    }
  }

  ngOnInit() {
    this.cargarGrilla().subscribe(res => this.provincias = res);
  }

  editar(id: number, obj: any) {
    if (obj != null && obj != undefined) {
      let doc: provincia = new provincia(id.toString(), obj.nombre, obj.idpais);
      this.abrirModal('Nuevo provincia', 'provincia', 3, doc).subscribe(
        obj => this.guardarprovincia(obj).subscribe(json => this.cargarGrilla().subscribe(res => this.provincias = res)));
    }
    else if (id != 0) {
      this.abrirModal('Editar provincia', 'provincia', 3, this.provincias.find(provincia => provincia.id === id)).subscribe(
        obj => this.guardarprovincia(obj).subscribe(json => this.cargarGrilla().subscribe(res => this.provincias = res)));
    }
    else {
      let doc: provincia = new provincia("0", "", "");
      this.abrirModal('Nuevo provincia', 'provincia', 3, doc).subscribe(
        obj => this.guardarprovincia(obj).subscribe(json => this.cargarGrilla().subscribe(res => this.provincias = res)));
    }
  }

  eliminar(id: number) {
    this.abrirModal('Confirmación', '¿ Desea eliminar el registro ?', 1, null).subscribe(
      closed => {
        const headers = new HttpHeaders({ 'id': id.toString() });
        return this.http.delete(this.baseUrl + 'api/provincia', { headers: headers })
          .subscribe(json => this.cargarGrilla().subscribe(res => this.provincias = res))
      });
  }


  //ventanas modales
  abrirModal(titulo: string, mensaje: string, tipo: number, provincia: any): Observable<any> {
    const modalRef = this.modalService.open(MyModalComponent, { title: titulo, message: mensaje, tipo: tipo, parametros: provincia });
    return modalRef.onResult();
  }

  guardarprovincia(obj): Observable<provincia> {
    if (+obj.id != 0) {
      let param: provincia = new provincia(obj.id, obj.nombre, obj.idpais);
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.put<provincia>(this.baseUrl + 'api/provincia', param, { headers: headers });
    }
    else {
      this.isAdd = true;
      let param: provincia = new provincia(obj.id, obj.nombre, obj.idpais);
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.post<provincia>(this.baseUrl + 'api/provincia', param, { headers: headers });
    }
  }

  cargarGrilla(): Observable<provincia[]> {
    const headers = new HttpHeaders({});
    return this.http.get<provincia[]>(this.baseUrl + 'api/provincia', { headers: headers });
  }

  seleccionar(id){
    let nodo = this.modalService.listAbm;
    if(this.isAdd){this.modalService.listAbm = nodo.getNext();}
    this.modalService.listAbm.getData().idprovincia = id; 
    this.location.back();
  }
}



