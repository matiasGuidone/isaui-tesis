import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

//ventanas modales
import { MyModalComponent } from '../modal/MyModalComponent';
import { ModalService } from '../modal/modal-service.service';
import { Observable } from 'rxjs';
import { localidad } from '../clases/localidad';
import { PeticionesService } from '../services/peticiones.service';

//ventanas modales

@Component({
  selector: 'app-abm-localidad',
  templateUrl: './abm-localidad.component.html',
  styleUrls: ['./abm-localidad.component.css'] 
})
export class AbmlocalidadComponent implements OnInit {

  localidades: localidad[];
  constructor(private location: Location, 
              private modalService: ModalService,
              private servicio: PeticionesService) {

    this.modalService.setFiltro(new localidad("0", "", ""));

    if (this.modalService.listAbm != null && this.modalService.listAbm != undefined) {

      if (this.modalService.listAbm.getData().name == 'localidad') {
        this.editar(this.modalService.listAbm.getData().id, 
        this.modalService.listAbm.getData());
      }

    }
  }

  ngOnInit() {
    this.servicio.loadGrilla('localidad').subscribe(res => this.localidades = res);
  }

  editar(id: number, obj: any) {
    if (obj != null && obj != undefined) {
      let doc: localidad = new localidad(id.toString(), obj.nombre, obj.idprovincia );
      this.abrirModal('Nuevo localidad', 'localidad', 3, doc)
      .subscribe(obj => this.guardarlocalidad(obj)
      .subscribe(json => this.servicio.loadGrilla('localidad')
      .subscribe(res => this.localidades = res)));
    }
    else if (id != 0) {
      this.abrirModal('Editar localidad', 'localidad', 3, this.localidades
      .find(localidad => localidad.id === id)).subscribe(
        obj => this.guardarlocalidad(obj)
        .subscribe(json => this.servicio.loadGrilla('localidad')
        .subscribe(res => this.localidades = res)));
    }
    else {
      let doc: localidad = new localidad( "0", "", "" );
      this.abrirModal('Nuevo localidad', 'localidad', 3, doc)
      .subscribe(obj => this.guardarlocalidad(obj)
        .subscribe(json => this.servicio.loadGrilla('localidad')
          .subscribe(res => this.localidades = res)));
    }
  }

  eliminar(id: number) {
    this.abrirModal('Confirmación', '¿ Desea eliminar el registro ?', 1, null).subscribe(
      closed => {
        return this.servicio.eliminar(id, "localidad")
          .subscribe(json => this.servicio.loadGrilla('localidad')
          .subscribe(res => this.localidades = res))
      });
  }

  abrirModal(titulo: string, mensaje: string, tipo: number, localidad: any): Observable<any> {
    const modalRef = 
    this.modalService.open(MyModalComponent, 
      { title: titulo, message: mensaje, tipo: tipo, parametros: localidad });
    return modalRef.onResult();
  }

  guardarlocalidad(obj): Observable<localidad> {
    if (+obj.id != 0) {
      let param: localidad = 
      new localidad(obj.id, obj.nombre, obj.idprovincia );
      return this.servicio.addSingleAbm(param, 'localidad');
    }
    else {
      let param: localidad = 
      new localidad(obj.id, obj.nombre, obj.idprovincia );
      return this.servicio.addSingleAbm(param, 'localidad');
    }
  }

  seleccionar(id) {
    let nodo = this.modalService.listAbm;
    while (nodo.getData().name == "localidad") {
      this.modalService.listAbm = nodo.getNext();
      nodo = nodo.getNext();
    }
    this.modalService.listAbm.getData().idlocalidad = id;
    this.location.back();
  }
}



