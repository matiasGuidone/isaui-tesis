import { Component, OnInit } from '@angular/core';
import { abm } from '../clases/abm';
import { examen } from '../clases/examen';
import { ModalService } from '../modal/modal-service.service';
import { PeticionesService } from '../services/peticiones.service';
import { Location } from '@angular/common';
import { materia } from '../clases/materia';
import { alumno } from '../clases/alumno';
import { calificacionalumno } from '../clases/calificacionalumno';
import { ExcelService } from '../services/excel.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-frm-carganotas',
  templateUrl: './frm-carganotas.component.html',
  styleUrls: ['./frm-carganotas.component.css']
})
export class FrmCarganotasComponent extends abm<examen> implements OnInit {

  materias: materia[];
  alumnos: alumno[];
  examenes: examen[];
  notas: calificacionalumno[];

  constructor(protected location: Location,
    protected modalService: ModalService,
    protected servicio: PeticionesService,
    protected excelservicio: ExcelService) {
    super(location, modalService, servicio);
    this.modalService.setCaseEstado('examen');
    this.servicio.loadGrilla('materia').subscribe(resultado => { this.materias = resultado; });
  }

  ngOnInit() {

  }

  //filtro para notas
  Numeros(id: string) {
    var out = document.getElementById(id)['value'];
    if (+out > 10) { out = '10'; }
    if (+out < 1) { out = '1'; }
    document.getElementById(id)['value'] = out;
    if (out != '1') { 
      let n : any =document.getElementById(id);
      n.select(); }
  }


  //evento para la selección de materias
  seleccionarMateria() {
    this.alumnos = new Array<alumno>();
    let id = document.getElementById('materia')['value'];
    this.servicio.loadGrilla('alumno', ['idmateria', id.toString()]).subscribe(alumnom => {
      if (alumnom != null && alumnom.length > 0) {
        this.alumnos = alumnom;
        //busco las notas y examenes de esa materia
        this.servicio.loadGrilla('examen', ['idmateria', id.toString()]).subscribe(exa => {
          this.examenes = exa;
          let filtro = new Array<string>();
          filtro.push("ids-examenes");
          for (let n of this.examenes) {
            filtro.push(n.id.toString());
          }
          if (filtro.length > 1) {
            this.servicio.loadGrilla('calificacionalumno', filtro).subscribe(notas => {
              this.notas = notas;
              if (this.notas != null) {
                for (let n of this.notas) {
                  let celda = document.getElementById(n.idalumno.toString() + "-" + n.idexamen.toString());
                  let text = document.getElementById("in-" + n.idalumno.toString() + "-" + n.idexamen.toString());
                  text['value'] = n.nota.toString();
                  if (n.nota > 7) { celda.style.backgroundColor = '#b6b9bb93'; }
                  else if (n.nota > 4) { celda.style.backgroundColor = '#696a6b93'; }
                  else { celda.style.backgroundColor = '#3e3f4193'; }
                }
              }
            });
          }
        });
      }
    });

  }

  //evento boton de guardado de nota
  guardarNota(idalumno, idexamen) {
    let obj = this.notas.find(nota => nota.idalumno == idalumno && nota.idexamen == idexamen);
    let idnota;
    if (obj == undefined || obj == null) { idnota = 0; }
    else { idnota = obj.id; }
    var nota = document.getElementById('in-' + idalumno.toString() + '-' + idexamen.toString())['value'];
    let calificacion = new calificacionalumno({ 'idalumno': idalumno.toString(), 'idexamen': idexamen.toString(), 'nota': nota, 'id': idnota.toString() })
    this.servicio.addSingleAbm(calificacion, 'calificacionalumno').subscribe(l => {
      let celda = document.getElementById(idalumno.toString() + '-' + idexamen.toString());
      if (+nota > 7) { celda.style.backgroundColor = '#ffe44c93'; }
      else if (+nota > 4) { celda.style.backgroundColor = '#d1b61a93'; }
      else { celda.style.backgroundColor = '#947f0793'; }
      let filtro = new Array<string>();
      filtro.push("ids-examenes");
      for (let n of this.examenes) {
        filtro.push(n.id.toString());
      }
      if (filtro.length > 1) {
        this.servicio.loadGrilla('calificacionalumno', filtro).subscribe(notas => {
          this.notas = notas;
        });
      }
    });

  }
  //pone visible el componente para crear una nueva calificacion
  nuevoexamen(){
    let not = document.getElementById("nota");
    if(not.style.display == 'none' || not.style.display == '')
      not.style.display="block";
    else
      not.style.display="none";
  }
  //pone no visible el componente para crear una nueva calificacion
  cerrarexamen(){
    let not = document.getElementById("nota");
    not.style.display="none";
  }
  //almacena la nueva calificacion para la materia
  guardarexamen(){ 
    let fecha = document.getElementById("fecha")['value'];
    let tipo = document.getElementById("tipo")['value'];
    let descripcion = document.getElementById("descripcion")['value'];
    let idmateria = document.getElementById('materia')['value'];
    let exam = new examen({'id':'0','fecha':fecha,'tipo':tipo,'observaciones': descripcion,'idmateria' : idmateria, 'idciclolectivo':'0'});
    this.servicio.addSingleAbm(exam,'examen').subscribe(r =>{
      this.seleccionarMateria();
      let not = document.getElementById("nota");
      not.style.display="none";
    });
     
  }
  //pone visible el componente para editar calificacion
  editarexamen(idexamen,num){
    let not = document.getElementById("editar-"+idexamen.toString());
    if(num==0)
      not.style.display="block";
      else
      not.style.display="none";
  }
  
  //almacena el examen editado
  guardarexameneditado(idexamen){ 
    let fecha = document.getElementById("fecha-"+idexamen.toString())['value'];
    let tipo = document.getElementById("tipo-"+idexamen.toString())['value'];
    let descripcion = document.getElementById("descripcion-"+idexamen.toString())['value'];
    let exame = this.examenes.find(exa => exa.id == idexamen); 
    let exam = new examen({'id': exame.id,'fecha':fecha,'tipo':tipo,'observaciones': descripcion,'idmateria' : exame.idmateria, 'idciclolectivo':exame.idciclolectivo});
    this.servicio.addSingleAbm(exam,'examen').subscribe(r =>{
      this.seleccionarMateria();
      let not = document.getElementById("editar-"+idexamen.toString());
      not.style.display="none";
    });
     
  }
  //exportar archivo de notas
  excelNotas(){
    let data : any[] = new Array<any>();
    for (let n of this.alumnos){ 
      let alu : any= new Object();
      alu['Alumnos'] = n.apellido+", "+n.nombre;
      for(let i of this.examenes){
        let no = this.notas.find(m => m.idalumno==n.id && m.idexamen== i.id);
        if(no != undefined){
          alu[i.tipo+"-"+i.fecha.toString().substring(0,10)] = no.nota;
        }
        else{
          alu[i.tipo+"-"+i.fecha.toString().substring(0,10)] = '-';
        }
      }
      data.push(alu);
    }
    this.excelservicio.exportAsExcelFile(data, "file.xlsx");
  }

}
