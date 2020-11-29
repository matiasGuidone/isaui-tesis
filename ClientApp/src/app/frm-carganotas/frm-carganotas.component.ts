import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
import { AuthLoginService } from '../services/authlogin.service';
import * as jspdf from 'jspdf';
import autoTable from 'jspdf-autotable'
import { logo64 } from '../filtro-abm/logo-base64';
import { MyModalComponent } from '../modal/MyModalComponent';
import { datoadjunto } from '../clases/datoadjunto';
import { ciclolectivo } from '../clases/ciclolectivo';

@Component({
  selector: 'app-frm-carganotas',
  templateUrl: './frm-carganotas.component.html',
  styleUrls: ['./frm-carganotas.component.css']
})
export class FrmCarganotasComponent extends abm<examen> implements OnInit {
  idciclo = 0;
  materias: materia[] = new Array<materia>();
  alumnos: alumno[] = new Array<alumno>();
  examenes: examen[] = new Array<examen>();
  notas: calificacionalumno[];
  /*   @Input() esRelacion: boolean = false;
    @Output() emisorId = new EventEmitter<string[]>(); */
  iddocente = null;
  ciclos: ciclolectivo[];

  constructor(protected location: Location,
    protected modalService: ModalService,
    protected servicio: PeticionesService,
    protected excelservicio: ExcelService,
    protected logservicio: AuthLoginService) {
    super(location, modalService, servicio, logservicio);
    this.modalService.setCaseEstado('examen');
    //--
    let rol = JSON.parse(localStorage.getItem("Rol"));
    this.servicio.loadGrilla('ciclolectivo').subscribe(ciclos => {
      this.ciclos = ciclos;
    if (rol.nombrerol.toString() == "Docente") {
      this.servicio.loadGrilla('materia', ['iddocente', rol.id.toString()]).subscribe(resultado => {
        this.materias = resultado;
        if (this.materias.length > 0) {
          this.seleccionarMateria(this.materias[0].id);
        }
      });

    }
    else {
      this.servicio.loadGrilla('materia').subscribe(resultado => { this.materias = resultado; if (this.materias.length > 0) { this.seleccionarMateria(this.materias[0].id); } });
    }
  });

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
      let n: any = document.getElementById(id);
      n.select();
    }
  }

  seleccionarCiclo(){
    this.idciclo = document.getElementById('ciclolectivo')['value'];
    this.seleccionarMateria();
  }
  //evento para la selección de materias
  seleccionarMateria(ids = 0) {
    this.alumnos = new Array<alumno>();
    let id = ids;
    if (ids == 0) {
      id = document.getElementById('materia')['value'];
    }
    let filtros ;
    if (this.idciclo==0){
      for(let c of this.ciclos){if(c.id>this.idciclo){this.idciclo=c.id;}}
    }
     
    filtros=  ['idmateria', id.toString(),'idciclolectivo',this.idciclo];
    this.servicio.loadGrilla('alumno',filtros).subscribe(alumnom => {
      if (alumnom != null && alumnom.length > 0) {
        this.alumnos = alumnom;
        //busco las notas y examenes de esa materia
        let filtroEx;
        if (this.idciclo!=0){filtroEx =  ['idmateria', id.toString(),'idciclolectivo',this.idciclo.toString()];}
        else{filtroEx =  ['idmateria', id.toString()];}
        this.servicio.loadGrilla('examen', filtroEx).subscribe(exa => {
          this.examenes = exa;
          let filtro = new Array<string>();
          filtro.push("ids-examenes");
          for (let n of this.examenes) {
            filtro.push(n.id.toString());
          }
          let finales = new Array<any>();
          for (let e of this.examenes) {
            if (e.tipo == 'final') {
              finales.push(e);
            }
          }
          if (filtro.length > 1) {
            this.servicio.loadGrilla('calificacionalumno', filtro).subscribe(notas => {
              this.notas = notas;
              if (this.notas != null) {
                for (let n of this.notas) {
                  //celda de nota
                  let celda = document.getElementById(n.idalumno.toString() + "-" + n.idexamen.toString());
                  //input de nota
                  let text = document.getElementById("in-" + n.idalumno.toString() + "-" + n.idexamen.toString());

                  text['value'] = n.nota.toString();

                  if (n.nota > 7) { celda.style.backgroundColor = '#b6b9bb93'; }
                  else if (n.nota > 4) { celda.style.backgroundColor = '#696a6b93'; }
                  else { celda.style.backgroundColor = '#3e3f4193'; }

                }
                //examenes finales
                for (let fin of finales) {
                  for (let alu of this.alumnos) {
                    //celda de nota
                    let celda = document.getElementById(alu.id.toString() + "-" + fin.id.toString());
                    //input de nota
                    let text = document.getElementById("in-" + alu.id.toString() + "-" + fin.id.toString());
                    //boton de nota
                    let btn = document.getElementById("btn-" + alu.id.toString() + "-" + fin.id.toString());
                    if (text['value'] == 11) {
                      text['value'] = '';
                    }
                    else if (text['value'] == 0 || text['value'] == '') {
                      text.style.display = 'none';
                      btn.style.display = 'none';
                    }
                    else {
                      btn.style.display = 'none';
                    }
                  }
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
  nuevoexamen() {
    let not = document.getElementById("nota");
    if (not.style.display == 'none' || not.style.display == '')
      not.style.display = "block";
    else
      not.style.display = "none";
  }
  //pone no visible el componente para crear una nueva calificacion
  cerrarexamen() {
    let not = document.getElementById("nota");
    not.style.display = "none";
  }
  //almacena la nueva calificacion para la materia
  guardarexamen() {
    let fecha = document.getElementById("fecha")['value'];
    let tipo = document.getElementById("tipo")['value'];
    let descripcion = document.getElementById("descripcion")['value'];
    let idmateria = document.getElementById('materia')['value'];
    let exam = new examen({ 'id': '0', 'fecha': fecha, 'tipo': tipo, 'observaciones': descripcion, 'idmateria': idmateria, 'idciclolectivo': '0' });
    this.servicio.addSingleAbm(exam, 'examen').subscribe(r => {
      this.seleccionarMateria();
      let not = document.getElementById("nota");
      not.style.display = "none";
    });

  }
  //pone visible el componente para editar calificacion
  editarexamen(idexamen, num) {
    let not = document.getElementById("editar-" + idexamen.toString());
    if (num == 0)
      not.style.display = "block";
    else
      not.style.display = "none";
  }

  //almacena el examen editado
  guardarexameneditado(idexamen) {
    let fecha = document.getElementById("fecha-" + idexamen.toString())['value'];
    let tipo = document.getElementById("tipo-" + idexamen.toString())['value'];
    let descripcion = document.getElementById("descripcion-" + idexamen.toString())['value'];
    let exame = this.examenes.find(exa => exa.id == idexamen);
    let exam = new examen({ 'id': exame.id, 'fecha': fecha, 'tipo': tipo, 'observaciones': descripcion, 'idmateria': exame.idmateria, 'idciclolectivo': exame.idciclolectivo });
    this.servicio.addSingleAbm(exam, 'examen').subscribe(r => {
      this.seleccionarMateria();
      let not = document.getElementById("editar-" + idexamen.toString());
      not.style.display = "none";
    });

  }
  //exportar archivo de notas
  excelNotas() {
    let data: any[] = new Array<any>();
    for (let n of this.alumnos) {
      let alu: any = new Object();
      alu['Alumnos'] = n.apellido + ", " + n.nombre;
      for (let i of this.examenes) {
        let no = this.notas.find(m => m.idalumno == n.id && m.idexamen == i.id);
        if (no != undefined) {
          if (no.nota == 11) {
            alu[i.tipo + "-" + i.fecha.toString().substring(0, 10)] = 'inscripto';
          }
          else {
            alu[i.tipo + "-" + i.fecha.toString().substring(0, 10)] = no.nota;
          }
        }
        else {
          alu[i.tipo + "-" + i.fecha.toString().substring(0, 10)] = '-';
        }
      }
      data.push(alu);
    }
    this.excelservicio.exportAsExcelFile(data, 'Notas-' + this.materias.find(materia => materia.id == document.getElementById('materia')['value']).nombre + '.xlsx');
  }
  //exportar archivo de notas
  pdfNotas() {
    let fecha = this.stringFecha(new Date(), 'comp');
    let fechafile = this.stringFecha(new Date(), '');
    let head = [[]];
    let body = new Array<any[]>();
    const doc = new jspdf.jsPDF();
    let descripcion: string;
    //obtengo la imagen base64
    let base64Img = logo64.image;
    let data: any[] = new Array<any>();
    for (let n of this.alumnos) {
      let alu: any = new Object();
      alu['Alumnos'] = n.apellido + ", " + n.nombre;
      for (let i of this.examenes) {
        let no = this.notas.find(m => m.idalumno == n.id && m.idexamen == i.id);
        if (no != undefined) {
          if (no.nota == 11) {
            alu[i.tipo + "-" + i.fecha.toString().substring(0, 10)] = 'inscripto';
          }
          else {
            alu[i.tipo + "-" + i.fecha.toString().substring(0, 10)] = no.nota;
          }
        }
        else {
          alu[i.tipo + "-" + i.fecha.toString().substring(0, 10)] = '-';
        }
      }
      data.push(alu);
    }
    //this.excelservicio.exportAsExcelFile(data, "file.xlsx");

    for (let m in data[0]) {
      head[0].push(m);
    }

    for (var i in data) {
      let ar: any[] = new Array<any>();
      for (var j in data[i]) {
        ar.push(data[i][j]);
      }
      body.push(ar);
    }
    let desc = 'Notas de la materia ' + this.materias.find(materia => materia.id == document.getElementById('materia')['value']).nombre;
    autoTable(doc, {
      head: head,
      body: body,
      didDrawPage: function (dat) {
        // Header
        doc.setFontSize(12);
        doc.setTextColor(40);

        if (base64Img) {
          doc.addImage(base64Img, 'JPEG', dat.settings.margin.left, 5, 40, 12);
        }
        doc.text(desc, dat.settings.margin.left, 22);
        doc.setFontSize(9);

        //doc.text(, data.settings.margin.left, 28);
        doc.text("Hora y fecha de emisión: " + fecha, 113, 14);
        doc.text("ISAUI - Autogestión ", 168, 10);
        // Footer
        var str = "Página " + dat.pageNumber.toString();

        // Total page number plugin only available in jspdf v1.0+

        // // jsPDF 1.4+ uses getWidth, <1.4 uses .width
        var pageSize = doc.internal.pageSize;
        var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
        doc.text(str, dat.settings.margin.left, pageHeight - 8);
      },
      margin: { top: 30 }
    });
    doc.save('Notas-' + this.materias.find(materia => materia.id == document.getElementById('materia')['value']).nombre + '.pdf');

  }


  stringFecha(fecha: Date, t: string): string {
    if (t == 'comp') {
      let meses: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
      let formatFecha: string = '';
      formatFecha += fecha.getHours().toString() + ":";
      formatFecha += fecha.getMinutes().toString() + ":";
      formatFecha += fecha.getSeconds().toString() + " - ";
      formatFecha += fecha.getDate().toString();
      formatFecha += ' de ' + meses[fecha.getMonth()];
      formatFecha += ' del ' + fecha.getFullYear().toString();
      return formatFecha;
    }
    else {
      let formatFecha: string = '';
      formatFecha += fecha.getHours().toString() + "-";
      formatFecha += fecha.getMinutes().toString() + "-";
      formatFecha += fecha.getSeconds().toString() + "-";
      formatFecha += fecha.getDate().toString();
      formatFecha += '-' + (fecha.getMonth() + 1).toString();
      formatFecha += '-' + fecha.getFullYear().toString();
      return formatFecha;
    }
  }
}
