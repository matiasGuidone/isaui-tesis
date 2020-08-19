import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';

import { MyModalComponent } from '../modal/MyModalComponent';
import { ModalService } from '../modal/modal-service.service';
import { Observable } from 'rxjs';
import { examen } from '../clases/examen';
import { PeticionesService } from '../services/peticiones.service';

@Component({
  selector: 'app-abm-examen',
  templateUrl: './abm-examen.component.html',
  styleUrls: ['./abm-examen.component.css'] 
})
export class AbmExamenComponent implements OnInit {

  examenes: examen[];
  //se agregan parámetros para el nuevo formulario de relación
  @Input() esRelacion: boolean = false;
  @Output() emisorId = new EventEmitter<string[]>();

  constructor(private location: Location,
    private modalService: ModalService,
    private servicio: PeticionesService) {

    this.modalService.setFiltro(new examen("0", "", "", "", ""));

    if (this.modalService.listAbm != null && this.modalService.listAbm != undefined) {

      if (this.modalService.listAbm.getData().name == 'examen') {
        this.editar(this.modalService.listAbm.getData().id,
          this.modalService.listAbm.getData());
      }
    }
  }

  ngOnInit() {
    this.servicio.loadGrilla('examen').subscribe(res => this.examenes = res);
  }

  editar(id: number, obj: any) {
    if (obj != null && obj != undefined) {
      let doc: examen = new examen
        (id.toString(), obj.fecha, obj.observacion, obj.idmateria, obj.tipo);
      this.abrirModal('Nuevo examen', 'examen', 3, doc)
        .subscribe(obj => this.guardardocente(obj)
          .subscribe(json => this.servicio.loadGrilla('examen')
            .subscribe(res => this.examenes = res)));
    }
    else if (id != 0) {
      this.abrirModal('Editar examen', 'examen', 3, this.examenes
        .find(examen => examen.id === id)).subscribe(
          obj => this.guardardocente(obj)
            .subscribe(json => this.servicio.loadGrilla('examen')
              .subscribe(res => this.examenes = res)));
    }
    else {
      let doc: examen = new examen("0", "", "", "", "");
      this.abrirModal('Nuevo examen', 'examen', 3, doc)
        .subscribe(obj => this.guardardocente(obj)
          .subscribe(json => this.servicio.loadGrilla('examen')
            .subscribe(res => this.examenes = res)));
    }
  }

  eliminar(id: number) {
    this.abrirModal('Confirmación', '¿ Desea eliminar el registro ?', 1, null).subscribe(
      closed => {
        return this.servicio.eliminar(id, "examen")
          .subscribe(json => this.servicio.loadGrilla('examen')
            .subscribe(res => this.examenes = res))
      });
  }

  abrirModal(titulo: string, mensaje: string, tipo: number, examen: any): Observable<any> {
    const modalRef =
      this.modalService.open(MyModalComponent,
        { title: titulo, message: mensaje, tipo: tipo, parametros: examen });
    return modalRef.onResult();
  }

  guardardocente(obj): Observable<examen> {
    if (+obj.id != 0) {
      let param: examen =
        new examen(obj.id, obj.fecha, obj.observacion, obj.idmateria, obj.tipo);
      return this.servicio.addSingleAbm(param, 'examen');
    }
    else {
      let param: examen =
        new examen(obj.id, obj.fecha, obj.observacion, obj.idmateria, obj.tipo);
      return this.servicio.addSingleAbm(param, 'examen');
    }
  }

  seleccionar(id) {
    
      let nodo = this.modalService.listAbm;
      while (nodo.getData().name == "examen") {
        this.modalService.listAbm = nodo.getNext();
        nodo = nodo.getNext();
      }
      this.modalService.listAbm.getData().idexamen = id;
      this.location.back();
    
  }
}



