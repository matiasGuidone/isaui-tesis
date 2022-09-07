import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';

//ventanas modales
import { MyModalComponent } from '../modal/MyModalComponent';
import { ModalService } from '../modal/modal-service.service';
import { Observable } from 'rxjs';
import { estudiante } from '../clases/estudiante';
import { PeticionesService } from '../services/peticiones.service';
import { asistencia } from '../clases/asistencia';
import { abm } from '../clases/abm';
import { materia } from '../clases/materia';
import { horasmateria } from '../clases/horasmateria';
import { AuthLoginService } from '../services/authlogin.service';
import { evento } from '../clases/evento';
import { ThrowStmt } from '@angular/compiler';

//ventanas modales

@Component({
  selector: 'app-frm-asistencia',
  templateUrl: './frm-asistencia.component.html',
  styleUrls: ['./frm-asistencia.component.css']
})
export class FrmAsistenciaComponent extends abm<asistencia> implements OnInit {

  //variables
  dias: any[] = new Array<any>();
  estudiantes: estudiante[] = new Array<estudiante>();
  materias: materia[] = new Array<materia>();
  hoy = new Date();
  hoyr = this.formatearFecha(new Date(), 'n');
  horamateria: horasmateria[] = new Array<horasmateria>();
  asistencias: asistencia[] = new Array<asistencia>();
  feriados: any[]= new Array<any>();
  iddocente = null;
  rol: any;
  cursos: any[];
  year: string;
  semanaEnMiliseg = 1000 * 60 * 60 * 24 * 6;
  semanaactual = 1;

  constructor(protected location: Location,
    protected modalService: ModalService,
    public servicio: PeticionesService,
    protected logservicio: AuthLoginService) {
    super(location, modalService, servicio, logservicio);
    //**array de dias */
    this.recalcularinicio(this.semanaactual);
    //let dia = 1000 * 60 * 60 * 12;

  }

  prevsemana(){
    this.semanaactual = this.semanaactual+(1.5);
    this.recalcularinicio(this.semanaactual, false);
  }
  segusemana(){
    this.semanaactual = this.semanaactual-(1.5);
    this.recalcularinicio(this.semanaactual, false);
  }

  recalcularinicio(arg0: number, reloaded = true) {
    this.dias = new Array<any>();
    let semanaEnMilisegundos = this.semanaEnMiliseg*arg0;
    let desde = new Date(this.hoy.getTime() - semanaEnMilisegundos);
    this.year = desde.getFullYear().toString();
    this.servicio.loadGrilla('evento',['tipo','feriado','ano',this.hoy.getFullYear().toString()]).subscribe(resul=>{
      desde = new Date(this.hoy.getTime() - semanaEnMilisegundos);
      for(let f of resul){
  //carga de feriados
        let eve = new evento({ 'id': f.id, 'idmateria': f.idmateria, 'fechafin': f.fechafin, 'fechainicio': f.fechainicio, 'nombre': f.nombre, 'tipo': f.tipo });
        if ( eve.fechainicio <= this.hoy && eve.fechainicio >= desde){
          this.feriados.push(this.formatearFecha(eve.fechainicio,''));
          if(this.formatearFecha(eve.fechainicio,'')!= this.formatearFecha(eve.fechafin,'')){
            let daux = new Date();
            daux.setDate(eve.fechainicio.getDate() + 1);
            for(let n of this.dias){
              this.feriados.push(this.formatearFecha(daux,''));
              if(this.formatearFecha(daux,'') == this.formatearFecha(eve.fechafin,'')){
                break;
              }
              else{daux.setDate(daux.getDate() + 1);}
            }
          }
        }
      }
    });

    let semana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    for (var i = 0; i < 17; i++) {
        this.dias.push({ 'numero': this.formatearFecha(desde, ''), 'diasemana': desde.getUTCDay(), 'sem': semana[desde.getUTCDay()] });
        desde.setDate(desde.getDate() + 1);
    }
    this.rol = JSON.parse(localStorage.getItem("Rol"));
    if(reloaded){
      if(this.rol.nombrerol.toString()=="Docente"){
            this.servicio.loadGrilla('materia',['iddocente',this.rol.id.toString()]).subscribe(resultado => { this.materias = resultado; this.seleccionarMateria(this.materias[0].id); });
          }
          else{
            this.servicio.loadGrilla('curso').subscribe(cursos => {
              this.cursos = cursos;
          this.servicio.loadGrilla('materia').subscribe(resultado => { this.materias = resultado; this.seleccionarMateria(this.materias[0].id); });});
          }
    }
    else{
      this.seleccionarMateria(document.getElementById('materia')['value']);
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

  seleccionarMateria(idin = null) {
    document.getElementById('aceptar').style.display='none';
    this.estudiantes = new Array<estudiante>();

    let id = document.getElementById('materia')['value'];
    if(id==""||id==null){
      id=idin;
    }
    this.servicio.loadGrilla('estudiante', ['idmateria', id.toString()]).subscribe(estudiantem => {
      if (estudiantem != null && estudiantem.length > 0) {
        this.estudiantes = estudiantem;
        this.cargarGrilla();
      }
    });

  }
  seleccionarCurso(ids = 0) {
    //this.estudiantes = new Array<estudiante>();
    let id = ids;
    if (ids == 0) {
      id = document.getElementById('curso')['value'];
    }
    let filtros = new Array<string>();
    filtros.push('idcurso');
    filtros.push(id.toString());
    this.servicio.loadGrilla('materia', filtros).subscribe(materias => {
      this.materias = materias;
      if (this.materias.length > 0) {
        this.seleccionarMateria(this.materias[0].id);
      }
    });

  }


  cargarGrilla(){
        this.servicio.loadGrilla('horasmateria', ['idmateria', document.getElementById('materia')['value']])
          .subscribe(hor => {
            this.horamateria = hor;
            let filter = ['idmateria',document.getElementById('materia')['value']]
            if(this.semanaactual != 1){
              let fecha = new Date();
              fecha.setDate(fecha.getDate() + (this.semanaactual - 1) * 7 *(-1));
              filter = ['idmateria',document.getElementById('materia')['value'], 'fecha' , fecha.toLocaleString() ]
            }
            this.servicio.loadGrilla('asistencia',filter)
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
                for (var i = 0; i < this.estudiantes.length; i++) {
                  let celda = document.getElementById('celda' + m.numero.toString() + '-' + i.toString());
                  let year = new Date().getFullYear();
                  let f = new Date(year.toString()+'-'+m.numero.toString().substring(3,5)+"-"+m.numero.toString().substring(0,2));
                  let f2 = new Date(year.toString()+'-'+this.hoyr.substring(3,5)+"-"+this.hoyr.substring(0,2));
                  if ( f > f2 ){
                  celda.style.backgroundColor = "#22587c93";
                  celda.style.border = "1px solid #308bc8";}
                  else{
                    celda.style.backgroundColor = "#308bc893";
                  celda.style.border = "1px solid #308bc8";
                  }
                  if ( f <= f2 && !filtro.find(c =>c == m.numero.toString()) && !this.feriados.find(c =>c == m.numero.toString())) {
                    const ass = document.createElement('input');
                    ass.type = "checkbox";
                    ass.style.width = "15px"
                    //ass.onclick = function(){return false;}
                    ass.className = "btn-info";
                    ass.checked = true;
                    ass.id = this.estudiantes[i].id.toString() + '-' + n.id.toString();
                    celda.appendChild(ass);
                    // si existen registros para aprobar se habilita el botón aceptar
                    document.getElementById('aceptar').style.display='block';

                  }
                  else if(filtro.find(c =>c == m.numero.toString())){
                    celda.style.backgroundColor = "#22587c93";
                    celda.style.border = "1px solid #308bc8";
                  }
                  else if(this.feriados.find(c =>c == m.numero.toString())){
                    celda.style.backgroundColor = "#92430fc2";
                    celda.style.border = "1px solid #d36014";
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
              for (var i = 0; i < this.estudiantes.length; i++) {
                let celda = document.getElementById('celda' + m.numero.toString() + '-' + i.toString());
                celda.style.backgroundColor = "#68708ac5";
              }
            }
            for (var i = 0; i < this.estudiantes.length; i++) {
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
      for (var i = 0; i < this.estudiantes.length; i++) {

        let ass = document.getElementById(this.estudiantes[i].id.toString() + '-' + m.id.toString());

        if(ass!= null){
          let nodesii = document.querySelectorAll(`[id='${this.estudiantes[i].id.toString() + '-' + m.id.toString()}']`);
          if (nodesii.length > 1){
            nodesii.forEach(element => {
              let d = this.dias.filter(dia => dia.diasemana == m.numsemana);
              for (let dater of d){

                if(element['checked'] == true){
                  let date = new Date().getFullYear()+'-'+dater.numero.substring(3,5)+'-'+dater.numero.substring(0,2);
                  let dda = new Date(date);
                  let ifexist = asistencias.find(val => ( val.fecha.toLocaleDateString() == dda.toLocaleDateString() && val.idhoramateria == m.id && val.idestudiante == this.estudiantes[i].id ) );
                  if(!ifexist){
                    asistencias.push(new asistencia({ 'id': '0', 'fecha': date, 'idhoramateria': m.id.toString(), 'idestudiante': this.estudiantes[i].id.toString() }));
                  }

                }
                else{
                  let date = new Date().getFullYear()+'-'+dater.numero.substring(3,5)+'-'+dater.numero.substring(0,2);
                  let dda = new Date(date)
                  let ifexist = asistencias.findIndex(val => ( val.fecha.toLocaleDateString() == dda.toLocaleDateString() && val.idhoramateria == m.id && val.idestudiante == this.estudiantes[i].id ) );
                  if(ifexist >= 0){
                    asistencias.splice(ifexist,1);
                  }
                }

              }

            });
          }
          else{
             if (ass['checked'] == true) {
              let d = this.dias.find(dia => dia.diasemana == m.numsemana);
              let date = new Date().getFullYear()+'-'+d.numero.substring(3,5)+'-'+d.numero.substring(0,2);
              asistencias.push(new asistencia({ 'id': '0', 'fecha': date, 'idhoramateria': m.id.toString(), 'idestudiante': this.estudiantes[i].id.toString() }));
            }
          }


        }
      }
      }
      console.log(asistencias);
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
      let nn = document.getElementById(this.estudiantes[ind].id.toString()+'-'+g);
      if(nn['checked']== true){nn['checked']=false;}
      else{nn['checked']=true;}
    }
  }

}
