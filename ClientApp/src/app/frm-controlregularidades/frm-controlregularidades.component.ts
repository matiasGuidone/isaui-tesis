import { Component, OnInit } from '@angular/core';
import { estudiante } from '../clases/estudiante';
import { ModalService } from '../modal/modal-service.service';
import { AuthLoginService } from '../services/authlogin.service';
import { ExcelService } from '../services/excel.service';
import { PeticionesService } from '../services/peticiones.service';
import * as jspdf from 'jspdf';
import autoTable from 'jspdf-autotable'
import { logo64 } from '../filtro-abm/logo-base64';
import { ciclolectivo } from '../clases/ciclolectivo';
import { curso } from '../clases/curso';
import { materia } from '../clases/materia';

@Component({
  selector: 'app-frm-controlregularidades',
  templateUrl: './frm-controlregularidades.component.html',
  styleUrls: ['./frm-controlregularidades.component.css']
})
export class FrmControlregularidadesComponent implements OnInit {
  ciclos: ciclolectivo[];
  cursos: curso[];
  materias: materia[];
  estudiantes: estudiante[];
  idciclo: number = 0;
  condiciones: any[];

  constructor(protected modalService: ModalService,
    public servicio: PeticionesService,
    protected excelservicio: ExcelService,
    protected logservicio: AuthLoginService) {
    this.modalService.setCaseEstado('condestudiantes');
    this.condiciones = this.modalService.estados;

  }
  seleccionarMateria(ids = 0) {
    this.estudiantes = new Array<estudiante>();
    let id = ids;
    if (ids == 0) {
      id = document.getElementById('materia')['value'];
    }
    let filtros;
    if (this.idciclo == 0) {
      for (let c of this.ciclos) { if (c.id > this.idciclo) { this.idciclo = c.id; } }
    }

    filtros = ['idmateria', id.toString(), 'idciclolectivo', this.idciclo];
    this.servicio.loadGrilla('estudiante', filtros).subscribe(estudiantem => {
      if (estudiantem != null && estudiantem.length > 0) {
        this.estudiantes = estudiantem;
        //busco las notas y examenes de esa materia
        let filtroEx;
        if (this.idciclo != 0) { filtroEx = ['idmateria', id.toString(), 'idciclolectivo', this.idciclo.toString()]; }
        else { filtroEx = ['idmateria', id.toString()]; }

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

  ngOnInit() {

    this.servicio.loadGrilla('ciclolectivo').subscribe(ciclos => {
      this.ciclos = ciclos;
      this.servicio.loadGrilla('curso').subscribe(cursos => {
        this.cursos = cursos;
        this.servicio.loadGrilla('materia').subscribe(materias => {
          this.materias = materias;
          if (this.materias.length > 0) {
            this.seleccionarMateria(this.materias[0].id);
          }
        });

      });
    });
  }

  modificar(t, idestudiante) {
    if (t == 'n') {
      let condicion = document.getElementById('nota-' + idestudiante.toString())['value'];
      this.servicio.loadGrilla('estudiantemateria', [idestudiante, document.getElementById('materia')['value'], this.idciclo, 'estadonotas_i', condicion]).subscribe(materestudiante => {
        this.seleccionarMateria();
      });
    }
    else if (t == 'a') {
      let condicion = document.getElementById('asis-' + idestudiante.toString())['value'];
      this.servicio.loadGrilla('estudiantemateria', [idestudiante, document.getElementById('materia')['value'], this.idciclo, 'estadoasistencias_i', condicion]).subscribe(materestudiante => {
        this.seleccionarMateria();
      });
    }
  }

  seleccionarCiclo(){ 
    this.idciclo = document.getElementById('ciclolectivo')['value']; 
    this.seleccionarMateria();
  }
  public generarPDF() {
    const doc = new jspdf.jsPDF();
    let descripcion: string;
    //obtengo la imagen base64
    let base64Img = logo64.image;

    if (this.estudiantes.length > 0) {
      let pag = 1;
      let head = [[]];
      let body = new Array<any[]>();
      let fecha = this.stringFecha(new Date(), 'comp');
      let fechafile = this.stringFecha(new Date(), '');



      //se crea la descripción del encabezado
      descripcion = "Ciclo lectivo : " + this.ciclos.find(cl => cl.id == document.getElementById('ciclolectivo')['value']).nombre
        + ", Curso: " + this.cursos.find(cur => cur.id == document.getElementById('curso')['value']).nombre
        + ", Materia: " + this.materias.find(mat => mat.id == document.getElementById('materia')['value']).nombre
      let descrp_filtros = "Control de regularidades";

      head[0].push('Estudiante');
      head[0].push('Condición notas');
      head[0].push('Condición asistencias');


      for (let es of this.estudiantes) {
        let ar: any[] = new Array<any>();
        ar.push(es.apellido + ', ' + es.nombre);
        ar.push(es.condicion);
        ar.push(es.condiciona);
        body.push(ar);
      }

      autoTable(doc, {
        head: head,
        body: body,
        didDrawPage: function (data) {
          // Header
          doc.setFontSize(12);
          doc.setTextColor(40);

          if (base64Img) {
            doc.addImage(base64Img, 'JPEG', data.settings.margin.left, 5, 40, 12);
          }
          doc.text(descripcion, data.settings.margin.left, 22);
          doc.setFontSize(9);

          doc.text(descrp_filtros, data.settings.margin.left, 28);
          doc.text("Hora y fecha de emisión: " + fecha, 113, 14);
          doc.text("ISAUI - Autogestión ", 168, 10);
          // Footer
          var str = "Página " + data.pageNumber.toString();

          // Total page number plugin only available in jspdf v1.0+

          // // jsPDF 1.4+ uses getWidth, <1.4 uses .width
          var pageSize = doc.internal.pageSize;
          var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
          doc.text(str, data.settings.margin.left, pageHeight - 8);
        },
        margin: { top: 30 }
      });
      doc.save('Condiciones - ' + this.materias.find(mat => mat.id == document.getElementById('materia')['value']).nombre + '.pdf');

    }
    else {

    }
  }

  capitalizar(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  formatearFecha(f: any): string {
    let fecha: Date = new Date(f);
    let mes: string = (fecha.getMonth() + 1).toString();
    let dia: string = (fecha.getDate()).toString();
    if (mes.length < 2) { mes = '0' + mes; }
    if (dia.length < 2) { dia = '0' + dia; }
    return (dia + '-' + mes + '-' + fecha.getFullYear());
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
