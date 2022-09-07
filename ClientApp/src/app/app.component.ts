import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PeticionesService } from './services/peticiones.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  //sesionIniciada: boolean = false;
  constructor(public servicio: PeticionesService, router: Router){
    if(localStorage.getItem('InicioSesion')!='true'){
        localStorage.setItem("InicioSesion", "false" );}
        
  }

  estaSesion(){
    if(localStorage.getItem('InicioSesion')=='true') return true;
    return false;
  }

}
