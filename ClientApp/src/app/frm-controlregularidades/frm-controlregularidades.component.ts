import { Component, OnInit } from '@angular/core';
import { estudiante } from '../clases/estudiante';
import { ModalService } from '../modal/modal-service.service';
import { AuthLoginService } from '../services/authlogin.service';
import { ExcelService } from '../services/excel.service';
import { PeticionesService } from '../services/peticiones.service';

@Component({
  selector: 'app-frm-controlregularidades',
  templateUrl: './frm-controlregularidades.component.html',
  styleUrls: ['./frm-controlregularidades.component.css']
})
export class FrmControlregularidadesComponent implements OnInit {
  ciclos: any[];
  materias: any[];
  estudiantes: any[];
  idciclo: number = 0;
  condiciones: any[];

  constructor(protected modalService: ModalService,
    protected servicio: PeticionesService,
    protected excelservicio: ExcelService,
    protected logservicio: AuthLoginService) {
      this.modalService.setCaseEstado('condestudiantes');
      this.condiciones = this.modalService.estados;
      
    this.servicio.loadGrilla('ciclolectivo').subscribe(ciclos => {
      this.ciclos = ciclos;
      this.servicio.loadGrilla('materia').subscribe(resultado => {
        this.materias = resultado;
        if (this.materias.length > 0) {
          this.seleccionarMateria(this.materias[0].id);
        }
      });
    });
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

  ngOnInit() {
  }

  modificar(t, idestudiante) {
    if(t == 'n'){
      let condicion = document.getElementById('nota-'+idestudiante.toString())['value'];
      this.servicio.loadGrilla('estudiantemateria', [idestudiante, document.getElementById('materia')['value'],  this.idciclo, 'estadonotas_i', condicion]).subscribe(materestudiante => {
        this.seleccionarMateria();
      });
    }
    else if(t == 'a'){
      let condicion = document.getElementById('asis-'+idestudiante.toString())['value'];
      this.servicio.loadGrilla('estudiantemateria', [idestudiante, document.getElementById('materia')['value'],  this.idciclo, 'estadoasistencias_i', condicion]).subscribe(materestudiante => {
        this.seleccionarMateria();
      });
    }
  }
}
