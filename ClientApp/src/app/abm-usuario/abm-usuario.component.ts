import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

//ventanas modales
import { ModalService } from '../modal/modal-service.service';
import { usuario } from '../clases/usuario';
import { abm } from '../clases/abm';
import { PeticionesService } from '../services/peticiones.service';

//ventanas modales

@Component({
  selector: 'app-abm-usuario',
  templateUrl: './abm-usuario.component.html',
  styleUrls: ['./abm-usuario.component.css']
})
export class AbmUsuarioComponent extends abm<usuario> implements OnInit {

  constructor(protected location: Location,
    protected modalService: ModalService,
    protected servicio: PeticionesService) {
    super(location, modalService, servicio);

    this.nombre = 'usuario';
    this.objetoBlanco = new usuario({ 'id': '0', 'nombre': '' ,'codigo':'','codigoayuda':'','correo':''});
    this.modalService.setFiltro(this.objetoBlanco);
    if (this.modalService.listAbm != null && this.modalService.listAbm != undefined) {
      if (this.modalService.listAbm.getData().name == this.nombre) {
        this.editar(this.modalService.listAbm.getData().id,
          this.modalService.listAbm.getData());
      }
    }
  }

}
