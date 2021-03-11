import { Component, Input, OnInit } from '@angular/core';
import { horasdia } from '../clases/horasdia';
import { PeticionesService } from '../services/peticiones.service';
import { materia } from '../clases/materia';
import { ModalService } from '../modal/modal-service.service';
import * as jspdf from 'jspdf';  
import { logo64 } from '../filtro-abm/logo-base64';
import * as html2canvas from 'html2canvas';

@Component({
  selector: 'app-cmp-horarios',
  templateUrl: './cmp-horarios.component.html',
  styleUrls: ['./cmp-horarios.component.css']
})
export class CmpHorariosComponent implements OnInit {

  horas: horasdia[] = new Array<horasdia>();
  horasmaterias: any[] = new Array<any>();
  materias: materia[] = new Array<materia>();
  @Input() idMateria = "";

  constructor(protected servicio: PeticionesService, protected modalService: ModalService) { }

  ngOnInit() {
    let rol = JSON.parse(localStorage.getItem("Rol"));
    this.servicio.loadGrilla('horasdia').subscribe(res =>{this.horas = res;});
  
     if(rol.nombrerol.toString()=="Docente"){
      this.servicio.loadGrilla('materia', ['iddocente', rol.id.toString()]).subscribe(materias =>{
        this.materias = materias;
        if (this.materias.length > 0){
          this.buscarHoras(this.materias, this.materias.length-1);
        }
    });
     }
     else if(rol.nombrerol.toString()=="Estudiante"){
    this.servicio.loadGrilla('materia', ['idestudiante', rol.id.toString()]).subscribe(materias =>{
      this.materias = materias;
      if (this.materias.length > 0){
        this.buscarHoras(this.materias, this.materias.length-1);
      }
  });
}
else if(rol.nombrerol.toString()=="Curriculum"){
  this.servicio.getById(this.idMateria,'materia').subscribe(materia =>{
    this.materias = new Array<materia>();
    this.materias.push(materia);
    if (this.materias.length > 0){
      this.buscarHoras(this.materias, this.materias.length-1);
    }
});
}
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
    let btnpdf = document.getElementById('pdf');
    btnpdf.style.display='none';
    let base64Img = logo64.image;
    let fechafile = this.stringFecha(new Date(),'');
    let fecha = this.stringFecha(new Date(),'comp');
    //let curso = this.cursos.find(curso => curso.id == document.getElementById('curso')['value']).nombre;
    const data = document.getElementById('horarios');
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

    // let opt = { scale: 2, letterRendering: false, useCORS: true};
    // html2canvas.default(data,opt).then(canvas => {
    //   const contentDataURL = canvas.toDataURL('image/svg');
    //   const pdf = new jspdf.jsPDF('p', 'mm', 'a4'); // A4 size page of PDF 
    //   pdf.setFontSize(9);
    //   pdf.text("Hora y fecha de emisión: "+fecha, 113 , 14);
    //   pdf.text("ISAUI - Autogestión ", 168 , 10);
    //   pdf.addImage(base64Img, 'JPEG', 5, 5, 40, 12);
    //   pdf.addImage(contentDataURL, 'SVG', 10, 17, 185, 270);
      pdf.save('Horarioscursado.pdf'); // Generated PDF
      btnpdf.style.display='block';
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
