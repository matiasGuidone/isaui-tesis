import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

//ventanas modales
import { ModalService } from '../modal/modal-service.service';
import { formula } from '../clases/formula';
import { abm } from '../clases/abm';
import { PeticionesService } from '../services/peticiones.service';
import { AuthLoginService } from '../services/authlogin.service';

//ventanas modales

@Component({
  selector: 'app-abm-formula',
  templateUrl: './abm-formula.component.html',
  styleUrls: ['./abm-formula.component.css'] 
})
export class AbmformulaComponent extends abm<formula> implements OnInit {
 
  constructor( protected location: Location,
               protected modalService: ModalService,
               protected servicio: PeticionesService,
               protected logservicio: AuthLoginService){
    super(location,modalService,servicio, logservicio);

    this.nombre = 'formula';
    this.objetoBlanco = new formula(0,'', 0,'');
    this.modalService.setFiltro(this.objetoBlanco);
    if (this.modalService.listAbm != null && this.modalService.listAbm != undefined) {
      if (this.modalService.listAbm.getData().name == this.nombre) {
        this.editar(this.modalService.listAbm.getData().id, 
        this.modalService.listAbm.getData());
      }
    }
  }

}



