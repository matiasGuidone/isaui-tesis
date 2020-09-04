import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';

//ventanas modales
import { ModalService } from '../modal/modal-service.service';
import { roles } from '../clases/roles';
import { abm } from '../clases/abm';
import { PeticionesService } from '../services/peticiones.service';

//ventanas modales

@Component({
  selector: 'app-abm-roles',
  templateUrl: './abm-roles.component.html',
  styleUrls: ['./abm-roles.component.css'] 
})
export class AbmRolesComponent extends abm<roles> implements OnInit {
 
  @Input() esRelacion: boolean = false;
  
  constructor( protected location: Location,
               protected modalService: ModalService,
               protected servicio: PeticionesService){
    super(location,modalService,servicio);

    this.nombre = 'roles';
    this.objetoBlanco = new roles({'id':'0','nombre':''});
    this.modalService.setFiltro(this.objetoBlanco);
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
      this.servicio.loadGrilla('roles').subscribe(res => {
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
  }

  //función para evaluar check
  esSeleccionado(par) {
    if (this.servicio.idsSeleccionados
      .find(id => id === par) == null) { return false; }
    else
      return true;
  }
}



