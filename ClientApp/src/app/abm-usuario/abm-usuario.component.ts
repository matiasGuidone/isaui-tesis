import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';

//ventanas modales
import { ModalService } from '../modal/modal-service.service';
import { usuario } from '../clases/usuario';
import { abm } from '../clases/abm';
import { PeticionesService } from '../services/peticiones.service';
import { AuthLoginService } from '../services/authlogin.service';

//ventanas modales

@Component({
  selector: 'app-abm-usuario',
  templateUrl: './abm-usuario.component.html',
  styleUrls: ['./abm-usuario.component.css']
})
export class AbmUsuarioComponent extends abm<usuario> implements OnInit {

  @Input() esRelacion: boolean = false;
  @Output() emisorId = new EventEmitter<string[]>();
  
  constructor(protected location: Location,
    protected modalService: ModalService,
    public servicio: PeticionesService,
    protected logservicio: AuthLoginService) {
    super(location, modalService, servicio, logservicio);

    this.nombre = 'usuario';
    this.objetoBlanco = new usuario({ 'id': '0', 'nombre': '' ,'codigo':'','codigoayuda':'','correo':'', 'estado':'' });
    this.modalService.setFiltro(this.objetoBlanco);
    if (this.modalService.listAbm != null && this.modalService.listAbm != undefined) {
      if (this.modalService.listAbm.getData().name == this.nombre) {
        this.editar(this.modalService.listAbm.getData().id,
          this.modalService.listAbm.getData());
      }
    }
  }


  seleccionar(id) {
    if (this.esRelacion) {
      let datos = new Array<string>();
      datos.push(id);
      datos.push(this.lista.find(usuario => usuario.id === id).nombre );
      this.emisorId.emit(datos);
    }
    else {
      let nodo = this.modalService.listAbm;
      while (nodo.getData().name == "usuario") {
        this.modalService.listAbm = nodo.getNext();
        nodo = nodo.getNext();
      }
      this.modalService.listAbm.getData().idusuario = id;
      this.location.back();
      this.location.subscribe(r=>{ this.logservicio.componenteGuard = r.url.toString().substring(1); });
    }
  }

  //función para evaluar check
  esSeleccionado(par) {
    if (this.servicio.idsSeleccionados
      .find(id => id === par) == null) { return false; }
    else
      return true;
  }

}
