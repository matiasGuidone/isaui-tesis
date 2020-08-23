import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

//ventanas modales
import { ModalService } from '../modal/modal-service.service';
import { carrera } from '../clases/carrera';
import { abm } from '../clases/abm';
import { PeticionesService } from '../services/peticiones.service';

//ventanas modales

@Component({
  selector: 'app-abm-carrera',
  templateUrl: './abm-carrera.component.html',
  styleUrls: ['./abm-carrera.component.css'] 
})
export class AbmCarreraComponent extends abm<carrera> implements OnInit {
 
  constructor( protected location: Location,
               protected modalService: ModalService,
               protected servicio: PeticionesService){
    super(location,modalService,servicio);

    this.nombre = 'carrera';
    this.objetoBlanco = new carrera({'id':'0','nombre':'','descripcion':''});
    this.modalService.setFiltro(this.objetoBlanco);
    if (this.modalService.listAbm != null && this.modalService.listAbm != undefined) {
      if (this.modalService.listAbm.getData().name == this.nombre) {
        this.editar(this.modalService.listAbm.getData().id, 
        this.modalService.listAbm.getData());
      }
    }
  }

}



