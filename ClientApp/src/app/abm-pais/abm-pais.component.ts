import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

//ventanas modales
import { MyModalComponent } from '../modal/MyModalComponent';
import { ModalService } from '../modal/modal-service.service';
import { Observable } from 'rxjs';
import { pais } from '../clases/pais';
import { PeticionesService } from '../services/peticiones.service';

//ventanas modales

@Component({
  selector: 'app-abm-pais',
  templateUrl: './abm-pais.component.html',
  styleUrls: ['./abm-pais.component.css'] 
})
export class AbmpaisComponent implements OnInit {

  paises: pais[];
  constructor(private location: Location, 
              private modalService: ModalService,
              private servicio: PeticionesService) {

    this.modalService.setFiltro(new pais("0", "" ));

    if (this.modalService.listAbm != null && this.modalService.listAbm != undefined) {

      if (this.modalService.listAbm.getData().name == 'pais') {
        this.editar(this.modalService.listAbm.getData().id, 
        this.modalService.listAbm.getData());
      }

    }
  }

  ngOnInit() {
    this.servicio.loadGrilla('pais').subscribe(res => this.paises = res);
  }

  editar(id: number, obj: any) {
    if (obj != null && obj != undefined) {
      let doc: pais = new pais(id.toString(), obj.nombre  );
      this.abrirModal('Nuevo pais', 'pais', 3, doc)
      .subscribe(obj => this.guardarpais(obj)
      .subscribe(json => this.servicio.loadGrilla('pais')
      .subscribe(res => this.paises = res)));
    }
    else if (id != 0) {
      this.abrirModal('Editar pais', 'pais', 3, this.paises
      .find(pais => pais.id === id)).subscribe(
        obj => this.guardarpais(obj)
        .subscribe(json => this.servicio.loadGrilla('pais')
        .subscribe(res => this.paises = res)));
    }
    else {
      let doc: pais = new pais( "0", ""  );
      this.abrirModal('Nuevo pais', 'pais', 3, doc)
      .subscribe(obj => this.guardarpais(obj)
        .subscribe(json => this.servicio.loadGrilla('pais')
          .subscribe(res => this.paises = res)));
    }
  }

  eliminar(id: number) {
    this.abrirModal('Confirmación', '¿ Desea eliminar el registro ?', 1, null).subscribe(
      closed => {
        return this.servicio.eliminar(id, "pais")
          .subscribe(json => this.servicio.loadGrilla('pais')
          .subscribe(res => this.paises = res))
      });
  }

  abrirModal(titulo: string, mensaje: string, tipo: number, pais: any): Observable<any> {
    const modalRef = 
    this.modalService.open(MyModalComponent, 
      { title: titulo, message: mensaje, tipo: tipo, parametros: pais });
    return modalRef.onResult();
  }

  guardarpais(obj): Observable<pais> {
    if (+obj.id != 0) {
      let param: pais = 
      new pais(obj.id, obj.nombre  );
      return this.servicio.addSingleAbm(param, 'pais');
    }
    else {
      let param: pais = 
      new pais(obj.id, obj.nombre );
      return this.servicio.addSingleAbm(param, 'pais');
    }
  }

  seleccionar(id) {
    let nodo = this.modalService.listAbm;
    while (nodo.getData().name == "pais") {
      this.modalService.listAbm = nodo.getNext();
      nodo = nodo.getNext();
    }
    this.modalService.listAbm.getData().idpais = id;
    this.location.back();
  }
}
