import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

//ventanas modales
import { MyModalComponent } from '../modal/MyModalComponent';
import { ModalService } from '../modal/modal-service.service';
import { Observable } from 'rxjs';
import { usuario } from '../clases/usuario';
import { PeticionesService } from '../services/peticiones.service';

//ventanas modales

@Component({
  selector: 'app-abm-usuario',
  templateUrl: './abm-usuario.component.html',
  styleUrls: ['./abm-usuario.component.css'],
  providers:[PeticionesService]
})
export class AbmUsuarioComponent implements OnInit {

  usuarios: usuario[];
  constructor(private location: Location, 
              private modalService: ModalService,
              private servicio: PeticionesService) {
    this.modalService.setFiltro(new usuario("0", "", "","",""));

    if (this.modalService.listAbm != null && this.modalService.listAbm != undefined) {

      if (this.modalService.listAbm.getData().name == 'usuario') {
        this.editar(this.modalService.listAbm.getData().id, 
        this.modalService.listAbm.getData());
      }

    }
  }

  ngOnInit() {
    this.servicio.loadGrilla('usuario').subscribe(res => this.usuarios = res);
  }

  editar(id: number, obj: any) {
    if (obj != null && obj != undefined) {
      let doc: usuario = new usuario(id.toString(), obj.nombre, obj.codigo, obj.codigoayuda, obj.correo );
      this.abrirModal('Nuevo usuario', 'usuario', 3, doc)
      .subscribe(obj => this.guardarusuario(obj)
      .subscribe(json => this.servicio.loadGrilla('usuario')
      .subscribe(res => this.usuarios = res)));
    }
    else if (id != 0) {
      this.abrirModal('Editar usuario', 'usuario', 3, this.usuarios
      .find(usuario => usuario.id === id)).subscribe(
        obj => this.guardarusuario(obj)
        .subscribe(json => this.servicio.loadGrilla('usuario')
        .subscribe(res => this.usuarios = res)));
    }
    else {
      let doc: usuario = new usuario( "0", "", "","", "" );
      this.abrirModal('Nuevo usuario', 'usuario', 3, doc)
      .subscribe(obj => this.guardarusuario(obj)
        .subscribe(json => this.servicio.loadGrilla('usuario')
          .subscribe(res => this.usuarios = res)));
    }
  }

  eliminar(id: number) {
    this.abrirModal('Confirmación', '¿ Desea eliminar el registro ?', 1, null).subscribe(
      closed => {
        return this.servicio.eliminar(id, "usuario")
          .subscribe(json => this.servicio.loadGrilla('usuario')
          .subscribe(res => this.usuarios = res))
      });
  }

  abrirModal(titulo: string, mensaje: string, tipo: number, usuario: any): Observable<any> {
    const modalRef = 
    this.modalService.open(MyModalComponent, 
      { title: titulo, message: mensaje, tipo: tipo, parametros: usuario });
    return modalRef.onResult();
  }

  guardarusuario(obj): Observable<usuario> {
    if (+obj.id != 0) {
      let param: usuario = 
      new usuario(obj.id, obj.nombre, obj.codigo, obj.codigoayuda, obj.correo );
      return this.servicio.addSingleAbm(param, 'usuario');
    }
    else {
      let param: usuario = 
      new usuario(obj.id, obj.nombre, obj.codigo, obj.codigoayuda, obj.correo );
      return this.servicio.addSingleAbm(param, 'usuario');
    }
  }

  seleccionar(id) {
    let nodo = this.modalService.listAbm;
    while (nodo.getData().name == "usuario") {
      this.modalService.listAbm = nodo.getNext();
      nodo = nodo.getNext();
    }
    this.modalService.listAbm.getData().idusuario = id;
    this.location.back();
  }
}
