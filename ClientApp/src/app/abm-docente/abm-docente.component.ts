import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';

//ventanas modales
import { ModalService } from '../modal/modal-service.service';
import { docente } from '../clases/docente';
import { PeticionesService } from '../services/peticiones.service';
import { abm } from '../clases/abm';

//ventanas modales

@Component({
  selector: 'app-abm-docente',
  templateUrl: './abm-docente.component.html',
  styleUrls: ['./abm-docente.component.css']
})
export class AbmDocenteComponent extends abm<docente> implements OnInit {

  @Input() esRelacion: boolean = false;
  @Output() emisorId = new EventEmitter<string[]>();

  constructor(protected location: Location,
    protected modalService: ModalService,
    protected servicio: PeticionesService) {
    super(location, modalService, servicio);
    this.nombre = 'docente';
    this.objetoBlanco = new docente("0", "", "", "", "", "", "", "", "");
    this.modalService.setFiltro(this.objetoBlanco);
    if (this.modalService.listAbm != null && this.modalService.listAbm != undefined) {
      if (this.modalService.listAbm.getData().name == this.nombre) {
        this.editar(this.modalService.listAbm.getData().id,
          this.modalService.listAbm.getData());
      }
    }
  }


  seleccionar(id) {
    if (this.esRelacion) {
      let datos = new Array<string>();
      datos.push(id);
      datos.push(this.lista.find(docente => docente.id === id).nombre + ", " +
      this.lista.find(docente => docente.id === id).apellido);
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

  //función para evaluar check
  esSeleccionado(par) {
    if (this.servicio.idsSeleccionados
      .find(id => id === par) == null) { return false; }
    else
      return true;
  }
}



