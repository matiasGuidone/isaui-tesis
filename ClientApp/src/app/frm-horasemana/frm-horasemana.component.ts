import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';

//ventanas modales
import { MyModalComponent } from '../modal/MyModalComponent';
import { ModalService } from '../modal/modal-service.service';
import { Observable } from 'rxjs'; 
import { PeticionesService } from '../services/peticiones.service';
 import { abm } from '../clases/abm';
import { horasdia } from '../clases/horasdia';
import { curso } from '../clases/curso';
import { materia } from '../clases/materia';
import { carrera } from '../clases/carrera';
import { horasmateria } from '../clases/horasmateria';
import { componentFactoryName } from '@angular/compiler';
import * as jspdf from 'jspdf';  
import { logo64 } from '../filtro-abm/logo-base64';
import * as html2canvas from 'html2canvas';


//ventanas modales

@Component({
  selector: 'app-frm-horasemana',
  templateUrl: './frm-horasemana.component.html',
  styleUrls: ['./frm-horasemana.component.css']
})
export class FrmHoraSemanaComponent extends abm<horasdia> implements OnInit {
  
  ultimoeditor: string = '';
  //arrays de interacción
  horas: horasdia[] = new Array<horasdia>();
  cursos: curso[] = new Array<curso>();
  materias: materia[] = new Array<materia>();
  carreras: carrera[] = new Array<carrera>();
  horasmaterias: any[] = new Array<any>();
  celdaActual: HTMLElement;

  constructor(protected location: Location,
    protected modalService: ModalService,
    protected servicio: PeticionesService) {
    super(location, modalService, servicio);
    
  } 
  
  ngOnInit(): void {
    this.servicio.loadGrilla('horasdia').subscribe(res =>{this.horas = res;});
    this.servicio.loadGrilla('carrera').subscribe(res =>{
      this.carreras = res;
      if (this.carreras.length > 0){
        this.servicio.loadGrilla('curso', ['idcarrera', this.carreras[0].id.toString()])
        .subscribe(res =>{this.cursos = res;
        if (this.cursos.length>0){
          this.servicio.loadGrilla('materia',['idcurso',this.cursos[0].id.toString()]).subscribe(materias =>{
            this.materias = materias;
            if (this.materias.length > 0){
              this.buscarHoras(this.materias, this.materias.length-1);
            }
          });
        }});
      }});
  }

  buscarHoras(materias, i: number) {
    this.servicio.loadGrilla('horasmateria',['idmateria', materias[i].id.toString()]).subscribe(r => {
        for (let res of r){this.horasmaterias.push(res);}

        if (i > 0) { this.buscarHoras(materias, i - 1); }
        else if(i==0) {
          for (let modulo of this.horasmaterias){
              let h = this.horas.find(hora => hora.id == modulo.idhoradia);
              let celda = document.getElementById('celda'+h.numorden.toString()+'-'+modulo.numsemana.toString());
              celda.style.backgroundColor = this.getColor(modulo.idmateria);
              let mat = this.materias.find(materia => materia.id == modulo.idmateria).nombre;
              const desc = document.createElement('div');
              const small = document.createElement('small');
              small.append(mat);//.substr(0,5)+'-'+mat.slice(-1));
              desc.append(small);
              desc.style.whiteSpace='nowrap';
              desc.style.overflow='hidden';
              desc.style.minWidth='60px'
              desc.style.maxWidth='80px'
              desc.id = 'child';
              celda.appendChild(desc);
          } 
        }
    });
}
 
//abre el diálogo para editar un módulo
  dialogoSetear(hora, dia){
    this.celdaActual = document.getElementById('celda'+hora+'-'+dia);
    let edi = 'editor'+hora.toString()+'-'+dia.toString();
     if (this.ultimoeditor == edi) {return;}
     let ed = document.getElementById(edi);
     ed.style.display = 'block';
     if (this.ultimoeditor!= '')
        {document.getElementById(this.ultimoeditor).style.display = 'none';}
     this.ultimoeditor = edi;
  }

  //cierra el diálogo
  cerraredit(hora, dia){
    let edi = 'editor'+hora.toString()+'-'+dia.toString();
    let ed = document.getElementById(edi);
     ed.style.display = 'none'; 
  }

  guardarModulo(hora, dia, id){
    //let celda = document.getElementById('celda'+hora+'-'+dia);
    let ids = 0;
    //si la celda tiene color quiere decir que el módulo ya está ocupado por otra materia
    if (this.celdaActual.style.backgroundColor != "" ){
      ids = this.horasmaterias.find(horamateria => horamateria.idhoradia == id && horamateria.numsemana == dia).id;
    }
    let idmateria = document.getElementById('materia'+hora.toString()+'-'+dia.toString())['value']; 
    let modulo = new horasmateria({'id': ids.toString(), 'idmateria':idmateria.toString(), 'idhoradia':id.toString(), 'numsemana':dia.toString()})
    this.servicio.addSingleAbm(modulo, 'horasmateria').subscribe(s =>{this.refrescarTabla();});
  }
  limpiarModulo(hora, dia, id){
    //let celda = document.getElementById('celda'+hora+'-'+dia);
    let ids = 0;
    //si la celda tiene color quiere decir que el módulo ya está ocupado por otra materia
    if (this.celdaActual.style.backgroundColor != "" ){
      ids = this.horasmaterias.find(horamateria => horamateria.idhoradia == id && horamateria.numsemana == dia).id;
      this.servicio.eliminar(ids, 'horasmateria').subscribe(s =>{this.refrescarTabla();});
    }
    else{
      this.refrescarTabla();
    }
    //let idmateria = document.getElementById('materia'+hora.toString()+'-'+dia.toString())['value']; 
    //let modulo = new horasmateria({'id': ids.toString(), 'idmateria':idmateria.toString(), 'idhoradia':id.toString(), 'numsemana':dia.toString()})
    
  }
 
  refrescarTabla() {
    this.horasmaterias  = new Array<any>();
    if (this.ultimoeditor != ''){
      let ed = document.getElementById(this.ultimoeditor);
      ed.style.display = 'none';}
    for(let m of [1,2,3,4,5]){
    for(let n of this.horas){
      let celda = document.getElementById('celda'+n.numorden+'-'+m.toString());
      if (celda.style.backgroundColor != ""){
        celda.removeChild(celda.lastChild);}
        celda.style.backgroundColor = "";
     }
    }
    this.buscarHoras(this.materias, this.materias.length-1);

  }

  seleccionarCarrera(){
      let id = document.getElementById('carrera')['value'];
      this.servicio.loadGrilla('curso', ['idcarrera', id.toString()])
          .subscribe(res =>{this.cursos = res;});
    }

  seleccionarCurso(){
    let id = document.getElementById('curso')['value'];
    this.servicio.loadGrilla('materia',['idcurso',id.toString()]).subscribe(materias =>{
      this.materias = materias;
      this.refrescarTabla();
    });
    
  }
  

  getColor(id){ 
      let color = "hsl(" + (360 * +this.idFlotante(id)).toString() + ',' +
               (25 + 70 * +this.idFlotante(id)).toString() + '%,' + 
               (45 + 10 * +this.idFlotante(id)).toString() + '%, 0.4)';
      return color;
  }

  idFlotante(num)  { 
    let largo = num.toString().length;
    let num_ceros = '10000000000000000000000000000000000'.substring(0,largo+1);
    let numero = num / (+num_ceros);
    return numero;  }
  
  calcularmodulo(hora){
    this.modalService.setCaseEstado('modulo');
    let modulo = +this.modalService.estados[0];
    let h : any = +hora.toString().substring(0,2);
    let m = +hora.toString().substring(3,5);
    h = h + ((m + modulo)/60);
    hora = ((m + modulo)%60).toString();
    if (hora.length==1){hora ='0'+hora;}
    return h.toString().split('.',2)[0]+':'+hora;
  }

  //genera el pdf de los horarios
  pdfhorarios(){
      
      let base64Img = logo64.image;
      let fechafile = this.stringFecha(new Date(),'');
      let fecha = this.stringFecha(new Date(),'comp');
      let curso = this.cursos.find(curso => curso.id == document.getElementById('curso')['value']).nombre;
      const data = document.getElementById('horarios');
      let opt = { scale: 2, letterRendering: false, useCORS: true};
      html2canvas.default(data,opt).then(canvas => {
        const contentDataURL = canvas.toDataURL('image/svg');
        const pdf = new jspdf.jsPDF('p', 'mm', 'a4'); // A4 size page of PDF 
        pdf.setFontSize(9);
        pdf.text("Hora y fecha de emisión: "+fecha, 113 , 14);
        pdf.text("ISAUI - Autogestión ", 168 , 10);
        pdf.addImage(base64Img, 'JPEG', 5, 5, 40, 12);
        pdf.addImage(contentDataURL, 'SVG', 10, 17, 185, 270);
        pdf.save('Horarios '+curso+'.pdf'); // Generated PDF
      });       
  }

  stringFecha(fecha: Date, t:string): string {
    if (t=='comp'){
      let meses: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
      let formatFecha: string = '';
      formatFecha += fecha.getHours().toString()+":";
      formatFecha += fecha.getMinutes().toString()+":";
      formatFecha += fecha.getSeconds().toString()+" - ";
      formatFecha += fecha.getDate().toString();
      formatFecha += ' de ' + meses[fecha.getMonth()];
      formatFecha += ' del ' + fecha.getFullYear().toString();
      return formatFecha;}
    else{
      let formatFecha: string = '';
      formatFecha += fecha.getHours().toString()+"-";
      formatFecha += fecha.getMinutes().toString()+"-";
      formatFecha += fecha.getSeconds().toString()+"-";
      formatFecha += fecha.getDate().toString();
      formatFecha += '-' + (fecha.getMonth()+1).toString();
      formatFecha += '-' + fecha.getFullYear().toString();
      return formatFecha;
    }
  }
}



