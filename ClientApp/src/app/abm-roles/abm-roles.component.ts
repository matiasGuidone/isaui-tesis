import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { MyModalComponent } from '../modal/MyModalComponent';
import { ModalService } from '../modal/modal-service.service';
import { Observable } from 'rxjs';
import { roles } from '../clases/roles';
import { PeticionesService } from '../services/peticiones.service';

@Component({
  selector: 'app-abm-roles',
  templateUrl: './abm-roles.component.html',
  styleUrls: ['./abm-roles.component.css'],
  providers:[ PeticionesService]
})
export class AbmRolesComponent implements OnInit {
  roless: roles[];
  constructor(private location: Location, 
              private modalService: ModalService,
              private servicio: PeticionesService) {

    this.modalService.setFiltro(new roles("0", ""));

    if (this.modalService.listAbm != null && this.modalService.listAbm != undefined) {

      if (this.modalService.listAbm.getData().name == 'roles') {
        this.editar(this.modalService.listAbm.getData().id, 
        this.modalService.listAbm.getData());
      } 
    }
  }

  ngOnInit() {
    this.servicio.loadGrilla('roles').subscribe(res => this.roless = res);
  }

  editar(id: number, obj: any) {
    if (obj != null && obj != undefined) {
      let doc: roles = new roles
      (id.toString(), obj.nombre);
      this.abrirModal('Nuevo roles', 'roles', 3, doc)
      .subscribe(obj => this.guardaralumno(obj)
      .subscribe(json => this.servicio.loadGrilla('roles')
      .subscribe(res => this.roless = res)));
    }
    else if (id != 0) {
      this.abrirModal('Editar roles', 'roles', 3, this.roless
      .find(roles => roles.id === id)).subscribe(
        obj => this.guardaralumno(obj)
        .subscribe(json => this.servicio.loadGrilla('roles')
        .subscribe(res => this.roless = res)));
    }
    else {
      let doc: roles = new roles("0", "");
      this.abrirModal('Nuevo roles', 'roles', 3, doc)
      .subscribe(obj => this.guardaralumno(obj)
        .subscribe(json => this.servicio.loadGrilla('roles')
          .subscribe(res => this.roless = res)));
    }
  }

  eliminar(id: number) {
    this.abrirModal('Confirmación', '¿ Desea eliminar el registro ?', 1, null).subscribe(
      closed => {
        return this.servicio.eliminar(id, "roles")
          .subscribe(json => this.servicio.loadGrilla('roles')
          .subscribe(res => this.roless = res))
      });
  }

  abrirModal(titulo: string, mensaje: string, tipo: number, roles: any): Observable<any> {
    const modalRef = 
    this.modalService.open(MyModalComponent, 
      { title: titulo, message: mensaje, tipo: tipo, parametros: roles });
    return modalRef.onResult();
  }

  guardaralumno(obj): Observable<roles> {
    if (+obj.id != 0) {
      let param: roles = 
      new roles(obj.id, obj.nombre);
      return this.servicio.addSingleAbm(param, 'roles');
    }
    else {
      let param: roles = 
      new roles(obj.id, obj.nombre);
      return this.servicio.addSingleAbm(param, 'roles');
    }
  }

  seleccionar(id) {
    let nodo = this.modalService.listAbm;
    while (nodo.getData().name == "roles") {
      this.modalService.listAbm = nodo.getNext();
      nodo = nodo.getNext();
    }
    this.modalService.listAbm.getData().idalumno = id;
    this.location.back();
  }

}
