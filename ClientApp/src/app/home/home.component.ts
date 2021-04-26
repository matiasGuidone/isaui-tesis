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
  constructor(private router: Router, private logservicio: AuthLoginService, public servicio: PeticionesService) {

  }
  rol: any;
  finales:number = 0;
  mensajes:number = 0;
  descmsjs:string="";
  inscripto:boolean =false;
  tienemsjs:boolean =false;

  ngOnInit() {
    if (localStorage.getItem("Rol") != undefined && localStorage.getItem("Rol") != 'undefined') {
      this.rol = JSON.parse(localStorage.getItem("Rol"));
      if(this.rol.nombrerol == "Estudiante"){
        this.servicio.loadGrilla("estudiantemensaje", this.rol.id.toString()).subscribe( msjs =>{
          for (let ms of msjs){
           
            if (ms.estado == 0){
              this.mensajes++;
              if (this.descmsjs==""){ this.tienemsjs = true; this.descmsjs = "Materias con mensaje: ";}
              this.descmsjs += "'"+ms.nombreMateria+"' , ";
            } 
          }
          if(this.descmsjs.length > 0){
            this.descmsjs = this.descmsjs.substring(0,-2);
          }
        this.servicio.loadGrilla('calificacionestudiante',
          ['idestudiante',this.rol.id.toString()]).subscribe(calif=>{
            for(let c of calif){
              if(c.nota ==11){
                this.finales++;
                this.inscripto = true;
              }
            }
        });
      });
      }
      else if(this.rol.nombrerol == "Curriculum"){
        let home = document.getElementById('home');
        home.style.display='none';
        let homecv = document.getElementById('homecv');
        homecv.style.display='block';
      }
    }

  }
  ingresoAsistencias() {
    if (this.rol.nombrerol.toString() == "Docente") {
      this.logservicio.componenteGuard = "frm-asistencia";
      this.router.navigate(['frm-asistencia']);
    }
    else if (this.rol.nombrerol.toString() == "Estudiante") {
      this.logservicio.componenteGuard = "frm-asistenciasestudiante";
      this.router.navigate(['frm-asistenciasestudiante']);
    }
  }
  ingresoCalendario() {
    if (this.rol.nombrerol.toString() == "Docente" || this.rol.nombrerol.toString() == "Estudiante") {
      this.logservicio.componenteGuard = "frm-calendariocomp";
      this.router.navigate(['frm-calendariocomp']);
    }
  }
  ingresoCalificaciones() {
    if (this.rol.nombrerol.toString() == "Docente") {
      this.logservicio.componenteGuard = "frm-carganotas";
      this.router.navigate(['frm-carganotas']);
    }
    else if (this.rol.nombrerol.toString() == "Estudiante") {
      this.logservicio.componenteGuard = "frm-consultanotas";
      this.router.navigate(['frm-consultanotas']);
    }
  }

  ingresoMensajes()
  {
    if (this.rol.nombrerol.toString() == "Estudiante"){
      this.logservicio.componenteGuard = "frm-vermensajes";
      this.router.navigate(['frm-vermensajes']);
    }
    else if (this.rol.nombrerol.toString() == "Docente") {
      this.logservicio.componenteGuard = "frm-mensajes";
      this.router.navigate(['frm-mensajes']);
    }
  }
  ingresoCv(){
    if (this.rol.nombrerol.toString() == "Curriculum"){
      this.logservicio.componenteGuard = "frm-curriculum";
      this.router.navigate(['frm-curriculum']);
    }
  }
  ingresoConvocatorias(){
    if (this.rol.nombrerol.toString() == "Curriculum"){
      this.logservicio.componenteGuard = "frm-convocatorias";
      this.router.navigate(['frm-convocatorias']);
    }
  }


}




