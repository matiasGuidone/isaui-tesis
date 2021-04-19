import { Component, OnInit, Input, EventEmitter, Output, } from '@angular/core';
import { Location } from '@angular/common';
import { from, Observable } from 'rxjs';

//ventanas modales
import { ModalService } from '../modal/modal-service.service';
import { convocatoria } from '../clases/convocatoria';
import { abm } from '../clases/abm';
import { PeticionesService } from '../services/peticiones.service';
import { AuthLoginService } from '../services/authlogin.service';
import { curriculumconvocatoria } from '../clases/curriculumconvocatoria';
import { MyModalComponent } from '../modal/MyModalComponent';
import { materia } from '../clases/materia';
//ventanas modales

@Component({
  selector: 'app-abm-convocatoria',
  templateUrl: './abm-convocatoria.component.html',
  styleUrls: ['./abm-convocatoria.component.css']
})
export class AbmConvocatoriaComponent extends abm<convocatoria> implements OnInit {

  administrador: any;
  curcom: curriculumconvocatoria;
  curriculum: any;
  todas_postuladas: boolean = true;
  convocatorias_anotadas: any;
  materia: materia;


  @Input() esRelacion: boolean = false;
  @Output() emisorId = new EventEmitter<string[]>();
  materiaid: number = 0;

  constructor(protected location: Location,
    protected modalService: ModalService,
    protected servicio: PeticionesService,
    protected logservicio: AuthLoginService) {
    super(location, modalService, servicio, logservicio);
    this.nombre = 'convocatoria';
    this.objetoBlanco = new convocatoria({ 'id': '0', 'nombre': '', 'fechainicio': '', 'fechafin': '', 'descripcion': '', 'idmateria': '', 'estado': '' ,'idcurriculum':''});
    this.modalService.setFiltro(this.objetoBlanco);
    if (this.modalService.listAbm != null && this.modalService.listAbm != undefined) {
      if (this.modalService.listAbm.getData().name == this.nombre) {
        this.editar(this.modalService.listAbm.getData().id,
          this.modalService.listAbm.getData());
      }
    }


  }

  // ngOnInit() {
   
  //     this.servicio.loadGrilla(this.nombre).subscribe(res => this.lista = res);
  

  // }

  seleccionar(id) {
    if (this.esRelacion) {
      let datos = new Array<string>();
      datos.push(id);
      datos.push(this.lista.find(convocatoria => convocatoria.id === id).descripcion);
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
      this.location.subscribe(r => { this.logservicio.componenteGuard = r.url.toString().substring(1); });
    }
  }

  //función para evaluar check
  esSeleccionado(par) {
    if (this.servicio.idsSeleccionados
      .find(id => id === par) == null) { return false; }
    else
      return true;
  }

  

}



