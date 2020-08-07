import { Component } from '@angular/core';
 
import { AbmMenuComponent } from '../abm-menu/abm-menu.component';
import { menu } from '../clases/menu';
import { ModalService } from '../modal/modal-service.service';
import { PeticionesService } from '../services/peticiones.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
  providers:[PeticionesService]

})
export class NavMenuComponent {
  isExpanded = false;
  menus : menu[];
  constructor(private modalService:ModalService , private servicio: PeticionesService){
    servicio.loadGrilla("menu")
    .subscribe( res => this.menus = res);
  }

  collapse() {
    this.isExpanded = false;
    
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  //abrir y cerrar la ventana de filtros
  showFiltros(){
    document.getElementById('filtros')['style'].display = "block";
  }
  cerrarFiltros(){
    document.getElementById('filtros')['style'].display = "none";
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

  }
}
