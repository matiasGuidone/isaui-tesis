import { Component, OnInit } from '@angular/core';
import { PeticionesService } from '../services/peticiones.service';
import { materia } from '../clases/materia';
import { ModalService } from '../modal/modal-service.service';
import { MyModalComponent } from '../modal/MyModalComponent';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-frm-asistenciasestudiante',
  templateUrl: './frm-asistenciasestudiante.component.html',
  styleUrls: ['./frm-asistenciasestudiante.component.css']
})
export class FrmAsistenciasestudianteComponent implements OnInit {
  materias: materia[];
  asistencia: any;
  meses: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  constructor(private servicio: PeticionesService, private modalService: ModalService) {
    let rol = JSON.parse(localStorage.getItem("Rol"));
    if (rol.nombrerol.toString() == "Estudiante") {
      this.servicio.loadGrilla('materia', ['idestudiante', rol.id.toString()]).subscribe(resultado => {

        this.materias = resultado;
        this.materias.push(new materia({ 'id': '0', 'nombre': 'Todas', 'idcurso': '0' }));
        let d = new Date();
        let fechad = new Date(d.getFullYear(), 1, 1);//document.getElementById('desde')['value'];
        //let fechah = new Date(d.getFullYear(), d.getMonth(), this.diasEnUnMes(d.getFullYear(), d.getMonth()));
        this.servicio.loadGrilla('asistenciarepo', ['idestudiante', rol.id.toString(), 'totales', 'fecha desde', this.formatearFecha(fechad), 'fecha hasta', this.formatearFecha(d)]).subscribe(resultad => {
          if (resultad.length != 0) {
            this.asistencia = resultad[0];
            let porcentaje = (this.asistencia['modulosPresente'] / this.asistencia['cantidadModulos'] * 100).toString().substring(0, 5) + " %";
            let div = document.getElementById('porcentaje');
            div.innerHTML = '<div class="lead">Todas<br/>'+this.asistencia['modulosPresente'] +'/'+ this.asistencia['cantidadModulos']+'</div><br>' + porcentaje;
            div = document.getElementById('porc');
            this.setBackgrnd(div, this.asistencia['modulosPresente'] / this.asistencia['cantidadModulos'] * 100);
          }
          else {
            this.abrirModal("Datos filtrados", "No se encontraron datos con los criterios de búsqueda empleados", 2, null).subscribe(el => console.log(el));

          }
        });

      });
    }
  }

  ngOnInit() {
    // let semanaEnMilisegundos = 1000 * 60 * 60 * 24 * 6;
    // let desde = new Date(new Date().getTime() - semanaEnMilisegundos);
    // document.getElementById('desde')['value']= this.formatearFecha(desde);
    // document.getElementById('hasta')['value']= this.formatearFecha(new Date());
  }

  filtrar() {
    let rol = JSON.parse(localStorage.getItem("Rol"));
    let mater = this.materias.find(mater => mater.id == document.getElementById('materia')['value']);
    let mes = document.getElementById('mes')['value'];
    let d = new Date();
    let fechad = new Date(d.getFullYear(), 1, 1);//document.getElementById('desde')['value'];
    //let fechah = new Date(d.getFullYear(), +mes, this.diasEnUnMes(d.getFullYear(), +mes + 1));//document.getElementById('hasta')['value']; 
    if (mater.id == 0) {
      this.servicio.loadGrilla('asistenciarepo', ['idestudiante', rol.id.toString(), 'totales', 'fecha desde', this.formatearFecha(fechad), 'fecha hasta', this.formatearFecha(d)]).subscribe(resultad => {
        if (resultad.length != 0) {
          this.asistencia = resultad[0];
          let porcentaje = (this.asistencia['modulosPresente'] / this.asistencia['cantidadModulos'] * 100).toString().substring(0, 5) + " %";
          let div = document.getElementById('porcentaje');
          div.innerHTML = '<div class="lead">' + mater.nombre +'<br/>'+this.asistencia['modulosPresente'] +'/'+ this.asistencia['cantidadModulos']+'</div><br>' + porcentaje;
          div = document.getElementById('porc');
          this.setBackgrnd(div, this.asistencia['modulosPresente'] / this.asistencia['cantidadModulos'] * 100);
        }
        else {
          this.abrirModal("Datos filtrados", "No se encontraron datos con los criterios de búsqueda empleados", 2, null).subscribe(el => console.log(el));

        }
      });
    }
    else {
      this.servicio.loadGrilla('asistenciarepo', ['idestudiante', rol.id.toString(), 'idmateria', mater.id.toString(), 'fecha desde', this.formatearFecha(fechad), 'fecha hasta', this.formatearFecha(d)]).subscribe(resultad => {
        if (resultad.length != 0) {
          this.asistencia = resultad[0];
          let porcentaje = (this.asistencia['modulosPresente'] / this.asistencia['cantidadModulos'] * 100).toString().substring(0, 5) + " %";
          let div = document.getElementById('porcentaje');
          div.innerHTML = '<div class="lead">' + mater.nombre +'<br/>'+this.asistencia['modulosPresente'] +'/'+ this.asistencia['cantidadModulos']+'</div><br>' + porcentaje;
          div = document.getElementById('porc');
          this.setBackgrnd(div, this.asistencia['modulosPresente'] / this.asistencia['cantidadModulos'] * 100);
        }
        else {
          this.abrirModal("Datos filtrados", "No se encontraron datos con los criterios de búsqueda empleados", 2, null).subscribe(el => console.log(el));
        }
      });
    }
  }

  diasEnUnMes(mes, año) {
    return new Date(año, mes, 0).getDate();
  }

  formatearFecha(f: any) {

    let fecha: Date = new Date(f);
    let mes: string = (fecha.getMonth() + 1).toString();
    let dia: string = (fecha.getDate()).toString();
    if (mes.length < 2) { mes = '0' + mes; }
    if (dia.length < 2) { dia = '0' + dia; }
    return (fecha.getFullYear() + '-' + mes + '-' + dia);
  }
  setBackgrnd(div, value) {
    if (value < 20) {
      div.style.backgroundColor = "#e4263f59";
    }
    else if (value < 40) {
      div.style.backgroundColor = "#e4722659";
    }
    else if (value < 60) {
      div.style.backgroundColor = "#d1e4265b";
    }
    else if (value < 80) {
      div.style.backgroundColor = "#82e42659";
    }
    else {
      div.style.backgroundColor = "#18b81859";
    }

  }
  abrirModal(titulo: string, mensaje: string, tipo: number, menu: any): Observable<any> {
    const modalRef =
      this.modalService.open(MyModalComponent,
        { title: titulo, message: mensaje, tipo: tipo, parametros: menu });
    return modalRef.onResult();
  }
}
