import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';

//ventanas modales
import { MyModalComponent } from '../modal/MyModalComponent';
import { ModalService } from '../modal/modal-service.service';
import { Observable } from 'rxjs';
import { evento } from '../clases/evento';
import { PeticionesService } from '../services/peticiones.service';
import { Router } from '@angular/router';

//ventanas modales

@Component({
  selector: 'app-abm-evento',
  templateUrl: './abm-evento.component.html',
  styleUrls: ['./abm-evento.component.css'] 
})
export class AbmEventoComponent implements OnInit {

 //variables para relaciones
  @Input() eventos: evento[];
  @Input() esRelacion: boolean = false;

  constructor(private location: Location, 
              private modalService: ModalService,
              private servicio: PeticionesService,
              private router : Router) {

    if (this.modalService.listAbm != null && this.modalService.listAbm != undefined) {

      if (this.modalService.listAbm.getData().name == 'evento') {
        this.editar(this.modalService.listAbm.getData().id, 
        this.modalService.listAbm.getData());
      } 
    }
  }

  ngOnInit() {
   
    if(!this.esRelacion){
    this.modalService.setFiltro(new evento("0", "", "", "", ""));
      this.servicio.loadGrilla('evento').subscribe(res => {
        this.eventos = res;
      });}
    
  }

  editar(id: number, obj: any = null) {
    if (obj != null && obj != undefined) {
      let doc: evento = new evento
      (id.toString(), obj.nombre, obj.fecha, obj.idmateria, obj.idmensaje);
      this.abrirModal('Nuevo evento', 'evento', 3, doc)
      .subscribe(obj => this.guardarevento(obj)
      .subscribe(json => this.servicio.loadGrilla('evento')
      .subscribe(res => this.eventos = res)));
    }
    else if (id != 0) {
      this.abrirModal('Editar evento', 'evento', 3, this.eventos
      .find(evento => evento.id === id)).subscribe(
        obj => this.guardarevento(obj)
        .subscribe(json => this.servicio.loadGrilla('evento')
        .subscribe(res => this.eventos = res)));
    }
    else {
      let doc: evento = new evento("0", "", "", "", "");
      this.abrirModal('Nuevo evento', 'evento', 3, doc)
      .subscribe(obj => this.guardarevento(obj)
        .subscribe(json => this.servicio.loadGrilla('evento')
          .subscribe(res => this.eventos = res)));
    }
  }

  eliminar(id: number) {
    this.abrirModal('Confirmación', '¿ Desea eliminar el registro ?', 1, null).subscribe(
      closed => {
        return this.servicio.eliminar(id, "evento")
          .subscribe(json => this.servicio.loadGrilla('evento')
          .subscribe(res => this.eventos = res))
      });
  }

  abrirModal(titulo: string, mensaje: string, tipo: number, evento: any): Observable<any> {
    const modalRef = 
    this.modalService.open(MyModalComponent, 
      { title: titulo, message: mensaje, tipo: tipo, parametros: evento });
    return modalRef.onResult();
  }

  guardarevento(obj): Observable<evento> {
    if (+obj.id != 0) {
      let param: evento = 
      new evento(obj.id, obj.nombre, obj.fecha, obj.idmateria, obj.idmensaje);
      return this.servicio.addSingleAbm(param, 'evento');
    }
    else {
      let param: evento = 
      new evento(obj.id, obj.nombre, obj.fecha, obj.idmateria, obj.idmensaje);
      return this.servicio.addSingleAbm(param, 'evento');
    }
  }

  seleccionar(id) {
    let nodo = this.modalService.listAbm;
    while (nodo.getData().name == "evento") {
      this.modalService.listAbm = nodo.getNext();
      nodo = nodo.getNext();
    }
    this.modalService.listAbm.getData().idvento = id;
    this.location.back();
  }
//evento botón aceptar
  aceptarSeleccion(){
    this.servicio.idsSeleccionados = new Array<number>();
    for(let i = 0; i< this.eventos.length; i++){
      //si está marcado el elemento
      var n = <HTMLInputElement>document.getElementById("chk-"+this.eventos[i].id);
      if (n.checked == true){
        this.servicio.idsSeleccionados.push(this.eventos[i].id);
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



