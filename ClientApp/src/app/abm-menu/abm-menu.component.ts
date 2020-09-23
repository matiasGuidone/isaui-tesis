import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

//ventanas modales
import { ModalService } from '../modal/modal-service.service';
import { menu } from '../clases/menu';
import { abm } from '../clases/abm';
import { PeticionesService } from '../services/peticiones.service';

//ventanas modales

@Component({
  selector: 'app-abm-menu',
  templateUrl: './abm-menu.component.html',
  styleUrls: ['./abm-menu.component.css'] 
})
export class AbmMenuComponent extends abm<menu> implements OnInit {
 
  constructor( protected location: Location,
               protected modalService: ModalService,
               protected servicio: PeticionesService){
    super(location,modalService,servicio);
    this.nombre = 'menu';
    this.objetoBlanco = new menu({'id':'0','nombre':'','tipo':'','componente':'','idroles':'', 'controles': ''});
    this.modalService.setFiltro(this.objetoBlanco);
    if (this.modalService.listAbm != null && this.modalService.listAbm != undefined) {
      if (this.modalService.listAbm.getData().name == this.nombre) {
        this.editar(this.modalService.listAbm.getData().id, 
        this.modalService.listAbm.getData());
      }
    }
  }
}



