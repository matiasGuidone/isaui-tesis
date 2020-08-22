import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

//ventanas modales
import { ModalService } from '../modal/modal-service.service';
import { ciclolectivo } from '../clases/ciclolectivo';
import { abm } from '../clases/abm';
import { PeticionesService } from '../services/peticiones.service';

//ventanas modales

@Component({
  selector: 'app-abm-ciclolectivo',
  templateUrl: './abm-ciclolectivo.component.html',
  styleUrls: ['./abm-ciclolectivo.component.css'] 
})
export class AbmCiclolectivoComponent extends abm<ciclolectivo> implements OnInit {
 
  constructor( protected location: Location,
               protected modalService: ModalService,
               protected servicio: PeticionesService){
    super(location,modalService,servicio);

    this.nombre = 'ciclolectivo';
    this.objetoBlanco = new ciclolectivo({'id':'0','nombre':'','descripcion':'','fechainicio':''});
    this.modalService.setFiltro(this.objetoBlanco);
    if (this.modalService.listAbm != null && this.modalService.listAbm != undefined) {
      if (this.modalService.listAbm.getData().name == this.nombre) {
        this.editar(this.modalService.listAbm.getData().id, 
        this.modalService.listAbm.getData());
      }
    }
  }

}



