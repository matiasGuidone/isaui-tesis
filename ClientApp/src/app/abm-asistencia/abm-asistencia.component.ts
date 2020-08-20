import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
//ventanas modales
import { MyModalComponent } from '../modal/MyModalComponent';
import { ModalService } from '../modal/modal-service.service';
import { Observable } from 'rxjs';
import { asistencia } from '../clases/asistencia';
//servicio
import { PeticionesService } from '../services/peticiones.service';

@Component({
  selector: 'app-abm-asistencia',
  templateUrl: './abm-asistencia.component.html',
  styleUrls: ['./abm-asistencia.component.css'] 
})
export class AbmAsistenciaComponent implements OnInit {

  asistencias: asistencia[];
  constructor(private location: Location, 
              private modalService: ModalService, 
              private servicio: PeticionesService) {
   
    this.modalService.setFiltro(new asistencia("0", "", "","", ""));

    if (this.modalService.listAbm != null && this.modalService.listAbm != undefined) {
      if (this.modalService.listAbm.getData().name == 'asistencia') {
        this.editar(this.modalService.listAbm.getData().id, 
        this.modalService.listAbm.getData());
      }
    }
  }

  ngOnInit() {
    this.servicio.loadGrilla('asistencia').subscribe(res => this.asistencias = res);
  }

  editar(id: number, obj: any) {
    if (obj != null && obj != undefined) {
      let car: asistencia = new asistencia
      (id.toString(), obj.fecha_hora, obj.idmateria, obj.idalumno, obj.iddocente);
      this.abrirModal('Editar asistencia', 'asistencia', 3, car)
      .subscribe(obj => this.guardarCarrera(obj)
      .subscribe(json => this.servicio.loadGrilla('asistencia')
      .subscribe(res => this.asistencias = res)));
    }
    else if (id != 0) {
      this.abrirModal('Editar asistencia', 'asistencia', 3, this.asistencias
      .find(asistencia => asistencia.id === id))
      .subscribe(obj => this.guardarCarrera(obj)
      .subscribe(json => this.servicio.loadGrilla('asistencia')
      .subscribe(res => this.asistencias = res)));
    }
    else {
      let car: asistencia = new asistencia("0", "", "","","");
      this.abrirModal('Nueva Carrera', 'asistencia', 3, car)
      .subscribe(obj => this.guardarCarrera(obj)
      .subscribe(json => this.servicio.loadGrilla('asistencia')
      .subscribe(res => this.asistencias = res)));
    }
  }

  eliminar(id: number) {
    this.abrirModal('Confirmación', '¿ Desea eliminar el registro ?', 1, null).subscribe(
      closed => {
        //const headers = new HttpHeaders({'id' : id.toString()});
        return this.servicio.eliminar(id, "asistencia")
          .subscribe(json => this.servicio.loadGrilla('asistencia')
          .subscribe(res => this.asistencias = res))
      });
  }


  abrirModal(titulo: string, mensaje: string, tipo: number, asistencia: any): Observable<any> {
    const modalRef = 
    this.modalService.open(MyModalComponent, 
      { title: titulo, message: mensaje, tipo: tipo, parametros: asistencia });
    return modalRef.onResult();
  }

  guardarCarrera(obj): Observable<asistencia> {
    if (+obj.id != 0) {
      let param: asistencia = 
      new asistencia(obj.id, obj.fecha_hora, obj.idmateria, obj.idalumno, obj.iddocente);
      //let headers = new HttpHeaders({ 'Content-Type': 'application/json'});
      return this.servicio.addSingleAbm(param, 'asistencia');
    }
    else {
      let param: asistencia = new asistencia(obj.id, obj.fecha_hora, obj.idmateria, obj.idalumno, obj.iddocente);
      //let headers = new HttpHeaders({ 'Content-Type': 'application/json'});
      return this.servicio.addSingleAbm(param, 'asistencia');
    }
  }

  /* cargarGrilla() : Observable<asistencia[]>{
    const headers = new HttpHeaders({ });
    return this.http.get<asistencia[]>(this.baseUrl + 'api/Carrera', { headers: headers });
  } */
  seleccionar(id) {
    let nodo = this.modalService.listAbm;
    while (nodo.getData().name == "asistencia") {
      this.modalService.listAbm = nodo.getNext(); 
      nodo = nodo.getNext();
    }
    this.modalService.listAbm.getData().idasistencia = id;
    this.location.back();
  }
}



