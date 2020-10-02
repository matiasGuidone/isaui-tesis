import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';

//ventanas modales
import { MyModalComponent } from '../modal/MyModalComponent';
import { ModalService } from '../modal/modal-service.service';
import { Observable } from 'rxjs';
import { alumno } from '../clases/alumno';
import { PeticionesService } from '../services/peticiones.service';
import { asistencia } from '../clases/asistencia';
import { abm } from '../clases/abm';
import { materia } from '../clases/materia';
import { horasmateria } from '../clases/horasmateria';
import { AuthLoginService } from '../services/authlogin.service';

//ventanas modales

@Component({
  selector: 'app-frm-asistencia',
  templateUrl: './frm-asistencia.component.html',
  styleUrls: ['./frm-asistencia.component.css']
})
export class FrmAsistenciaComponent extends abm<asistencia> implements OnInit {
  dias: any[] = new Array<any>();
  alumnos: alumno[] = new Array<alumno>();
  materias: materia[] = new Array<materia>();
  hoy = new Date();
  hoyr = this.formatearFecha(new Date(), 'n');
  horamateria: horasmateria[] = new Array<horasmateria>();
  asistencias: asistencia[] = new Array<asistencia>();
  iddocente = null;
  constructor(protected location: Location,
    protected modalService: ModalService,
    protected servicio: PeticionesService,
    protected logservicio: AuthLoginService) {
    super(location, modalService, servicio, logservicio);
    //**array de dias */
    let semanaEnMilisegundos = 1000 * 60 * 60 * 24 * 6;
    //let dia = 1000 * 60 * 60 * 12;

    let desde = new Date(this.hoy.getTime() - semanaEnMilisegundos);
    let semana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    for (var i = 0; i < 13; i++) {
        this.dias.push({ 'numero': this.formatearFecha(desde, ''), 'diasemana': desde.getUTCDay(), 'sem': semana[desde.getUTCDay()] });
        desde.setDate(desde.getDate() + 1); 
    }
    let rol = JSON.parse(localStorage.getItem("Rol"));
     if(rol.nombrerol.toString()=="Docente"){
      this.servicio.loadGrilla('materia',['iddocente',rol.id.toString()]).subscribe(resultado => { this.materias = resultado; });
     }
    
  }

  ngOnInit(): void {

  }

  formatearFecha(f: any, tipo) {

    let fecha: Date = new Date(f);
    let mes: string = (fecha.getMonth() + 1).toString();
    let dia: string = (fecha.getDate()).toString();
    if (mes.length < 2) { mes = '0' + mes; }
    if (dia.length < 2) { dia = '0' + dia; }
    if (tipo == 'n') {
      dia = (fecha.getDate()).toString();
      if (dia.length == 1) {
        dia = '0' + dia;
      }
    }
    if (tipo == 'c') { return (fecha.getFullYear() + '-' + mes + '-' + dia); }
    else return (dia + '-' + mes);
  }

  seleccionarMateria() {
    document.getElementById('aceptar').style.display='none';
    this.alumnos = new Array<alumno>();
    let id = document.getElementById('materia')['value'];
    this.servicio.loadGrilla('alumno', ['idmateria', id.toString()]).subscribe(alumnom => {
      if (alumnom != null && alumnom.length > 0) {
        this.alumnos = alumnom;
        this.cargarGrilla();
      }
    });

  }

 
  cargarGrilla(){
        this.servicio.loadGrilla('horasmateria', ['idmateria', document.getElementById('materia')['value']])
          .subscribe(hor => {
            this.horamateria = hor;
            this.servicio.loadGrilla('asistencia',['idmateria',document.getElementById('materia')['value']])
              .subscribe(res =>{
                this.asistencias= res;
              
            //carga de materias en la grilla
            for (let n of this.horamateria) {
              let dias = new Array<any>();
              this.dias.forEach(element => {
                if (element.diasemana == n.numsemana) {
                  dias.push(element);
                }
              });

              //filtro para días donde ya se tomaron asistencias
              let filtro = new Array<string>();
              for(let de of dias) {
                if(this.asistencias.length>0){
                  if(this.asistencias.find(as => this.formatearFecha(as.fecha,'') == de.numero)){
                      filtro.push(de.numero);
                }
              }
              }

              for (let m of dias) {
                for (var i = 0; i < this.alumnos.length; i++) {
                  let celda = document.getElementById('celda' + m.numero.toString() + '-' + i.toString());
                  
                  let f = new Date("2020-"+m.numero.toString().substring(3,5)+"-"+m.numero.toString().substring(0,2));
                  let f2 = new Date("2020-"+this.hoyr.substring(3,5)+"-"+this.hoyr.substring(0,2));
                  if ( f > f2 ){
                  celda.style.backgroundColor = "#22587c93";
                  celda.style.border = "1px solid #308bc8";}
                  else{
                    celda.style.backgroundColor = "#308bc893";
                  celda.style.border = "1px solid #308bc8";
                  }
                  if ( f <= f2 && !filtro.find(c =>c == m.numero.toString())) {
                    const ass = document.createElement('input');
                    ass.type = "checkbox";
                    ass.style.width = "15px"
                    ass.className = "btn-info";
                    ass.checked = true;
                    ass.id = this.alumnos[i].id.toString() + '-' + n.id.toString();
                    celda.appendChild(ass);
                    // si existen registros para aprobar se habilita el botón aceptar
                    document.getElementById('aceptar').style.display='block';
                
                  }
                }
              }
            }
            //agregado de fines de semana y día actual
            let findes = new Array<any>();
            for (let i of this.dias) {
              if (i.diasemana == 6 || i.diasemana == 0) {
                findes.push(i);
              }
            }
            for (let m of findes) {
              for (var i = 0; i < this.alumnos.length; i++) {
                let celda = document.getElementById('celda' + m.numero.toString() + '-' + i.toString());
                celda.style.backgroundColor = "#68708ac5";
              }
            }
            for (var i = 0; i < this.alumnos.length; i++) {
              let celda = document.getElementById('celda' + this.hoyr + '-' + i.toString());
              celda.style.backgroundColor = "#17a8958a";
            }
          });
    });
  }

  celdaEstilo(dia): string {
    if (dia == 6 || dia == 0) {
      return 'background-color:#b6b9bb93';
    }
    else return 'background-color: white'
  }

  registrarAsistencias() {
    let asistencias = new Array<asistencia>();

    for (let m of this.horamateria) {
      for (var i = 0; i < this.alumnos.length; i++) {

        let ass = document.getElementById(this.alumnos[i].id.toString() + '-' + m.id.toString());
        if(ass!= null){
        if (ass['checked'] == true) {
              let d = this.dias.find(dia => dia.diasemana == m.numsemana);
              let date = new Date().getFullYear()+'-'+d.numero.substring(3,5)+'-'+d.numero.substring(0,2);
              asistencias.push(new asistencia({ 'id': '0', 'fecha': date, 'idhoramateria': m.id.toString(), 'idalumno': this.alumnos[i].id.toString() }));
            
          }

        }
      }
      }
    this.servicio.addSingleAbm(asistencias,'asistencia').subscribe(res =>{
      this.abrirModal('Almacenado exitoso','El registro de asistencias se concretó con éxito', 2, i).subscribe(r =>{
        this.seleccionarMateria();
      });
    });

  }

  cambiarCheck(dia, ind){
    let r = new Array<string>();
    for(let d of this.horamateria){
      if(d.numsemana==dia.diasemana){
        r.push(d.id.toString());
      }
    }
    for(let g of r) {
      let nn = document.getElementById(this.alumnos[ind].id.toString()+'-'+g);
      if(nn['checked']== true){nn['checked']=false;}
      else{nn['checked']=true;}
    }
  }

}