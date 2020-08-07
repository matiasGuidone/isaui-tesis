import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

//ventanas modales
import { MyModalComponent } from '../modal/MyModalComponent';
import { ModalService } from '../modal/modal-service.service';
import { Observable } from 'rxjs';
import { alumno } from '../clases/alumno';
import { PeticionesService } from '../services/peticiones.service';

//ventanas modales

@Component({
  selector: 'app-abm-alumno',
  templateUrl: './abm-alumno.component.html',
  styleUrls: ['./abm-alumno.component.css'],
  providers:[PeticionesService]
})
export class AbmAlumnoComponent implements OnInit {

  alumnos: alumno[];
  constructor(private location: Location, 
              private modalService: ModalService,
              private servicio: PeticionesService) {

    this.modalService.setFiltro(new alumno("0", "", "", "", "","","","","",""));

    if (this.modalService.listAbm != null && this.modalService.listAbm != undefined) {

      if (this.modalService.listAbm.getData().name == 'alumno') {
        this.editar(this.modalService.listAbm.getData().id, 
        this.modalService.listAbm.getData());
      } 
    }
  }

  ngOnInit() {
    this.servicio.loadGrilla('alumno').subscribe(res => this.alumnos = res);
  }

  editar(id: number, obj: any) {
    if (obj != null && obj != undefined) {
      let doc: alumno = new alumno
      (id.toString(), obj.nombre, obj.apellido, obj.numerodoc, obj.condicion,
       obj.correo, obj.fechanac,obj.iddomicilio,obj.idusuario,obj.legajo);
      this.abrirModal('Nuevo alumno', 'alumno', 3, doc)
      .subscribe(obj => this.guardaralumno(obj)
      .subscribe(json => this.servicio.loadGrilla('alumno')
      .subscribe(res => this.alumnos = res)));
    }
    else if (id != 0) {
      this.abrirModal('Editar alumno', 'alumno', 3, this.alumnos
      .find(alumno => alumno.id === id)).subscribe(
        obj => this.guardaralumno(obj)
        .subscribe(json => this.servicio.loadGrilla('alumno')
        .subscribe(res => this.alumnos = res)));
    }
    else {
      let doc: alumno = new alumno("0", "", "", "", "", "", "", "", "", "");
      this.abrirModal('Nuevo alumno', 'alumno', 3, doc)
      .subscribe(obj => this.guardaralumno(obj)
        .subscribe(json => this.servicio.loadGrilla('alumno')
          .subscribe(res => this.alumnos = res)));
    }
  }

  eliminar(id: number) {
    this.abrirModal('Confirmación', '¿ Desea eliminar el registro ?', 1, null).subscribe(
      closed => {
        return this.servicio.eliminar(id, "alumno")
          .subscribe(json => this.servicio.loadGrilla('alumno')
          .subscribe(res => this.alumnos = res))
      });
  }

  abrirModal(titulo: string, mensaje: string, tipo: number, alumno: any): Observable<any> {
    const modalRef = 
    this.modalService.open(MyModalComponent, 
      { title: titulo, message: mensaje, tipo: tipo, parametros: alumno });
    return modalRef.onResult();
  }

  guardaralumno(obj): Observable<alumno> {
    if (+obj.id != 0) {
      let param: alumno = 
      new alumno(obj.id, obj.nombre, obj.apellido, obj.numerodoc, obj.condicion,
       obj.correo, obj.fechanac,obj.iddomicilio,obj.idusuario,obj.legajo);
      return this.servicio.addSingleAbm(param, 'alumno');
    }
    else {
      let param: alumno = 
      new alumno(obj.id, obj.nombre, obj.apellido, obj.numerodoc, obj.condicion,
      obj.correo, obj.fechanac,obj.iddomicilio,obj.idusuario,obj.legajo);
      return this.servicio.addSingleAbm(param, 'alumno');
    }
  }

  seleccionar(id) {
    let nodo = this.modalService.listAbm;
    while (nodo.getData().name == "alumno") {
      this.modalService.listAbm = nodo.getNext();
      nodo = nodo.getNext();
    }
    this.modalService.listAbm.getData().idalumno = id;
    this.location.back();
  }
}



