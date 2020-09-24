import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';

//ventanas modales
import { MyModalComponent } from '../modal/MyModalComponent';
import { ModalService } from '../modal/modal-service.service';
import { Observable } from 'rxjs';
import { materia } from '../clases/materia';
import { PeticionesService } from '../services/peticiones.service';
import { Router } from '@angular/router';
import { abm } from '../clases/abm';
import { AuthLoginService } from '../services/authlogin.service';

//ventanas modales

@Component({
  selector: 'app-abm-materia',
  templateUrl: './abm-materia.component.html',
  styleUrls: ['./abm-materia.component.css']
})
export class AbmMateriaComponent extends abm<materia> implements OnInit {

  @Input() esRelacion: boolean = false;

  constructor(protected location: Location,
    protected modalService: ModalService,
    protected servicio: PeticionesService,
    protected logservicio: AuthLoginService) {
    super(location, modalService, servicio, logservicio);

    this.nombre = 'materia';
    this.objetoBlanco = new materia({'id':"0", 'nombre': "", 'idcurso':""});

    if (this.modalService.listAbm != null && this.modalService.listAbm != undefined) {
      if (this.modalService.listAbm.getData().name == this.nombre) {
        this.editar(this.modalService.listAbm.getData().id,
          this.modalService.listAbm.getData());
      }
    }
  }

  ngOnInit() {

    if (!this.esRelacion) {
      this.modalService.setFiltro(this.objetoBlanco);
      this.servicio.loadGrilla('materia').subscribe(res => {
        this.lista = res;
      });
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
    this.location.subscribe(r=>{ this.logservicio.componenteGuard = r.url.toString().substring(1); });
  }

  //función para evaluar check
  esSeleccionado(par) {
    if (this.servicio.idsSeleccionados
      .find(id => id === par) == null) { return false; }
    else
      return true;
  }
}



