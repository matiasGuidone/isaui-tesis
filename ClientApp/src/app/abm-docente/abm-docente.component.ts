import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';

//ventanas modales
import { MyModalComponent } from '../modal/MyModalComponent';
import { ModalService } from '../modal/modal-service.service';
import { Observable } from 'rxjs';
import { docente } from '../clases/docente';
import { PeticionesService } from '../services/peticiones.service';

//ventanas modales

@Component({
  selector: 'app-abm-docente',
  templateUrl: './abm-docente.component.html',
  styleUrls: ['./abm-docente.component.css'] 
})
export class AbmDocenteComponent implements OnInit {

  docentes: docente[];
  //se agregan parámetros para el nuevo formulario de relación
  @Input() esRelacion: boolean = false;
  @Output() emisorId = new EventEmitter<string[]>();

  constructor(private location: Location,
    private modalService: ModalService,
    private servicio: PeticionesService) {

    this.modalService.setFiltro(new docente("0", "", "", "", "", "", "", "", ""));

    if (this.modalService.listAbm != null && this.modalService.listAbm != undefined) {

      if (this.modalService.listAbm.getData().name == 'docente') {
        this.editar(this.modalService.listAbm.getData().id,
          this.modalService.listAbm.getData());
      }
    }
  }

  ngOnInit() {
    this.servicio.loadGrilla('docente').subscribe(res => this.docentes = res);
  }

  editar(id: number, obj: any) {
    if (obj != null && obj != undefined) {
      let doc: docente = new docente
        (id.toString(), obj.nombre, obj.apellido, obj.dni,
          obj.correo, obj.telefono, obj.idusuario, obj.iddomicilio, obj.legajo);
      this.abrirModal('Nuevo docente', 'docente', 3, doc)
        .subscribe(obj => this.guardardocente(obj)
          .subscribe(json => this.servicio.loadGrilla('docente')
            .subscribe(res => this.docentes = res)));
    }
    else if (id != 0) {
      this.abrirModal('Editar docente', 'docente', 3, this.docentes
        .find(docente => docente.id === id)).subscribe(
          obj => this.guardardocente(obj)
            .subscribe(json => this.servicio.loadGrilla('docente')
              .subscribe(res => this.docentes = res)));
    }
    else {
      let doc: docente = new docente("0", "", "", "", "", "", "", "", "");
      this.abrirModal('Nuevo docente', 'docente', 3, doc)
        .subscribe(obj => this.guardardocente(obj)
          .subscribe(json => this.servicio.loadGrilla('docente')
            .subscribe(res => this.docentes = res)));
    }
  }

  eliminar(id: number) {
    this.abrirModal('Confirmación', '¿ Desea eliminar el registro ?', 1, null).subscribe(
      closed => {
        return this.servicio.eliminar(id, "docente")
          .subscribe(json => this.servicio.loadGrilla('docente')
            .subscribe(res => this.docentes = res))
      });
  }

  abrirModal(titulo: string, mensaje: string, tipo: number, docente: any): Observable<any> {
    const modalRef =
      this.modalService.open(MyModalComponent,
        { title: titulo, message: mensaje, tipo: tipo, parametros: docente });
    return modalRef.onResult();
  }

  guardardocente(obj): Observable<docente> {
    if (+obj.id != 0) {
      let param: docente =
        new docente(obj.id, obj.nombre, obj.apellido, obj.dni,
          obj.correo, obj.telefono, obj.idusuario, obj.iddomicilio, obj.legajo);
      return this.servicio.addSingleAbm(param, 'docente');
    }
    else {
      let param: docente =
        new docente(obj.id, obj.nombre, obj.apellido, obj.dni,
          obj.correo, obj.telefono, obj.idusuario, obj.iddomicilio, obj.legajo);
      return this.servicio.addSingleAbm(param, 'docente');
    }
  }

  seleccionar(id) {
    if (this.esRelacion) {
      let datos = new Array<string>();
      datos.push(id);
      datos.push(this.docentes.find(docente => docente.id === id).nombre +", "+ 
      this.docentes.find(docente => docente.id === id).apellido);
      this.emisorId.emit(datos);
    }
    else {
      let nodo = this.modalService.listAbm;
      while (nodo.getData().name == "docente") {
        this.modalService.listAbm = nodo.getNext();
        nodo = nodo.getNext();
      }
      this.modalService.listAbm.getData().iddocente = id;
      this.location.back();
    }
  }
}



