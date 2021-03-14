import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';

//ventanas modales
import { MyModalComponent } from '../modal/MyModalComponent';
import { ModalService } from '../modal/modal-service.service';
import { Observable } from 'rxjs';
import { estudiante } from '../clases/estudiante';
import { PeticionesService } from '../services/peticiones.service';
import { abm } from '../clases/abm';
import { AuthLoginService } from '../services/authlogin.service';

//ventanas modales

@Component({
  selector: 'app-abm-estudiante',
  templateUrl: './abm-estudiante.component.html',
  styleUrls: ['./abm-estudiante.component.css']
})
export class AbmestudianteComponent extends abm<estudiante> implements OnInit {
  // estilo: string = "table-responsive";
  @Input() estudiantes: estudiante[] = new Array<estudiante>();

  //se agregan parámetros para el nuevo formulario de relación
  @Input() esRelacion: boolean = false;
  @Input() esRelacionCurso: boolean = false;
  @Output() emisorId = new EventEmitter<string[]>();

  constructor(protected location: Location,
    protected modalService: ModalService,
    protected servicio: PeticionesService,
    protected logservicio: AuthLoginService) {
    super(location, modalService, servicio, logservicio);
    this.nombre = 'estudiante';
    this.objetoBlanco = new estudiante("0", "", "", "", "", "", "", "", "", "","");
    this.modalService.setFiltro(this.objetoBlanco);
    if (this.modalService.listAbm != null && this.modalService.listAbm != undefined) {
      if (this.modalService.listAbm.getData().name == this.nombre) {
        this.editar(this.modalService.listAbm.getData().id,
          this.modalService.listAbm.getData());
      }
    }
  }

  ngOnInit() {
    this.servicio.getCantidad(this.nombre).subscribe(cantidad =>{
      this.cantidad = cantidad;
    if (!this.esRelacionCurso) {
      this.modalService.setFiltro(this.objetoBlanco);
      this.servicio.loadGrilla('estudiante',null,'20','0').subscribe(res => {
        this.lista = res;
      });
    }});

  }


  seleccionar(id) {
    if (this.esRelacion) {
      let datos = new Array<string>();
      datos.push(id);
      datos.push(this.lista.find(estudiante => estudiante.id === id).nombre + ", " +
      this.lista.find(estudiante => estudiante.id === id).apellido);
      this.emisorId.emit(datos);
    }
    else {
      let nodo = this.modalService.listAbm;
      while (nodo.getData().name == "estudiante") {
        this.modalService.listAbm = nodo.getNext();
        nodo = nodo.getNext();
      }
      this.modalService.listAbm.getData().idestudiante = id;
      this.location.back();
      this.location.subscribe(r=>{ this.logservicio.componenteGuard = r.url.toString().substring(1); });
    }
  }
  //evento botón aceptar
  aceptarSeleccion() {
    
    // this.servicio.idsSeleccionados = new Array<number>();
    // for (let i = 0; i < this.lista.length; i++) {
    //   //si está marcado el elemento
    //   var n = <HTMLInputElement>document.getElementById("chk-" + this.lista[i].id);
    //   if (n.checked == true) {
    //     this.servicio.idsSeleccionados.push(this.lista[i].id);
    //   }
    // }
    this.location.back();
    this.location.subscribe(r=>{ this.logservicio.componenteGuard = r.url.toString().substring(1); });
  }

  //función para evaluar check
  esSeleccionado(par) {
    if (this.servicio.idsSeleccionados
      .find(id => id === par) == null) { return false; }
    else
      return true;
  }

  //funcion para cambiar de estado un registro
  cambiarEstado(id){
    var n = <HTMLInputElement>document.getElementById("chk-" + id);
   
    if(n.checked == true){
      if (this.servicio.idsSeleccionados
        .find(ids => ids === id) == null){
          this.servicio.idsSeleccionados.push(id);
        }
    }
    else{
      if (this.servicio.idsSeleccionados
        .find(ids => ids === id) != null){
          let ind = this.servicio.idsSeleccionados.findIndex(ids=> ids == id);
          this.servicio.idsSeleccionados.splice(ind,1);
        }
    }
  }
}



