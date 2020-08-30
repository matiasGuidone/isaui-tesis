import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';

//ventanas modales
import { MyModalComponent } from '../modal/MyModalComponent';
import { ModalService } from '../modal/modal-service.service';
import { Observable } from 'rxjs';
import { alumno } from '../clases/alumno';
import { PeticionesService } from '../services/peticiones.service';
import { abm } from '../clases/abm';

//ventanas modales

@Component({
  selector: 'app-abm-alumno',
  templateUrl: './abm-alumno.component.html',
  styleUrls: ['./abm-alumno.component.css']
})
export class AbmAlumnoComponent extends abm<alumno> implements OnInit {
  // estilo: string = "table-responsive";
  @Input() alumnos: alumno[] = new Array<alumno>();

  //se agregan parámetros para el nuevo formulario de relación
  @Input() esRelacion: boolean = false;
  @Input() esRelacionCurso: boolean = false;
  @Output() emisorId = new EventEmitter<string[]>();

  constructor(protected location: Location,
    protected modalService: ModalService,
    protected servicio: PeticionesService) {
    super(location, modalService, servicio);
    this.nombre = 'alumno';
    this.objetoBlanco = new alumno("0", "", "", "", "", "", "", "", "", "");
    this.modalService.setFiltro(this.objetoBlanco);
    if (this.modalService.listAbm != null && this.modalService.listAbm != undefined) {
      if (this.modalService.listAbm.getData().name == this.nombre) {
        this.editar(this.modalService.listAbm.getData().id,
          this.modalService.listAbm.getData());
      }
    }
  }

  ngOnInit() {

    if (!this.esRelacionCurso) {
      this.modalService.setFiltro(this.objetoBlanco);
      this.servicio.loadGrilla('alumno').subscribe(res => {
        this.lista = res;
      });
    }

  }


  seleccionar(id) {
    if (this.esRelacion) {
      let datos = new Array<string>();
      datos.push(id);
      datos.push(this.lista.find(alumno => alumno.id === id).nombre + ", " +
      this.lista.find(alumno => alumno.id === id).apellido);
      this.emisorId.emit(datos);
    }
    else {
      let nodo = this.modalService.listAbm;
      while (nodo.getData().name == "alumno") {
        this.modalService.listAbm = nodo.getNext();
        nodo = nodo.getNext();
      }
      this.modalService.listAbm.getData().idalumno = id;
      this.location.back();
    }
  }
  //evento botón aceptar
  aceptarSeleccion() {
    this.servicio.idsSeleccionados = new Array<number>();
    for (let i = 0; i < this.lista.length; i++) {
      //si está marcado el elemento
      var n = <HTMLInputElement>document.getElementById("chk-" + this.lista[i].id);
      if (n.checked == true) {
        this.servicio.idsSeleccionados.push(this.lista[i].id);
      }
    }
    this.location.back();
  }

  //función para evaluar check
  esSeleccionado(par) {
    if (this.servicio.idsSeleccionados
      .find(id => id === par) == null) { return false; }
    else
      return true;
  }
}



