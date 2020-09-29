import { Component, OnInit } from '@angular/core';
import { PeticionesService } from '../services/peticiones.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./autogestion.component.css']
})
export class HomeComponent {
  constructor(private servicio: PeticionesService){

  }
  rol : string;
  ngOnInit(){
    if ( localStorage.getItem("Rol")=="Docente"){
       this.rol="Docente";
    }
}
}




