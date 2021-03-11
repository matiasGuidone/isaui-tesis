import { Component, OnInit } from '@angular/core';
import { materia } from '../clases/materia';
import { docentemateria } from '../clases/docentemateria';
import { PeticionesService } from '../services/peticiones.service';
import { Router } from '@angular/router';
import { AuthLoginService } from '../services/authlogin.service';
import { calificacionestudiante } from '../clases/calificacionestudiante';
import { examen } from '../clases/examen';
import { notarepo } from '../clases/notarepo';
import { ModalService } from '../modal/modal-service.service';
import { ciclolectivo } from '../clases/ciclolectivo';


@Component({
  selector: 'app-consultanotas',
  templateUrl: './frm-consultanotas.component.html',
  styleUrls: ['./frm-consultanotas.component.css']
})
export class ConsultanotasComponent implements OnInit {

  materias: materia[] = new Array<materia>();
  prom: any; 
  parciales: any[] = new Array<any>();
  finales: any[] = new Array<any>();
  calificaciones: any[] = new Array<any>();
  estainscripto: string = '';
  idmateria = 0;
  habilitada:boolean =false;
  ciclos: ciclolectivo[];
  ciclolectivo: any;

  constructor(private servicio: PeticionesService, protected logservicio: AuthLoginService, private modalservice: ModalService) {
    this.servicio.loadGrilla('ciclolectivo').subscribe(ciclos => {
      this.ciclos = ciclos;
    let rol = JSON.parse(localStorage.getItem("Rol"));
    if (rol.nombrerol.toString() == "Estudiante") {
      this.servicio.loadGrilla('materia', ['idestudiante', rol.id.toString()]).subscribe(resultado => { this.materias = resultado; if (this.materias.length > 0) this.seleccionarMateria(this.materias[0].id) });

    }});
  }


  ngOnInit() {
  }
  seleccionarCiclo(){
    let ciclolectivo = document.getElementById('ciclolectivo')['value'];
    let rol = JSON.parse(localStorage.getItem("Rol"));
    if (rol.nombrerol.toString() == "Estudiante") {
      this.servicio.loadGrilla('materia', ['idestudiante', rol.id.toString(),'idciclolectivo',ciclolectivo.toString()]).subscribe(resultado => { this.materias = resultado; if (this.materias.length > 0) this.seleccionarMateria(this.materias[0].id) });
    }   
  }


  seleccionarMateria(idinicial = 0) {
    let reporte = new Array<notarepo>();
    let rol = JSON.parse(localStorage.getItem("Rol"));
    this.idmateria = idinicial;
    if (idinicial == 0) {
      this.idmateria = document.getElementById('materia')['value'];
    }
    const ids = { idestudiante: rol.id, idmateria: this.idmateria }
    let ciclolectivo = document.getElementById('ciclolectivo')['value'];
    this.servicio.loadGrilla('calificacionrepo', [ids.idestudiante.toString(), ids.idmateria.toString(), ciclolectivo.toString()]).subscribe(calificacion => {
      this.calificaciones = calificacion;
      this.parciales = new Array<any>();
      this.estainscripto = '';
      this.finales = new Array<any>();
      this.prom = 0;
      if (calificacion != null && calificacion.length > 0) {
        for (let c of calificacion) {
          if (c.tipoexamen == 'parcial' ) {
            if(c.nota == 0){c.nota = 'sin calificación'}
            c.fecha =  new Date(c.fecha) ;
            this.parciales.push(c);
            this.prom += c.nota;

          }
          if (c.tipoexamen == 'final') {
            if (c.nota != 0 && c.nota != 11) {
              c.fecha =  new Date(c.fecha);
              this.finales.push(c);
            }
            else if (c.nota == 0 && c.idcalificacion == 0) { this.estainscripto = 'no'; }
            else if (c.nota == 0 && c.idcalificacion > 0) { this.estainscripto = 'estuvo'; }
            else if (c.nota == 11 && c.idcalificacion > 0) { this.estainscripto = 'si'; }
          }
        }
        this.prom = this.prom / this.parciales.length;
        if (isNaN(this.prom) || this.prom == undefined) { this.prom = 0; }
        else { this.prom = this.prom.toFixed(1); }
        this.habilitadaInscripcion();
      }
    })
  }

  habilitadaInscripcion() {
    //condicion de los días de habilitacion
    if (this.calificaciones.length>0) {
      this.modalservice.setCaseEstado('tiempoExamen');
      let fecha = this.calificaciones.find(exam => exam.tipoexamen == 'final' && exam.nota == 0 );
      if(fecha!=undefined){
      let fechadesde = this.sumarDias( new Date(fecha.fecha), -(+this.modalservice.estados.DiasDesde));
      let fechahasta = this.sumarDias( new Date(fecha.fecha), -(+this.modalservice.estados.DiasHasta));
      if (new Date() > fechadesde && new Date() < fechahasta) {
        if ((this.estainscripto == 'no' || this.estainscripto == 'estuvo') && this.parciales.length>=4) { this.habilitada= true; }
        else if (this.estainscripto == 'si') { this.habilitada= false; }
      }
    }
      else this.habilitada=  false;
    } 
  }
  inscribirfinal() {
    if (this.estainscripto == 'si') {
      let rol = JSON.parse(localStorage.getItem("Rol"));
      let final = this.calificaciones.find(final => final.nota == 11 && final.tipoexamen == 'final');
      let obj: calificacionestudiante = new calificacionestudiante({ 'idestudiante': rol.id, 'nota': '0', 'idexamen': final.idexamen, 'id': final.idcalificacion })
      this.servicio.addSingleAbm(obj, 'calificacionestudiante').subscribe(r => {
        this.seleccionarMateria();
      });
    }
    else if (this.estainscripto == 'estuvo') {
      let rol = JSON.parse(localStorage.getItem("Rol"));
      let final = this.calificaciones.find(final => final.nota == 0 && final.tipoexamen == 'final');
      let obj: calificacionestudiante = new calificacionestudiante({ 'idestudiante': rol.id, 'nota': '11', 'idexamen': final.idexamen, 'id': final.idcalificacion })
      this.servicio.addSingleAbm(obj, 'calificacionestudiante').subscribe(r => {
        this.seleccionarMateria();
      });

    }
    else if (this.estainscripto == 'no') {
      let rol = JSON.parse(localStorage.getItem("Rol"));
      let final = this.calificaciones.find(final => final.nota == 0 && final.tipoexamen == 'final');
      let obj: calificacionestudiante = new calificacionestudiante({ 'idestudiante': rol.id, 'nota': '11', 'idexamen': final.idexamen, 'id': '0' })
      this.servicio.addSingleAbm(obj, 'calificacionestudiante').subscribe(r => {
        this.seleccionarMateria();
      });
    }
  }

  sumarDias(fecha, dias) {
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
  }

  formatearFecha(f: any): string {
    let fecha: Date = new Date(f);
    let mes: string = (fecha.getMonth() + 1).toString();
    let dia: string = (fecha.getDate()).toString();
    if (mes.length < 2) { mes = '0' + mes; }
    if (dia.length < 2) { dia = '0' + dia; }
    return (dia + '-' + mes + '-' + fecha.getFullYear());
  }

}
