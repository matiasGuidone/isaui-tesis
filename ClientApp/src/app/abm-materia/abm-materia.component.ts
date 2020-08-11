import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';

//ventanas modales
import { MyModalComponent } from '../modal/MyModalComponent';
import { ModalService } from '../modal/modal-service.service';
import { Observable } from 'rxjs';
import { materia } from '../clases/materia';
import { PeticionesService } from '../services/peticiones.service';
import { Router } from '@angular/router';

//ventanas modales

@Component({
  selector: 'app-abm-materia',
  templateUrl: './abm-materia.component.html',
  styleUrls: ['./abm-materia.component.css'] 
})
export class AbmMateriaComponent implements OnInit {

 //variables para relaciones
  @Input() materias: materia[];
  @Input() esRelacion: boolean = false;

  constructor(private location: Location, 
              private modalService: ModalService,
              private servicio: PeticionesService,
              private router : Router) {

    if (this.modalService.listAbm != null && this.modalService.listAbm != undefined) {

      if (this.modalService.listAbm.getData().name == 'materia') {
        this.editar(this.modalService.listAbm.getData().id, 
        this.modalService.listAbm.getData());
      } 
    }
  }

  ngOnInit() {
   
    if(!this.esRelacion){
    this.modalService.setFiltro(new materia("0", "", "", "", ""));
      this.servicio.loadGrilla('materia').subscribe(res => {
        this.materias = res;
      });}
    
  }

  editar(id: number, obj: any = null) {
    if (obj != null && obj != undefined) {
      let doc: materia = new materia
      (id.toString(), obj.nombre, obj.horas, obj.turno, obj.idcurso);
      this.abrirModal('Nuevo materia', 'materia', 3, doc)
      .subscribe(obj => this.guardarmateria(obj)
      .subscribe(json => this.servicio.loadGrilla('materia')
      .subscribe(res => this.materias = res)));
    }
    else if (id != 0) {
      this.abrirModal('Editar materia', 'materia', 3, this.materias
      .find(materia => materia.id === id)).subscribe(
        obj => this.guardarmateria(obj)
        .subscribe(json => this.servicio.loadGrilla('materia')
        .subscribe(res => this.materias = res)));
    }
    else {
      let doc: materia = new materia("0", "", "", "", "");
      this.abrirModal('Nuevo materia', 'materia', 3, doc)
      .subscribe(obj => this.guardarmateria(obj)
        .subscribe(json => this.servicio.loadGrilla('materia')
          .subscribe(res => this.materias = res)));
    }
  }

  eliminar(id: number) {
    this.abrirModal('Confirmación', '¿ Desea eliminar el registro ?', 1, null).subscribe(
      closed => {
        return this.servicio.eliminar(id, "materia")
          .subscribe(json => this.servicio.loadGrilla('materia')
          .subscribe(res => this.materias = res))
      });
  }

  abrirModal(titulo: string, mensaje: string, tipo: number, materia: any): Observable<any> {
    const modalRef = 
    this.modalService.open(MyModalComponent, 
      { title: titulo, message: mensaje, tipo: tipo, parametros: materia });
    return modalRef.onResult();
  }

  guardarmateria(obj): Observable<materia> {
    if (+obj.id != 0) {
      let param: materia = 
      new materia(obj.id, obj.nombre, obj.horas, obj.turno, obj.idcurso);
      return this.servicio.addSingleAbm(param, 'materia');
    }
    else {
      let param: materia = 
      new materia(obj.id, obj.nombre, obj.horas, obj.turno, obj.idcurso);
      return this.servicio.addSingleAbm(param, 'materia');
    }
  }

  seleccionar(id) {
    let nodo = this.modalService.listAbm;
    while (nodo.getData().name == "materia") {
      this.modalService.listAbm = nodo.getNext();
      nodo = nodo.getNext();
    }
    this.modalService.listAbm.getData().idmateria = id;
    this.location.back();
  }
//evento botón aceptar
  aceptarSeleccion(){
    this.servicio.idsSeleccionados = new Array<number>();
    for(let i = 0; i< this.materias.length; i++){
      //si está marcado el elemento
      var n = <HTMLInputElement>document.getElementById("chk-"+this.materias[i].id);
      if (n.checked == true){
        this.servicio.idsSeleccionados.push(this.materias[i].id);
      }
    }
    this.location.back();
  }

//función para evaluar check
  esSeleccionado(par){
    if (this.servicio.idsSeleccionados
      .find(id => id === par) == null)
      { return false;}
      else 
        return true;
  }
}



