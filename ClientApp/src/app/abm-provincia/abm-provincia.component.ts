import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

//ventanas modales
import { ModalService } from '../modal/modal-service.service';
import { provincia } from '../clases/provincia';
import { abm } from '../clases/abm';
import { PeticionesService } from '../services/peticiones.service';
import { AuthLoginService } from '../services/authlogin.service';

//ventanas modales

@Component({
  selector: 'app-abm-provincia',
  templateUrl: './abm-provincia.component.html',
  styleUrls: ['./abm-provincia.component.css'] 
})
export class AbmProvinciaComponent extends abm<provincia> implements OnInit {
 
  constructor( protected location: Location,
               protected modalService: ModalService,
               public servicio: PeticionesService,
               protected logservicio: AuthLoginService){
    super(location,modalService,servicio, logservicio);

    this.nombre = 'provincia';
    this.objetoBlanco = new provincia({'id':'0','nombre':'','idpais':''});
    this.modalService.setFiltro(this.objetoBlanco);
    if (this.modalService.listAbm != null && this.modalService.listAbm != undefined) {
      if (this.modalService.listAbm.getData().name == this.nombre) {
        this.editar(this.modalService.listAbm.getData().id, 
        this.modalService.listAbm.getData());
      }
    }
  }

}



