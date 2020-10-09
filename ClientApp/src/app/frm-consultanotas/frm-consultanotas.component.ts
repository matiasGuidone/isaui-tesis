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
   prom: string;
   repo: notarepo[]= new Array<notarepo>();
  
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
      if (calificacion != null && calificacion.length > 0) 
      {
        this.repo= calificacion;
          var cant=0;
          var sumnn=0;
        for (let r of this.repo)
        {

          if(r.tipoexamen=='parcial')
          {
            cant+=1;
            sumnn+=r.nota;
          }
        }
        var calculo=(sumnn/cant).toString()
        this.prom= parseFloat(calculo).toFixed(2);
      }
    })

  }

}
