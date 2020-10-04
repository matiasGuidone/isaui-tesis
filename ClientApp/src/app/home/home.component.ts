import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { AuthLoginService } from '../services/authlogin.service';
import { PeticionesService } from '../services/peticiones.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./autogestion.component.css']
})
export class HomeComponent {
  constructor(private router: Router, private logservicio: AuthLoginService, private servicio : PeticionesService){

  }
  rol : any;

    ngOnInit(){
      if (localStorage.getItem("Rol") != undefined && localStorage.getItem("Rol") != 'undefined' ){
        this.rol = JSON.parse(localStorage.getItem("Rol"));

      }

  }
  ingresoAsistencias(){
    if (this.rol.nombrerol.toString() == "Docente"){
      this.logservicio.componenteGuard = "frm-asistencia";
      this.router.navigate(['frm-asistencia']);
    }
    else if (this.rol.nombrerol.toString() == "Alumno"){
      this.logservicio.componenteGuard = "frm-asistenciasalumno";
      this.router.navigate(['frm-asistenciasalumno']);
    }
  }
ingresoCalendario(){
    if (this.rol.nombrerol.toString() == "Docente" || this.rol.nombrerol.toString() == "Alumno"){
      this.logservicio.componenteGuard = "frm-calendariocomp";
      this.router.navigate(['frm-calendariocomp']);
    } 
  }
  ingresoCalificaciones()
  {
    if (this.rol.nombrerol.toString() == "Docente"){
      this.logservicio.componenteGuard = "frm-carganotas";
      this.router.navigate(['frm-carganotas']);
    }
    else if (this.rol.nombrerol.toString() == "Alumno"){

    }
  }

}




