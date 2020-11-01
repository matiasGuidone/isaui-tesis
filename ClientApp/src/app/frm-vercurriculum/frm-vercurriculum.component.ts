import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { antecedentetitulo } from '../clases/antecedentetitulo';
import { curriculum } from '../clases/curriculum';
import { domicilio } from '../clases/domicilio';
import { investigacion } from '../clases/investigacion';
import { localidad } from '../clases/localidad';
import { pais } from '../clases/pais';
import { provincia } from '../clases/provincia';
import { ModalService } from '../modal/modal-service.service';
import { AuthLoginService } from '../services/authlogin.service';
import { PeticionesService } from '../services/peticiones.service';
import * as jspdf from 'jspdf';  
import { logo64 } from '../filtro-abm/logo-base64';
import * as html2canvas from 'html2canvas';

@Component({
  selector: 'app-frm-vercurriculum',
  templateUrl: './frm-vercurriculum.component.html',
  styleUrls: ['./frm-vercurriculum.component.css']
})
export class FrmVercurriculumComponent implements OnInit {
  curriculum: curriculum;
  generos: any;
  documentos: any;
  dom: string ="";
  loc:string ="";
  pro: string ="";
  pais:string ="";
  formaciones: any[]= new Array<any>();
  experiencias: any[]= new Array<any>();
  investigaciones: any[]= new Array<any>();

  constructor(private servicio :PeticionesService,private router:Router, private modalservicio: ModalService,private logservicio:AuthLoginService) {
     this.curriculum = servicio.selectedcurriculum;
     this.servicio.getById(this.curriculum.iddomicilio.toString(),'domicilio').subscribe((dom:domicilio)=>{
      this.dom = dom.direccion;
      this.servicio.getById(dom.idlocalidad.toString(),'localidad').subscribe((loc:localidad)=>{
        this.loc = loc.nombre+', cód. postal: '+loc.codpostal;
        this.servicio.getById(loc.idprovincia.toString(),'provincia').subscribe((pro:provincia)=>{
          this.pro = pro.nombre;
          this.servicio.getById(pro.idpais.toString(),'pais').subscribe((pa:pais)=>{
            this.pais=pa.nombre;
          });
        });
      });
     });
     this.servicio.loadGrilla('antecedentetitulo', ['idcurriculum', this.curriculum.id.toString()]).subscribe((antecedetes: antecedentetitulo[]) => {
      for (let ant of antecedetes) {
        if (ant.relaciondocencia == '-1') {
          this.formaciones.push({
            'id': ant.id, Establecimiento: ant.lugar, 'Fecha inicio': ant.fechainicio,
            'Fecha fin': ant.fechafin, 'Titulo': ant.titulo, tipo: ant.tipotitulo
          })
        }
        else {
          this.experiencias.push({
            'id': ant.id, Establecimiento: ant.lugar, 'Fecha inicio': ant.fechainicio,
            'Fecha fin': ant.fechafin, 'Cargo': ant.descripcion, 'Relación con docencia': ant.relaciondocencia
          });

        }
      }
      this.servicio.loadGrilla('investigacioninformacion', ['idcurriculum', this.curriculum.id.toString()]).subscribe((investigaciones: investigacion[]) => {
        for (let inv of investigaciones) {
          this.investigaciones.push({
            'id': inv.id, Descripcion: inv.descripcion, 'Fecha': inv.fecha,
            'Lugar': inv.lugar, 'tipo': inv.tipo
          });
        }

      });
    });
     this.modalservicio.setCaseEstado('sexo');
     this.generos=this.modalservicio.estados;

     this.modalservicio.setCaseEstado('tipoDoc');
     this.documentos=this.modalservicio.estados;



   }

  ngOnInit() {
  }

  edad(nac:Date):number{
     const hoy: Date = new Date();
     const nacimiento:Date = new Date(nac); 
     const diferencia = Math.abs(hoy.getTime() - nacimiento.getTime());
    return Math.floor(diferencia/(1000*3600*24)/365);


  }
  genero(id){
    return this.generos[id];
  }
  tipodedoc(id){
    return this.documentos[id];
  }
  volver(){
    this.logservicio.componenteGuard = "frm-ordenmerito";
    this.router.navigate(['frm-ordenmerito']);   
  }
  generarPdf(){
    let btnvolver = document.getElementById('btnvolver');
    btnvolver.style.display="none";
    let btnpdf = document.getElementById('btnpdf');
    btnpdf.style.display="none";
    const data = document.getElementById("curriculum");
    let base64Img = logo64.image;
      let fechafile = this.stringFecha(new Date(),'');
      let fecha = this.stringFecha(new Date(),'comp');
      // let curso = this.cursos.find(curso => curso.id == document.getElementById('curso')['value']).nombre;
      //const data = document.getElementById('horarios');
      let opt = { scale: 1.1, letterRendering: true, useCORS: true};
      html2canvas.default(data,opt).then(canvas => {
               
        const contentDataURL = canvas.toDataURL('image/jpeg');
        const pdf = new jspdf.jsPDF('p', 'mm', 'a4'); // A4 size page of PDF 
        var numpag = 1;
        var imgWidth = 210; 
        var pageHeight = 295;  
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;
        //var doc = new jsPDF('p', 'mm');
        var position = 0;

        pdf.addImage(contentDataURL, 'JPEG', 10, position+17, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        pdf.setFontSize(9);
        pdf.text("Hora y fecha de emisión: "+fecha, 113 , 14);
        pdf.text("ISAUI - Autogestión ", 168 , 10);
        pdf.addImage(base64Img, 'JPEG', 5, 5, 40, 12);
        pdf.text("Página "+numpag.toString(), 168 ,  pageHeight - 8);

        while (heightLeft >= 0) {
          numpag++;
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(contentDataURL, 'PNG', 10, position+17, imgWidth, imgHeight);
          heightLeft -= pageHeight;
          pdf.text("Página "+numpag.toString(), 168 ,  pageHeight - 8);
        }
 

       
        
        //pdf.addImage(contentDataURL, 'SVG', 10, 17, 185, y);
        pdf.save('Currículum'+this.curriculum.nombre+this.curriculum.apellido+'.pdf'); // Generated PDF
        btnvolver.style.display="block";
        btnpdf.style.display="block";
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
