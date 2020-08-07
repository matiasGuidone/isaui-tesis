import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

//ventanas modales
import { MyModalComponent } from '../modal/MyModalComponent';
import { ModalService } from '../modal/modal-service.service';
import { Observable } from 'rxjs';
import { menu } from '../clases/menu';
import { PeticionesService } from '../services/peticiones.service';

//ventanas modales

@Component({
  selector: 'app-abm-menu',
  templateUrl: './abm-menu.component.html',
  styleUrls: ['./abm-menu.component.css'],
  providers:[PeticionesService]
})
export class AbmMenuComponent implements OnInit {

  menus: menu[];
  constructor(private location: Location, 
              private modalService: ModalService,
              private servicio: PeticionesService) {

    this.modalService.setFiltro(new menu("0", "", "",""));

    if (this.modalService.listAbm != null && this.modalService.listAbm != undefined) {

      if (this.modalService.listAbm.getData().name == 'menu') {
        this.editar(this.modalService.listAbm.getData().id, 
        this.modalService.listAbm.getData());
      }

    }
  }

  ngOnInit() {
    this.servicio.loadGrilla('menu').subscribe(res => this.menus = res);
  }

  editar(id: number, obj: any) {
    if (obj != null && obj != undefined) {
      let doc: menu = new menu(id.toString(), obj.nombre, obj.componente, obj.tipo );
      this.abrirModal('Nuevo menu', 'menu', 3, doc)
      .subscribe(obj => this.guardarmenu(obj)
      .subscribe(json => this.servicio.loadGrilla('menu')
      .subscribe(res => this.menus = res)));
    }
    else if (id != 0) {
      this.abrirModal('Editar menu', 'menu', 3, this.menus
      .find(menu => menu.id === id)).subscribe(
        obj => this.guardarmenu(obj)
        .subscribe(json => this.servicio.loadGrilla('menu')
        .subscribe(res => this.menus = res)));
    }
    else {
      let doc: menu = new menu( "0", "", "" ,"");
      this.abrirModal('Nuevo menu', 'menu', 3, doc)
      .subscribe(obj => this.guardarmenu(obj)
        .subscribe(json => this.servicio.loadGrilla('menu')
          .subscribe(res => this.menus = res)));
    }
  }

  eliminar(id: number) {
    this.abrirModal('Confirmación', '¿ Desea eliminar el registro ?', 1, null).subscribe(
      closed => {
        return this.servicio.eliminar(id, "menu")
          .subscribe(json => this.servicio.loadGrilla('menu')
          .subscribe(res => this.menus = res))
      });
  }

  abrirModal(titulo: string, mensaje: string, tipo: number, menu: any): Observable<any> {
    const modalRef = 
    this.modalService.open(MyModalComponent, 
      { title: titulo, message: mensaje, tipo: tipo, parametros: menu });
    return modalRef.onResult();
  }

  guardarmenu(obj): Observable<menu> {
    if (+obj.id != 0) {
      let param: menu = 
      new menu(obj.id, obj.nombre, obj.componente, obj.tipo );
      return this.servicio.addSingleAbm(param, 'menu');
    }
    else {
      let param: menu = 
      new menu(obj.id, obj.nombre, obj.componente, obj.tipo );
      return this.servicio.addSingleAbm(param, 'menu');
    }
  }

  seleccionar(id) {
    let nodo = this.modalService.listAbm;
    while (nodo.getData().name == "menu") {
      this.modalService.listAbm = nodo.getNext();
      nodo = nodo.getNext();
    }
    this.modalService.listAbm.getData().idmenu = id;
    this.location.back();
  }
}



