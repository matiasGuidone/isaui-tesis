import { Component, OnInit } from '@angular/core';
import { materia } from '../clases/materia';
import { docentemateria } from '../clases/docentemateria';
import { PeticionesService } from '../services/peticiones.service';
import { Router } from '@angular/router';
import { AuthLoginService } from '../services/authlogin.service';
import { calificacionalumno } from '../clases/calificacionalumno';
import { examen } from '../clases/examen';
import { notarepo } from '../clases/notarepo';


@Component({
  selector: 'app-consultanotas',
  templateUrl: './frm-consultanotas.component.html',
  styleUrls: ['./frm-consultanotas.component.css']
})
export class ConsultanotasComponent implements OnInit {

  materias: materia[] = new Array<materia>();
   prom: number=0;
   parciales: any[]= new Array<any>();
   finales: any[]= new Array<any>();
  
  constructor(private servicio: PeticionesService, protected logservicio: AuthLoginService) { 
    let rol = JSON.parse(localStorage.getItem("Rol"));
    if(rol.nombrerol.toString()=="Alumno"){
     this.servicio.loadGrilla('materia',['idalumno', rol.id.toString()] ).subscribe(resultado => { this.materias = resultado;});
    
    }
    else{
      this.servicio.loadGrilla('materia').subscribe(resultado => { this.materias = resultado;});
    }
  }
  
  
  ngOnInit() {
  }

  seleccionarMateria(){
    let reporte = new Array<notarepo>();
    let rol = JSON.parse(localStorage.getItem("Rol"));
    let id = document.getElementById('materia')['value'];
    const ids= {idalumno: rol.id , idmateria: id}
    this.servicio.loadGrilla('calificacionrepo', [ids.idalumno, ids.idmateria]).subscribe(calificacion => {
      this.parciales = new Array<any>();
      this.finales = new Array<any>();
      this.prom = 0;
      if (calificacion != null && calificacion.length > 0) 
      {
        // this.repo= calificacion;
        //   var cant=0;
        //   var sumnn=0;
        for (let c of calificacion)
        {
          if(c.tipoexamen=='parcial')
          {
            this.parciales.push(c);
            this.prom += c.nota
            // cant+=1;
            // sumnn+=r.nota;
          }
          if(c.tipoexamen=='final')
          {
            this.finales.push(c);
            // cant+=1;
            // sumnn+=r.nota;
          }
        }
        this.prom = this.prom / this.parciales.length;
        if(isNaN(this.prom)|| this.prom==undefined){this.prom = 0;}
        // var calculo = (sumnn/cant).toString()
        //this.parciales.forEach(function(par) { par.nota;});
      }
    })

  }

}
