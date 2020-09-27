import { Component, OnInit } from '@angular/core';
import { mensaje } from '../clases/mensaje';
import { Location } from '@angular/common';
import { ModalService } from '../modal/modal-service.service';
import { abm } from '../clases/abm';
import { PeticionesService } from '../services/peticiones.service';
import { AuthLoginService } from '../services/authlogin.service';


@Component({
  selector: 'app-abm-mensaje',
  templateUrl: './abm-mensaje.component.html',
  styleUrls: ['./abm-mensaje.component.css']
})
export class AbmMensajeComponent extends abm<mensaje> implements OnInit {
 
  constructor( protected location: Location,
               protected modalService: ModalService,
               protected servicio: PeticionesService,
               protected logservicio: AuthLoginService){
    super(location,modalService,servicio, logservicio);

    this.nombre = 'mensaje';
    this.objetoBlanco = new mensaje({'id':'0','fechainicio':'','fechafin':'','titulo':'','mensaje':'','idmateria':'','iddocente':''});
    this.modalService.setFiltro(this.objetoBlanco);
    if (this.modalService.listAbm != null && this.modalService.listAbm != undefined) {
      if (this.modalService.listAbm.getData().name == this.nombre) {
        this.editar(this.modalService.listAbm.getData().id, 
        this.modalService.listAbm.getData());
      }
    }
  }

}
