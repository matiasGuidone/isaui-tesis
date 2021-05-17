import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AbmMenuComponent } from '../abm-menu/abm-menu.component';
import { menu } from '../clases/menu';
import { ModalService } from '../modal/modal-service.service';
import { AuthLoginService } from '../services/authlogin.service';
import { PeticionesService } from '../services/peticiones.service';
import ayuda from 'src/assets/json/ayuda.json';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
 num = 0;
  isExpanded = false;
  menus : menu[];
 componentes:any[]; 
 usuario: string; 
  ayuda: any ={'titulo':'','descripcion':''};
  ayu = false;
  // The screen starts with the maximum opacity
public opacityChange = 0;public splashTransition;// First access the splash is visible
public showSplash = false;readonly ANIMATION_DURATION = 1;
 //foto: string;
  constructor(public modalService:ModalService , public servicio: PeticionesService, public router:Router, protected logservicio: AuthLoginService){
    servicio.loadGrilla("menu")
    .subscribe( res => {this.menus = res; this.ordenar();});
   
    this.cambiarEstilo(logservicio.getEstilo());
    this.usuario = logservicio.getNombreUsuario();
    this.logservicio.foto = logservicio.getFoto();
    if (this.logservicio.foto == "" || this.logservicio.foto == "System.Byte[]"){
      this.logservicio.foto = "/assets/user.png"
    }
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  tr : number = 0;
  cambiarEstilo(num) {
    //let num = document.getElementById("tema")['value'];
    switch (+num) {
      case 1://estilo negro
        this.servicio.classtable2 = "table table-dark table-hover";
        this.servicio.classtable = "table table-striped table-dark table-responsive";
        this.servicio.classimg = "img-logo";
        this.servicio.classbody = "bodyclass";
        this.servicio.alertrel = "alert table-dark border contrel";
        this.servicio.classnav = "navbar navbar-expand-sm navbar-toggleable-sm navbar-dark bg-dark border-bottom box-shadow mb-3";
        //this.temaestablecido = 'Negro';
        break;
      case 2://estilo blanco
        this.servicio.classtable2 = "table table-hover";
        this.servicio.classtable = "table-responsive";
        this.servicio.classimg = "custom-logo-link";
        this.servicio.alertrel = "alert bg-white border contrel";
        this.servicio.classnav = "navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3";
        this.servicio.classbody = "bodyclasswh";
        //this.temaestablecido = 'Blanco';
        break;
      case 3: //estilo gey
        this.servicio.classtable2 = "table table-hover bg-secondary ";
        this.servicio.classtable = "table-responsive bg-secondary ";
        this.servicio.classimg = "custom-logo-link";
        this.servicio.alertrel = "alert bg-secondary border contrel";
        this.servicio.classnav = "navbar navbar-expand-sm navbar-toggleable-sm navbar-dark bg-secondary border-bottom box-shadow mb-3";
        this.servicio.classbody = "bodyclass bg-secondary";
        //this.temaestablecido = 'Gris';
        break;
      default:
        break;

    }
  }
  ngOnInit(){
    document.getElementById("ayuda").style.zIndex ='-1';
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
    this.logservicio.componenteGuard = "autogestion";this.router.navigate(['autogestion']);
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
  getIdRol(){
    return +JSON.parse(localStorage.getItem('Rol')).idroles;
  }

  ordenar(){ 
    this.menus = this.menus.sort(function (a, b) {
      if (a['nombre'].toLowerCase() > b['nombre'].toLowerCase()) {
        return 1;
      }
      if (a['nombre'].toLowerCase() < b['nombre'].toLowerCase()) {
        return -1;
      }
      // a must be equal to b
      
      return 0;
    });}

    toggleayuda(){
      
      if(this.showSplash){
        this.animaInfo()
        //this.ayu = false;
      }
      else{
        let comp = this.router.url.replace('/','');
        let parame = ayuda;
          for (let p in parame) {
            if (p == comp) {
              this.ayuda = parame[p];
              this.animaInfo()
            }
          }
        }
    }
     
    private animaInfo() {
      // Setting the transition
      
      if(!this.showSplash) {document.getElementById("ayuda").style.zIndex ='5000'}
 
      this.splashTransition = `opacity ${this.ANIMATION_DURATION}s`;
     
      if(this.opacityChange == 1){this.opacityChange = 0; } 
      else{this.opacityChange = 1; }
      setTimeout(() => {
         // After the transition is ended the showSplash will be hided
         this.showSplash = !this.showSplash; 
         
         if(!this.showSplash){document.getElementById("ayuda").style.zIndex ='-1'}
      }, 1000);
      
   }
}
