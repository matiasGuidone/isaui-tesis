import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

//ventanas modales
import { MyModalComponent } from '../modal/MyModalComponent';
import { ModalService } from '../modal/modal-service.service';
import { Observable } from 'rxjs';
import { provincia } from '../clases/provincia';
import { PeticionesService } from '../services/peticiones.service';

//ventanas modales

@Component({
  selector: 'app-abm-provincia',
  templateUrl: './abm-provincia.component.html',
  styleUrls: ['./abm-provincia.component.css'],
  providers:[PeticionesService]
})
export class AbmprovinciaComponent implements OnInit {

  provincias: provincia[];
  constructor(private location: Location, 
              private modalService: ModalService,
              private servicio: PeticionesService) {

    this.modalService.setFiltro(new provincia("0", "", ""));

    if (this.modalService.listAbm != null && this.modalService.listAbm != undefined) {

      if (this.modalService.listAbm.getData().name == 'provincia') {
        this.editar(this.modalService.listAbm.getData().id, 
        this.modalService.listAbm.getData());
      }

    }
  }

  ngOnInit() {
    this.servicio.loadGrilla('provincia').subscribe(res => this.provincias = res);
  }

  editar(id: number, obj: any) {
    if (obj != null && obj != undefined) {
      let doc: provincia = new provincia(id.toString(), obj.nombre, obj.idpais );
      this.abrirModal('Nuevo provincia', 'provincia', 3, doc)
      .subscribe(obj => this.guardarprovincia(obj)
      .subscribe(json => this.servicio.loadGrilla('provincia')
      .subscribe(res => this.provincias = res)));
    }
    else if (id != 0) {
      this.abrirModal('Editar provincia', 'provincia', 3, this.provincias
      .find(provincia => provincia.id === id)).subscribe(
        obj => this.guardarprovincia(obj)
        .subscribe(json => this.servicio.loadGrilla('provincia')
        .subscribe(res => this.provincias = res)));
    }
    else {
      let doc: provincia = new provincia( "0", "", "" );
      this.abrirModal('Nuevo provincia', 'provincia', 3, doc)
      .subscribe(obj => this.guardarprovincia(obj)
        .subscribe(json => this.servicio.loadGrilla('provincia')
          .subscribe(res => this.provincias = res)));
    }
  }

  eliminar(id: number) {
    this.abrirModal('Confirmación', '¿ Desea eliminar el registro ?', 1, null).subscribe(
      closed => {
        return this.servicio.eliminar(id, "provincia")
          .subscribe(json => this.servicio.loadGrilla('provincia')
          .subscribe(res => this.provincias = res))
      });
  }

  abrirModal(titulo: string, mensaje: string, tipo: number, provincia: any): Observable<any> {
    const modalRef = 
    this.modalService.open(MyModalComponent, 
      { title: titulo, message: mensaje, tipo: tipo, parametros: provincia });
    return modalRef.onResult();
  }

  guardarprovincia(obj): Observable<provincia> {
    if (+obj.id != 0) {
      let param: provincia = 
      new provincia(obj.id, obj.nombre, obj.idpais );
      return this.servicio.addSingleAbm(param, 'provincia');
    }
    else {
      let param: provincia = 
      new provincia(obj.id, obj.nombre, obj.idpais );
      return this.servicio.addSingleAbm(param, 'provincia');
    }
  }

  seleccionar(id) {
    let nodo = this.modalService.listAbm;
    while (nodo.getData().name == "provincia") {
      this.modalService.listAbm = nodo.getNext();
      nodo = nodo.getNext();
    }
    this.modalService.listAbm.getData().idprovincia = id;
    this.location.back();
  }
}
