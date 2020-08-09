import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '../modal/modal-service.service';
import { PeticionesService } from '../services/peticiones.service';

@Component({
    selector: 'abm-filtro',
    templateUrl: './filtro-abm.component.html'
})
export class FiltroComponent {

   
   
   @Output() emisorFiltro = new EventEmitter<any[]>();

    constructor(private router: Router, private servicio: PeticionesService, private modalService : ModalService ){

    }
     //abrir y cerrar la ventana de filtros
  showFiltros(){
    document.getElementById('filtros')['style'].display = "block";
    document.getElementById('mostrar')['style'].display = "none";
  }
  cerrarFiltros(){
    document.getElementById('filtros')['style'].display = "none";
    document.getElementById('mostrar')['style'].display = "block";
  }
  //obtiene el tipo de input para el filtro seleccionado
  getTipoFiltro() {
    let fil = "text";
    if (this.modalService.filtro != null && this.modalService.filtro !=undefined){
      let index = document.getElementById('filtro')['value'];
      fil = (this.modalService.filtro.find( filtro => filtro.campo === index )).tipo;
       }
    document.getElementById('valorFiltro')['type'] = fil;
  }

  //evento para el botón de filtrado
  filtrarCampo() {
    let filtro = document.getElementById('filtro')['value'];
    let valorFiltro = document.getElementById('valorFiltro')['value'];
    this.modalService.filtro
    let arrayValores : string[] = new Array<string>();
    for(var n = 0 ; n < this.modalService.filtro.length; n++){
        if(filtro == this.modalService.filtro[n]['campo']){
          arrayValores.push(filtro);
          arrayValores.push(valorFiltro.toString());
        }
    }
    //this.filtros.emit(arrayValores);  
    let abm =  this.router.url.substring(5);
    this.servicio.loadGrilla(abm,arrayValores)
    .subscribe(res => this.emisorFiltro.emit(res));
  }
 

}
