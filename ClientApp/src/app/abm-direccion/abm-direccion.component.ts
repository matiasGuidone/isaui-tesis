import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

//ventanas modales
import { ModalService } from '../modal/modal-service.service';
import { domicilio } from '../clases/domicilio';
import { abm } from '../clases/abm';
import { PeticionesService } from '../services/peticiones.service';
import { AuthLoginService } from '../services/authlogin.service';

//ventanas modales

@Component({
  selector: 'app-abm-direccion',
  templateUrl: './abm-direccion.component.html',
  styleUrls: ['./abm-direccion.component.css'] 
})
export class AbmDireccionComponent extends abm<domicilio> implements OnInit {
 
  constructor( protected location: Location,
               protected modalService: ModalService,
               public servicio: PeticionesService,
               protected logservicio: AuthLoginService){
    super(location,modalService,servicio, logservicio);

    this.nombre = 'domicilio';
    this.objetoBlanco = new domicilio({'id':'0','direccion':'','idlocalidad':''});
    this.modalService.setFiltro(this.objetoBlanco);
    if (this.modalService.listAbm != null && this.modalService.listAbm != undefined) {
      if (this.modalService.listAbm.getData().name == this.nombre) {
        this.editar(this.modalService.listAbm.getData().id, 
        this.modalService.listAbm.getData());
      }
    }
  }

}



