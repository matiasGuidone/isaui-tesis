import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

//ventanas modales
import { MyModalComponent } from '../modal/MyModalComponent';
import { ModalService } from '../modal/modal-service.service';
import { Observable } from 'rxjs';
import { ciclolectivo } from '../clases/ciclolectivo';
import { PeticionesService } from '../services/peticiones.service';

//ventanas modales

@Component({
  selector: 'app-abm-ciclolectivo',
  templateUrl: './abm-ciclolectivo.component.html',
  styleUrls: ['./abm-ciclolectivo.component.css'],
  providers:[PeticionesService]
})
export class AbmCiclolectivoComponent implements OnInit {

  ciclosLectivos: ciclolectivo[];
  constructor(private location: Location, 
              private modalService: ModalService,
              private servicio: PeticionesService) {

    this.modalService.setFiltro(new ciclolectivo("0", "", "",""));

    if (this.modalService.listAbm != null && this.modalService.listAbm != undefined) {

      if (this.modalService.listAbm.getData().name == 'ciclolectivo') {
        this.editar(this.modalService.listAbm.getData().id, 
        this.modalService.listAbm.getData());
      }

    }
  }

  ngOnInit() {
    this.servicio.loadGrilla('ciclolectivo').subscribe(res =>{ this.ciclosLectivos = res ;console.log(this.ciclosLectivos)});
  }

  editar(id: number, obj: any) {
    if (obj != null && obj != undefined) {
      let doc: ciclolectivo = new ciclolectivo(id.toString(), obj.nombre, obj.descripcion, obj.fechainicio );
      this.abrirModal('Nuevo ciclolectivo', 'ciclolectivo', 3, doc)
      .subscribe(obj => this.guardarciclolectivo(obj)
      .subscribe(json => this.servicio.loadGrilla('ciclolectivo')
      .subscribe(res => this.ciclosLectivos = res)));
    }
    else if (id != 0) {
      this.abrirModal('Editar ciclolectivo', 'ciclolectivo', 3, this.ciclosLectivos
      .find(ciclolectivo => ciclolectivo.id === id)).subscribe(
        obj => this.guardarciclolectivo(obj)
        .subscribe(json => this.servicio.loadGrilla('ciclolectivo')
        .subscribe(res => this.ciclosLectivos = res)));
    }
    else {
      let doc: ciclolectivo = new ciclolectivo( "0", "", "" ,"");
      this.abrirModal('Nuevo ciclolectivo', 'ciclolectivo', 3, doc)
      .subscribe(obj => this.guardarciclolectivo(obj)
        .subscribe(json => this.servicio.loadGrilla('ciclolectivo')
          .subscribe(res => this.ciclosLectivos = res)));
    }
  }

  eliminar(id: number) {
    this.abrirModal('Confirmación', '¿ Desea eliminar el registro ?', 1, null).subscribe(
      closed => {
        return this.servicio.eliminar(id, "ciclolectivo")
          .subscribe(json => this.servicio.loadGrilla('ciclolectivo')
          .subscribe(res => this.ciclosLectivos = res))
      });
  }

  abrirModal(titulo: string, mensaje: string, tipo: number, ciclolectivo: any): Observable<any> {
    const modalRef = 
    this.modalService.open(MyModalComponent, 
      { title: titulo, message: mensaje, tipo: tipo, parametros: ciclolectivo });
    return modalRef.onResult();
  }

  guardarciclolectivo(obj): Observable<ciclolectivo> {
      let param: ciclolectivo = 
      new ciclolectivo(obj.id, obj.nombre, obj.descripcion, obj.fechainicio );
      console.log(param);
      return this.servicio.addSingleAbm(param, 'ciclolectivo');
    
  }

  seleccionar(id) {
    let nodo = this.modalService.listAbm;
    while (nodo.getData().name == "ciclolectivo") {
      this.modalService.listAbm = nodo.getNext();
      nodo = nodo.getNext();
    }
    this.modalService.listAbm.getData().idciclolectivo = id;
    this.location.back();
  }
}



