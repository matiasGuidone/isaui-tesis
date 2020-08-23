import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

//ventanas modales
import { ModalService } from '../modal/modal-service.service';
import { convocatoria } from '../clases/convocatoria';
import { abm } from '../clases/abm';
import { PeticionesService } from '../services/peticiones.service';

//ventanas modales

@Component({
  selector: 'app-abm-convocatoria',
  templateUrl: './abm-convocatoria.component.html',
  styleUrls: ['./abm-convocatoria.component.css'] 
})
export class AbmConvocatoriaComponent extends abm<convocatoria> implements OnInit {
 
  constructor( protected location: Location,
               protected modalService: ModalService,
               protected servicio: PeticionesService){
    super(location,modalService,servicio);

    this.nombre = 'convocatoria';
    this.objetoBlanco = new convocatoria({'id':'0','nombre':'','fechainicio':'','fechafin':'','descripcion':'','idmateria':'','estado':''});
    this.modalService.setFiltro(this.objetoBlanco);
    if (this.modalService.listAbm != null && this.modalService.listAbm != undefined) {
      if (this.modalService.listAbm.getData().name == this.nombre) {
        this.editar(this.modalService.listAbm.getData().id, 
        this.modalService.listAbm.getData());
      }
    }
  }

}



