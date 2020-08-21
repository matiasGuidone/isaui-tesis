import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

//ventanas modales
import { MyModalComponent } from '../modal/MyModalComponent';
import { ModalService } from '../modal/modal-service.service';
import { Observable } from 'rxjs';
import { convocatoria } from '../clases/convocatoria';
import { PeticionesService } from '../services/peticiones.service';

//ventanas modales

@Component({
  selector: 'app-abm-convocatoria',
  templateUrl: './abm-convocatoria.component.html',
  styleUrls: ['./abm-convocatoria.component.css'] 
})
export class AbmConvocatoriaComponent implements OnInit {

  convocatorias: convocatoria[];
  constructor(private location: Location, 
              private modalService: ModalService,
              private servicio: PeticionesService) {

    this.modalService.setFiltro(new convocatoria("0", "", "","","",""));

    if (this.modalService.listAbm != null && this.modalService.listAbm != undefined) {

      if (this.modalService.listAbm.getData().name == 'convocatoria') {
        this.editar(this.modalService.listAbm.getData().id, 
        this.modalService.listAbm.getData());
      }

    }
  }

  ngOnInit() {
    this.servicio.loadGrilla('convocatoria')
    .subscribe(res => this.convocatorias = res);
  }

  editar(id: number, obj: any) {
    if (obj != null && obj != undefined) {
      let doc: convocatoria = new convocatoria(id.toString(), obj.fechainicio, obj.fechafin, 
      obj.descripcion, obj.idmateria, obj.estado);
      this.abrirModal('Nuevo convocatoria', 'convocatoria', 3, doc)
      .subscribe(obj => this.guardarconvocatoria(obj)
      .subscribe(json => this.servicio.loadGrilla('convocatoria')
      .subscribe(res => this.convocatorias = res)));
    }
    else if (id != 0) {
      this.abrirModal('Editar convocatoria', 'convocatoria', 3, this.convocatorias
      .find(convocatoria => convocatoria.id === id)).subscribe(
        obj => this.guardarconvocatoria(obj)
        .subscribe(json => this.servicio.loadGrilla('convocatoria')
        .subscribe(res => this.convocatorias = res)));
    }
    else {
      let doc: convocatoria = new convocatoria( "0", "", "","","","");
      this.abrirModal('Nuevo convocatoria', 'convocatoria', 3, doc)
      .subscribe(obj => this.guardarconvocatoria(obj)
        .subscribe(json => this.servicio.loadGrilla('convocatoria')
          .subscribe(res => this.convocatorias = res)));
    }
  }

  eliminar(id: number) {
    this.abrirModal('Confirmación', '¿ Desea eliminar el registro ?', 1, null).subscribe(
      closed => {
        return this.servicio.eliminar(id, "convocatoria")
          .subscribe(json => this.servicio.loadGrilla('convocatoria')
          .subscribe(res => this.convocatorias = res))
      });
  }

  abrirModal(titulo: string, mensaje: string, tipo: number, convocatoria: any): Observable<any> {
    const modalRef = 
    this.modalService.open(MyModalComponent, 
      { title: titulo, message: mensaje, tipo: tipo, parametros: convocatoria });
    return modalRef.onResult();
  }

  guardarconvocatoria(obj): Observable<convocatoria> {
      let param: convocatoria = 
      new convocatoria(obj.id, obj.fechainicio, obj.fechafin, obj.descripcion, obj.idmateria, obj.estado);
      console.log(param);
      return this.servicio.addSingleAbm(param, 'convocatoria');
    
  }

  seleccionar(id) {
    let nodo = this.modalService.listAbm;
    while (nodo.getData().name == "convocatoria") {
      this.modalService.listAbm = nodo.getNext();
      nodo = nodo.getNext();
    }
    this.modalService.listAbm.getData().idconvocatoria = id;
    this.location.back();
  }
}



