import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AbmMenuComponent } from '../abm-menu/abm-menu.component';
import { menu } from '../clases/menu';
import { ModalService } from '../modal/modal-service.service';
import { AuthLoginService } from '../services/authlogin.service';
import { PeticionesService } from '../services/peticiones.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
 num = 0;
  isExpanded = false;
  menus : menu[];
 componentes:any[];
  constructor(private modalService:ModalService , private servicio: PeticionesService, public router:Router, private logservicio: AuthLoginService){
    servicio.loadGrilla("menu")
    .subscribe( res => this.menus = res);

  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  tr : number = 0;
  cambiarEstilo(){
    //let num = document.getElementById('estilorange')['value'];
    this.num++;
    if(this.num == 4){this.num=1;}
    switch (this.num){
      case 1 :
        this.servicio.classtable2 = "table table-dark table-hover";
        this.servicio.classtable = "table table-striped table-dark table-responsive";
        this.servicio.classimg = "img-logo";
        this.servicio.classbody  = "bodyclass";
        this.servicio.classnav = "navbar navbar-expand-sm navbar-toggleable-sm navbar-dark bg-dark border-bottom box-shadow mb-3";
        break;
      case 2:
        this.servicio.classtable2 = "table table-hover";
        this.servicio.classtable = "table-responsive";
        this.servicio.classimg = "custom-logo-link";
        this.servicio.classnav = "navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3";
        this.servicio.classbody  = "bodyclasswh";
        break;
      case 3:
        this.servicio.classtable2 = "table table-hover bg-secondary ";
        this.servicio.classtable = "table-responsive bg-secondary ";
        this.servicio.classimg = "custom-logo-link";
        this.servicio.classnav = "navbar navbar-expand-sm navbar-toggleable-sm navbar-dark bg-secondary border-bottom box-shadow mb-3";
        this.servicio.classbody  = "bodyclass bg-secondary";
        break;
      default:
        break;
  }
  }
  // esta funcion setea el componente al cual se dirige el usuario al hacer click
  setGuardComponente(componente){
    this.logservicio.componenteGuard = componente;
  }
  // verifica que determinado item esté habilitado por los permisos del usuario logueado
  componenteHabilitado(componente){
    if(localStorage.getItem("Componentes") != 'undefined' && localStorage.getItem("Componentes") != null){
      let componentes : any[] =  JSON.parse(localStorage.getItem("Componentes"));
      if(componentes.find(c => c == componente)) {return true;}
    }else return false;
  }
  // verifica que determinado tipo de componente esté habilitado por los permisos del usuario logueado
  alguncomponente(tipo){
    if(localStorage.getItem("Componentes") != 'undefined' && localStorage.getItem("Componentes") != null){
          let componentes : any[] =  JSON.parse(localStorage.getItem("Componentes"));
          if(componentes.find(c => c.toString().substring(0,3) == tipo)) {return true;}
    }else return false;
  }
  //cerrar la sesion iniciada
  cerrarSesion(){
    this.logservicio.logout();
  }
  //comprueba si hay sesion iniciada
  estaEnSesion(){
    if(localStorage.getItem('Access_Token')!= undefined && localStorage.getItem('Access_Token') != 'undefined'){
      return true;
    }
    return false;
  }
  IrHome(){
    this.logservicio.componenteGuard = "autogestion";this.router.navigate(['autogestion']);
  }
}
