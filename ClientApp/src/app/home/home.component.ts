import { Component } from '@angular/core';
import { PeticionesService } from '../services/peticiones.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor(private servicio: PeticionesService){}
  tr : boolean = true; 
  cambiarEstilo(){
    if(this.tr){
      this.servicio.classtable2 = "table table-dark table-hover";
      this.servicio.classtable = "table table-striped table-dark table-responsive";
      this.servicio.classimg = "img-logo";
      this.servicio.classbody  = "bodyclass"; 
      this.servicio.classnav = "navbar navbar-expand-sm navbar-toggleable-sm navbar-dark bg-dark border-bottom box-shadow mb-3";
      this.tr = false;}
    else{
      this.servicio.classtable2 = "table table-hover";
      this.servicio.classtable = "table-responsive";
      this.servicio.classimg = "custom-logo-link";
      this.servicio.classnav = "navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3";
      this.servicio.classbody  = "bodyclasswh"; 
      this.tr = true;
    }
  }
}
