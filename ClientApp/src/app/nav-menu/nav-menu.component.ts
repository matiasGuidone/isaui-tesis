import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
 
import { AbmMenuComponent } from '../abm-menu/abm-menu.component';
import { menu } from '../clases/menu';
import { ModalService } from '../modal/modal-service.service';
import { PeticionesService } from '../services/peticiones.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'] 
})
export class NavMenuComponent {

  isExpanded = false;
  menus : menu[];
  constructor(private modalService:ModalService , private servicio: PeticionesService, public router:Router){
    servicio.loadGrilla("menu")
    .subscribe( res => this.menus = res);
  }

  collapse() {
    this.isExpanded = false;
    
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
