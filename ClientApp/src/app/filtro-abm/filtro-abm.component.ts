import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '../modal/modal-service.service';
import { PeticionesService } from '../services/peticiones.service';

@Component({
  selector: 'abm-filtro',
  templateUrl: './filtro-abm.component.html'
})
export class FiltroComponent {

  arrayValores: string[] = new Array<string>();
  
  @Output() emisorFiltro = new EventEmitter<any[]>();

  constructor(private router: Router, private servicio: PeticionesService, private modalService: ModalService) {

  }
  //abrir y cerrar la ventana de filtros
  showFiltros() {
    document.getElementById('filtros')['style'].display = "block";
    document.getElementById('mostrar')['style'].display = "none";
  }
  cerrarFiltros() {
    document.getElementById('filtros')['style'].display = "none";
    document.getElementById('mostrar')['style'].display = "block";
  }
  //obtiene el tipo de input para el filtro seleccionado
  getTipoFiltro() {
    let fil = "text";
    if (this.modalService.filtro != null && this.modalService.filtro != undefined) {
      let index = document.getElementById('filtro')['value'];
      fil = (this.modalService.filtro.find(filtro => filtro.campo === index)).tipo;
    }
    document.getElementById('valorFiltro')['type'] = fil;
  }

  //evento para el botón de filtrado
  filtrarCampo() {
    let filtro = document.getElementById('filtro')['value'];
    let valorFiltro = document.getElementById('valorFiltro')['value'];
    if(this.arrayValores.find(val => filtro === val))
      { let ind = this.arrayValores.findIndex(val => filtro === val);
        ind++;
        this.arrayValores[ind] = valorFiltro;}
    else{
        this.arrayValores.push(filtro);
        this.arrayValores.push(valorFiltro);
    }
    let abm = this.router.url.substring(5);

      //Este case es para establecer una de las dos tablas 
      //para el filtrado en los abm relacionales

    switch (abm){
      case "alumnomateria": abm = "alumno"
      default :;
    }
    
    this.servicio.loadGrilla(abm, this.arrayValores)
      .subscribe(res => this.emisorFiltro.emit(res));
  }

  borrar(dato: string) {
      let ind = this.arrayValores.findIndex(val => dato === val);
      this.arrayValores.splice(ind,2);
      let abm = this.router.url.substring(5);
      switch (abm){
        case "alumnomateria": abm = "alumno"
        default :;
      }
      this.servicio.loadGrilla(abm, this.arrayValores)
      .subscribe(res => this.emisorFiltro.emit(res));
   }
}
