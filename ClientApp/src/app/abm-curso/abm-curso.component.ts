import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';

//ventanas modales
import { ModalService } from '../modal/modal-service.service';
import { curso } from '../clases/curso';
import { abm } from '../clases/abm';
import { PeticionesService } from '../services/peticiones.service';

//ventanas modales

@Component({
  selector: 'app-abm-curso',
  templateUrl: './abm-curso.component.html',
  styleUrls: ['./abm-curso.component.css'] 
})
export class AbmCursoComponent extends abm<curso> implements OnInit {
 
  @Input() esRelacion: boolean = false;
  @Output() emisorId = new EventEmitter<string[]>();

  constructor( protected location: Location,
               protected modalService: ModalService,
               protected servicio: PeticionesService){
    super(location,modalService,servicio);

    this.nombre = 'curso';
    this.objetoBlanco = new curso({'id':'0','nombre':'','nivel':'','descripcion':'','idcarrera':''});
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
      datos.push(this.lista.find(curso => curso.id === id).nombre);
      this.emisorId.emit(datos);
    }
    else {
      let nodo = this.modalService.listAbm;
      while (nodo.getData().name == "curso") {
        this.modalService.listAbm = nodo.getNext();
        nodo = nodo.getNext();
      }
      this.modalService.listAbm.getData().idcurso = id;
      this.location.back();
    }
  }

}



