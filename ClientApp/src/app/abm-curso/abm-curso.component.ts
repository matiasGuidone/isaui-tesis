import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

//ventanas modales
import { MyModalComponent } from '../modal/MyModalComponent';
import { ModalService } from '../modal/modal-service.service';
import { Observable } from 'rxjs';
import { curso } from '../clases/curso';
import { PeticionesService } from '../services/peticiones.service';

//ventanas modales

@Component({
  selector: 'app-abm-curso',
  templateUrl: './abm-curso.component.html',
  styleUrls: ['./abm-curso.component.css'],
  providers:[PeticionesService]
})
export class AbmCursoComponent implements OnInit {

  cursos: curso[];
  constructor(private location: Location, 
              private modalService: ModalService,
              private servicio: PeticionesService) {

    this.modalService.setFiltro(new curso("0", "", "", "", ""));

    if (this.modalService.listAbm != null && this.modalService.listAbm != undefined) {

      if (this.modalService.listAbm.getData().name == 'curso') {
        this.editar(this.modalService.listAbm.getData().id, 
        this.modalService.listAbm.getData());
      } 
    }
  }

  ngOnInit() {
    this.servicio.loadGrilla('curso').subscribe(res => this.cursos = res);
  }

  editar(id: number, obj: any) {
    if (obj != null && obj != undefined) {
      let doc: curso = new curso
      (id.toString(), obj.descripcion, obj.nivel, obj.nombre, obj.idcarrera);
      this.abrirModal('Nuevo curso', 'curso', 3, doc)
      .subscribe(obj => this.guardarcurso(obj)
      .subscribe(json => this.servicio.loadGrilla('curso')
      .subscribe(res => this.cursos = res)));
    }
    else if (id != 0) {
      this.abrirModal('Editar curso', 'curso', 3, this.cursos
      .find(curso => curso.id === id)).subscribe(
        obj => this.guardarcurso(obj)
        .subscribe(json => this.servicio.loadGrilla('curso')
        .subscribe(res => this.cursos = res)));
    }
    else {
      let doc: curso = new curso("0", "", "", "", "");
      this.abrirModal('Nuevo curso', 'curso', 3, doc)
      .subscribe(obj => this.guardarcurso(obj)
        .subscribe(json => this.servicio.loadGrilla('curso')
          .subscribe(res => this.cursos = res)));
    }
  }

  eliminar(id: number) {
    this.abrirModal('Confirmación', '¿ Desea eliminar el registro ?', 1, null).subscribe(
      closed => {
        return this.servicio.eliminar(id, "curso")
          .subscribe(json => this.servicio.loadGrilla('curso')
          .subscribe(res => this.cursos = res))
      });
  }

  abrirModal(titulo: string, mensaje: string, tipo: number, curso: any): Observable<any> {
    const modalRef = 
    this.modalService.open(MyModalComponent, 
      { title: titulo, message: mensaje, tipo: tipo, parametros: curso });
    return modalRef.onResult();
  }

  guardarcurso(obj): Observable<curso> {
    if (+obj.id != 0) {
      let param: curso = 
      new curso(obj.id, obj.descripcion, obj.nivel, obj.nombre, obj.idcarrera);
      return this.servicio.addSingleAbm(param, 'curso');
    }
    else {
      let param: curso = 
      new curso(obj.id, obj.descripcion, obj.nivel, obj.nombre, obj.idcarrera);
      return this.servicio.addSingleAbm(param, 'curso');
    }
  }

  seleccionar(id) {
    let nodo = this.modalService.listAbm;
    while (nodo.getData().name == "curso") {
      this.modalService.listAbm = nodo.getNext();
      nodo = nodo.getNext();
    }
    this.modalService.listAbm.getData().idcurso = id;
    this.location.back();
  }
}






