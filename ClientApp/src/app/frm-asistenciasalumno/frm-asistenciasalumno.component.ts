import { Component, OnInit } from '@angular/core';
import { PeticionesService } from '../services/peticiones.service';
import { materia } from '../clases/materia';

@Component({
  selector: 'app-frm-asistenciasalumno',
  templateUrl: './frm-asistenciasalumno.component.html',
  styleUrls: ['./frm-asistenciasalumno.component.css']
})
export class FrmAsistenciasalumnoComponent implements OnInit {
  materias: materia[];
  asistencia: any;
  constructor(private servicio: PeticionesService) {
    let rol = JSON.parse(localStorage.getItem("Rol"));
    if (rol.nombrerol.toString() == "Alumno") {
      this.servicio.loadGrilla('materia', ['idalumno', rol.id.toString()]).subscribe(resultado => {
        if (resultado != null) {
          this.materias = resultado;
          this.materias.push(new materia({ 'id': '0', 'nombre': 'Todas', 'idcurso': '0' }));
          this.servicio.loadGrilla('asistenciarepo', ['idalumno', rol.id.toString(), 'totales']).subscribe(resultad => {
            this.asistencia = resultad[0];
            let porcentaje = (this.asistencia['modulosPresente']/this.asistencia['cantidadModulos']*100).toString().substring(0,5)+" %";
            let div = document.getElementById('porcentaje');
            div.innerHTML =  '<div class="lead">Todas</div><br>'+porcentaje;
            div = document.getElementById('porc');
            this.setBackgrnd(div,this.asistencia['modulosPresente']/this.asistencia['cantidadModulos']*100);
          });
        }
      });
    }
  }

  ngOnInit() {
    let semanaEnMilisegundos = 1000 * 60 * 60 * 24 * 6;
    let desde = new Date(new Date().getTime() - semanaEnMilisegundos);
    document.getElementById('desde')['value']= this.formatearFecha(desde);
    document.getElementById('hasta')['value']= this.formatearFecha(new Date());
  }

  filtrar(){
    let rol = JSON.parse(localStorage.getItem("Rol"));
    let mater = this.materias.find(mater => mater.id == document.getElementById('materia')['value'] );
    let fechad = document.getElementById('desde')['value'];
    let fechah = document.getElementById('hasta')['value']; 
    if(mater.id==0){
    this.servicio.loadGrilla('asistenciarepo', ['idalumno', rol.id.toString(),'totales','fecha desde',fechad,'fecha hasta',fechah]).subscribe(resultad => {
      this.asistencia = resultad[0];
      let porcentaje = (this.asistencia['modulosPresente']/this.asistencia['cantidadModulos']*100).toString().substring(0,5)+" %";
      let div = document.getElementById('porcentaje');
      div.innerHTML = '<div class="lead">'+mater.nombre+'</div><br>'+porcentaje;
      div = document.getElementById('porc');
      this.setBackgrnd(div,this.asistencia['modulosPresente']/this.asistencia['cantidadModulos']*100);
    });}
    else{
      this.servicio.loadGrilla('asistenciarepo', ['idalumno', rol.id.toString(),'idmateria', mater.id.toString(),'fecha desde',fechad,'fecha hasta',fechah]).subscribe(resultad => {
        this.asistencia = resultad[0];
        let porcentaje = (this.asistencia['modulosPresente']/this.asistencia['cantidadModulos']*100).toString().substring(0,5)+" %";
      let div = document.getElementById('porcentaje');
      div.innerHTML = '<div class="lead">'+mater.nombre+'</div><br>'+porcentaje;
      div = document.getElementById('porc');
      this.setBackgrnd(div,this.asistencia['modulosPresente']/this.asistencia['cantidadModulos']*100);
      });
    }
  }
  formatearFecha(f: any) {

    let fecha: Date = new Date(f);
    let mes: string = (fecha.getMonth() + 1).toString();
    let dia: string = (fecha.getDate()).toString();
    if (mes.length < 2) { mes = '0' + mes; }
    if (dia.length < 2) { dia = '0' + dia; }
   return (fecha.getFullYear() + '-' + mes + '-' + dia); 
  }
  setBackgrnd(div,value){
    if(value<20){
      div.style.backgroundColor="#e4263f59";
    }
    else if(value <40){
      div.style.backgroundColor="#e4722659";
    }
    else if(value <60){
      div.style.backgroundColor="#d1e4265b";
    }
    else if(value <80){
      div.style.backgroundColor="#82e42659";
    }
    else{
      div.style.backgroundColor="#18b81859";
    }
    
  }
}
