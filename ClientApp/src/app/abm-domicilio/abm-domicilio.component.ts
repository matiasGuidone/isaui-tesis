import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

//ventanas modales
import { MyModalComponent } from '../modal/MyModalComponent';
import { ModalService } from '../modal/modal-service.service';
import { Observable } from 'rxjs';
import { domicilio } from '../clases/domicilio';
import { PeticionesService } from '../services/peticiones.service';

//ventanas modales

@Component({
  selector: 'app-abm-domicilio',
  templateUrl: './abm-domicilio.component.html',
  styleUrls: ['./abm-domicilio.component.css'],
  providers:[PeticionesService]
})
export class AbmdomicilioComponent implements OnInit {

  domicilios: domicilio[];
  constructor(private location: Location, 
              private modalService: ModalService,
              private servicio: PeticionesService) {

    this.modalService.setFiltro(new domicilio("0", "", "" ));

    if (this.modalService.listAbm != null && this.modalService.listAbm != undefined) {

      if (this.modalService.listAbm.getData().name == 'domicilio') {
        this.editar(this.modalService.listAbm.getData().id, 
        this.modalService.listAbm.getData());
      }

    }
  }

  ngOnInit() {
    this.servicio.loadGrilla('domicilio').subscribe(res => this.domicilios = res);
  }

  editar(id: number, obj: any) {
    if (obj != null && obj != undefined) {
      let doc: domicilio = new domicilio(id.toString(), obj.direccion, obj.idlocalidad );
      this.abrirModal('Nuevo domicilio', 'domicilio', 3, doc)
      .subscribe(obj => this.guardardomicilio(obj)
      .subscribe(json => this.servicio.loadGrilla('domicilio')
      .subscribe(res => this.domicilios = res)));
    }
    else if (id != 0) {
      this.abrirModal('Editar domicilio', 'domicilio', 3, this.domicilios
      .find(domicilio => domicilio.id === id)).subscribe(
        obj => this.guardardomicilio(obj)
        .subscribe(json => this.servicio.loadGrilla('domicilio')
        .subscribe(res => this.domicilios = res)));
    }
    else {
      let doc: domicilio = new domicilio("0", "", "" );
      this.abrirModal('Nuevo domicilio', 'domicilio', 3, doc)
      .subscribe(obj => this.guardardomicilio(obj)
        .subscribe(json => this.servicio.loadGrilla('domicilio')
          .subscribe(res => this.domicilios = res)));
    }
  }

  eliminar(id: number) {
    this.abrirModal('Confirmación', '¿ Desea eliminar el registro ?', 1, null).subscribe(
      closed => {
        return this.servicio.eliminar(id, "domicilio")
          .subscribe(json => this.servicio.loadGrilla('domicilio')
          .subscribe(res => this.domicilios = res))
      });
  }

  abrirModal(titulo: string, mensaje: string, tipo: number, domicilio: any): Observable<any> {
    const modalRef = 
    this.modalService.open(MyModalComponent, 
      { title: titulo, message: mensaje, tipo: tipo, parametros: domicilio });
    return modalRef.onResult();
  }

  guardardomicilio(obj): Observable<domicilio> {
    if (+obj.id != 0) {
      let param: domicilio = 
      new domicilio(obj.id, obj.direccion, obj.idlocalidad );
      return this.servicio.addSingleAbm(param, 'domicilio');
    }
    else {
      let param: domicilio = 
      new domicilio(obj.id, obj.direccion, obj.idlocalidad );
      return this.servicio.addSingleAbm(param, 'domicilio');
    }
  }

  seleccionar(id) {
    let nodo = this.modalService.listAbm;
    while (nodo.getData().name == "domicilio") {
      this.modalService.listAbm = nodo.getNext();
      nodo = nodo.getNext();
    }
    this.modalService.listAbm.getData().iddomicilio = id;
    this.location.back();
  }
}



