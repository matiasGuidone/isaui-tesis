import { Component } from '@angular/core';
import { PeticionesService } from './services/peticiones.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  //sesionIniciada: boolean = false;
  constructor(private servicio: PeticionesService){
    localStorage.setItem("InicioSesion", "false" );
  }
  estaSesion(){
    if(localStorage.getItem('InicioSesion')=='true') return true;
    return false;
  }
}
