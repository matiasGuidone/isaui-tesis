import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

//ventanas modales
import { MyModalComponent } from '../modal/MyModalComponent';
import { ModalService } from '../modal/modal-service.service';
import { Observable } from 'rxjs';
import { alumno } from '../clases/alumno';
 
//ventanas modales

@Component({
  selector: 'app-abm-alumno',
  templateUrl: './abm-alumno.component.html',
  styleUrls: ['./abm-alumno.component.css']
})
export class AbmAlumnoComponent implements OnInit {

  alumnos: alumno[];
  constructor(private modalService:ModalService, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private router: Router) { }

  ngOnInit() {
    this.cargarGrilla().subscribe( res => this.alumnos = res);
  }

  editar(id: number){
    if (id !=0){
    this.abrirModal('Editar alumno', '' , 3, this.alumnos.find( alumno => alumno.id === id )).subscribe(
      obj => this.guardaralumno(obj).subscribe(json => this.cargarGrilla().subscribe( res => this.alumnos = res)));}
      else{
        let doc : alumno = new alumno("0","","","");
        this.abrirModal('Nueve alumne', '' , 3, doc ).subscribe(
          obj => this.guardaralumno(obj).subscribe(json => this.cargarGrilla().subscribe( res => this.alumnos = res)));}
}

  eliminar(id: number){
    this.abrirModal('Confirmación', '¿ Desea eliminar el registro ?', 1, null).subscribe(
      closed => {
    const headers = new HttpHeaders({'id' : id.toString()});
    return this.http.delete(this.baseUrl + 'api/alumno', { headers: headers })
      .subscribe(json => this.cargarGrilla().subscribe( res => this.alumnos = res))});
  }
  




 //ventanas modales
  abrirModal(titulo: string, mensaje: string, tipo: number, alumno:any): Observable<any> {
    const modalRef = this.modalService.open(MyModalComponent, { title: titulo, message: mensaje, tipo: tipo , parametros : alumno });
    return modalRef.onResult();
  }

  guardaralumno(obj) : Observable<alumno>{
        if(+obj.id != 0){
        let param : alumno = new alumno(obj.id, obj.nombre, obj.apellido, obj.dni);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json'});
        return this.http.put<alumno>(this.baseUrl + 'api/alumno', param, {headers:headers} );}
        else{
          let param : alumno = new alumno(obj.id, obj.nombre, obj.apellido, obj.dni);
          let headers = new HttpHeaders({ 'Content-Type': 'application/json'});
          return this.http.post<alumno>(this.baseUrl + 'api/alumno', param, {headers:headers} );
        }
  }

  cargarGrilla() : Observable<alumno[]>{
    const headers = new HttpHeaders({ });
    return this.http.get<alumno[]>(this.baseUrl + 'api/alumno', { headers: headers });
  }
}



