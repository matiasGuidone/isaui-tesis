import { Component } from '@angular/core';
import { PeticionesService } from '../services/peticiones.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor(private servicio: PeticionesService){}
  tr : number = 2; 
  cambiarEstilo(){
    if(this.tr==2){
      this.servicio.classtable2 = "table table-dark table-hover";
      this.servicio.classtable = "table table-striped table-dark table-responsive";
      this.servicio.classimg = "img-logo";
      this.servicio.classbody  = "bodyclass"; 
      this.servicio.classnav = "navbar navbar-expand-sm navbar-toggleable-sm navbar-dark bg-dark border-bottom box-shadow mb-3";
      this.tr = 3;}
    else if(this.tr==1){
      this.servicio.classtable2 = "table table-hover";
      this.servicio.classtable = "table-responsive";
      this.servicio.classimg = "custom-logo-link";
      this.servicio.classnav = "navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3";
      this.servicio.classbody  = "bodyclasswh"; 
      this.tr = 2;
    }
    else if(this.tr==3){
      this.servicio.classtable2 = "table table-hover bg-secondary ";
      this.servicio.classtable = "table-responsive bg-secondary ";
      this.servicio.classimg = "custom-logo-link";
      this.servicio.classnav = "navbar navbar-expand-sm navbar-toggleable-sm navbar-dark bg-secondary border-bottom box-shadow mb-3";
      this.servicio.classbody  = "bodyclass bg-secondary"; 
      this.tr = 1;
    }
    
  }
}
