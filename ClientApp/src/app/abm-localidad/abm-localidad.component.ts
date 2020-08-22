import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

//ventanas modales
import { ModalService } from '../modal/modal-service.service';
import { localidad } from '../clases/localidad';
import { abm } from '../clases/abm';
import { PeticionesService } from '../services/peticiones.service';

//ventanas modales

@Component({
  selector: 'app-abm-localidad',
  templateUrl: './abm-localidad.component.html',
  styleUrls: ['./abm-localidad.component.css'] 
})
export class AbmLocalidadComponent extends abm<localidad> implements OnInit {
 
  constructor( protected location: Location,
               protected modalService: ModalService,
               protected servicio: PeticionesService){
    super(location,modalService,servicio);

    this.nombre = 'localidad';
    this.objetoBlanco = new localidad({'id':'0','nombre':'','idprovincia':''});
    this.modalService.setFiltro(this.objetoBlanco);
    if (this.modalService.listAbm != null && this.modalService.listAbm != undefined) {
      if (this.modalService.listAbm.getData().name == this.nombre) {
        this.editar(this.modalService.listAbm.getData().id, 
        this.modalService.listAbm.getData());
      }
    }
  }

}



