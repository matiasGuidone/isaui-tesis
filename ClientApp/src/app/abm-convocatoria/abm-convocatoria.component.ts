import { Component, OnInit, Input, EventEmitter, Output, } from '@angular/core';
import { Location } from '@angular/common';
import { from, Observable } from 'rxjs';

//ventanas modales
import { ModalService } from '../modal/modal-service.service';
import { convocatoria } from '../clases/convocatoria';
import { abm } from '../clases/abm';
import { PeticionesService } from '../services/peticiones.service';
import { AuthLoginService } from '../services/authlogin.service';
import {curriculumconvocatoria} from '../clases/curriculumconvocatoria';
import { MyModalComponent } from '../modal/MyModalComponent';
//ventanas modales

@Component({
  selector: 'app-abm-convocatoria',
  templateUrl: './abm-convocatoria.component.html',
  styleUrls: ['./abm-convocatoria.component.css']
})
export class AbmConvocatoriaComponent extends abm<convocatoria> implements OnInit {

  administrador : any;
  curcom : curriculumconvocatoria;
  curriculum : any;
  todas_postuladas : boolean;
  convocatorias_anotadas: any;


  @Input() esRelacion: boolean=false;
  @Output() emisorId = new EventEmitter<string[]>();

  constructor( protected location: Location,
               protected modalService: ModalService,
               protected servicio: PeticionesService,
               protected logservicio: AuthLoginService){
    super(location,modalService,servicio, logservicio);

    this.nombre = 'convocatoria';
    this.objetoBlanco = new convocatoria({'id':'0','nombre':'','fechainicio':'','fechafin':'','descripcion':'','idmateria':'','estado':''});
    this.modalService.setFiltro(this.objetoBlanco);
    if (this.modalService.listAbm != null && this.modalService.listAbm != undefined) {
      if (this.modalService.listAbm.getData().name == this.nombre) {
        this.editar(this.modalService.listAbm.getData().id,
        this.modalService.listAbm.getData());
      }
    }
    this.servicio.loadGrilla('Curriculum', ['idusuario']).subscribe(curr => {
      this.curriculum=curr;
      this.curriculum=this.curriculum[0].id.toString();
      if(this.curriculum != undefined){
        this.servicio.loadGrilla('ConvocatoriaGuardados', this.curriculum).subscribe(cogu => {
          this.convocatorias_anotadas= cogu;
          this.todas_selecciondas();
          console.log(this.convocatorias_anotadas);
            });
      }
     console.log(this.curriculum);
    });

    this.administrador = JSON.parse(localStorage.getItem("Rol"));

  }


  seleccionar(id) {
    if (this.esRelacion) {
      let datos = new Array<string>();
      datos.push(id);
      datos.push(this.lista.find(convocatoria=> convocatoria.id === id).descripcion );
      this.emisorId.emit(datos);
    }
    else {
      let nodo = this.modalService.listAbm;
      while (nodo.getData().name == "convocatoria") {
        this.modalService.listAbm = nodo.getNext();
        nodo = nodo.getNext();
      }
      this.modalService.listAbm.getData().idconvocatoria = id;
      this.location.back();
      this.location.subscribe(r=>{ this.logservicio.componenteGuard = r.url.toString().substring(1); });
    }
  }

  //función para evaluar check
  esSeleccionado(par) {
    if (this.servicio.idsSeleccionados
      .find(id => id === par) == null) { return false; }
    else
      return true;
  }

   AsignarCuraConvocatoria(ids){
    this.curcom =new curriculumconvocatoria({'idcurriculum': this.curriculum , 'idconvocatoria': ids, 'puntaje': 0, 'prioridad': 0});
    console.log(this.curcom)
    this.servicio.addSingleAbm(this.curcom, 'Curriculumconvocatoria').subscribe(x => {
    this.abrirModal(x, 'Muchas gracias por tu Postulacion',2,3);

    this.servicio.loadGrilla('Curriculumconvocatoria').subscribe(cuco => {
      this.servicio.loadGrilla('ConvocatoriaGuardados', cuco[0].idcurriculum.toString()).subscribe(cogu => {
        this.convocatorias_anotadas= cogu;

        console.log(this.convocatorias_anotadas);
      });
    });

  },
  err => console.error('Observer got an error: ' + err)

    );
  }

  abrirModal(titulo: string, mensaje: string, tipo: number, menu: any): Observable<any> {
    const modalRef =
    this.modalService.open(MyModalComponent,
      { title: titulo, message: mensaje, tipo: tipo, parametros: menu });
    return modalRef.onResult();
  }

  eliminar_relacion(id, id2) {
    this.abrirModal('Confirmación', '¿ Desea eliminar el registro ?', 1, null).subscribe(
      closed => {
        return this.servicio.eliminar(id, 'Curriculumconvocatoria', id2)
          .subscribe(json => this.servicio.loadGrilla(this.nombre)
          .subscribe(res => this.lista = res))
      });
  }



  todas_selecciondas(){
    let es_verdadero=true;

    this.servicio.loadGrilla('Convocatoria').subscribe((cuco :any[]) => {
        if (cuco!= undefined ){
            /* for(var i=0; i<cuco.length; i++){
            if (this.convocatorias_anotadas[i].idconvocatoria == cuco[i].id){
                es_verdadero=true;
              }
            if (this.convocatorias_anotadas[i].idconvocatoria != cuco[i].id){
                 es_verdadero=false;
                 } */
                for (let n of cuco){
                let indice= this.convocatorias_anotadas.find( c => c.id == n.id);
                if (indice == undefined){
                  es_verdadero=false;
                }


                }}})

                this.todas_postuladas= es_verdadero;

}


}



