import { Component, Input, OnInit } from '@angular/core';
import { horasdia } from '../clases/horasdia';
import { PeticionesService } from '../services/peticiones.service';
import { materia } from '../clases/materia';
import { ModalService } from '../modal/modal-service.service';
import * as jspdf from 'jspdf';
import { logo64 } from '../filtro-abm/logo-base64';
import * as html2canvas from 'html2canvas';
import autoTable from 'jspdf-autotable'

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

getColor(id) {
  let color = "hsla(" + (360 * +this.idFlotante(id)).toString() + ',' +
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

    
      pdf.save('Horarioscursado.pdf'); // Generated PDF
      btnpdf.style.display='block';
    });       
}

//genera el pdf de los horarios
pdfhorarios2() {
  const doc = new jspdf.jsPDF('l');
  let descripcion: string;
  //obtengo la imagen base64
  let base64Img = logo64.image;

  if (this.horas.length > 0) {
    let pag = 1;
    let head = [[]];
    let body = new Array<any[]>();
    let fecha = this.stringFecha(new Date(), 'comp');
    let fechafile = this.stringFecha(new Date(), '');



    //se crea la descripción del encabezado
    descripcion = "Horarios de cursado" 
    let descrp_filtros = "";

    head[0].push('#');
    head[0].push('Domingo');
    head[0].push('Lunes');
    head[0].push('Martes');
    head[0].push('Miércoles');
    head[0].push('Jueves');
    head[0].push('Viernes');
    head[0].push('Sábado');

    let horainicial = this.horasmaterias[0]? this.horasmaterias[0].idhoradia:0;
    if(horainicial > 0){
      for(let h of this.horasmaterias){
        if(h.idhoradia < horainicial){
          horainicial = h.idhoradia;
        }
      }
  }
    //for(){}
    for (let ho of this.horas) {
      if(ho.id >= horainicial){
      let ar: any[] = new Array<any>();
      ar.push(ho.numorden);
      ar.push("");
      ar.push(ho.hora+"/"+this.calcularmodulo(ho.hora));
      ar.push(ho.hora+"/"+this.calcularmodulo(ho.hora));
      ar.push(ho.hora+"/"+this.calcularmodulo(ho.hora));
      ar.push(ho.hora+"/"+this.calcularmodulo(ho.hora));
      ar.push(ho.hora+"/"+this.calcularmodulo(ho.hora));
      ar.push("");
      body.push(ar);
    }
    }

    for (let modulo of this.horasmaterias) {
      let h = this.horas.find(hora => hora.id == modulo.idhoradia);
      body[h.numorden-horainicial][modulo.numsemana+1] += '\n'+this.materias.find(materia => materia.id == modulo.idmateria).nombre;
      
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
        doc.text("Hora y fecha de emisión: " + fecha, 203, 14);
        doc.text("ISAUI - Autogestión ", 249, 10);
        // Footer
        var str = "Página " + data.pageNumber.toString();

        
        // Total page number plugin only available in jspdf v1.0+

        // // jsPDF 1.4+ uses getWidth, <1.4 uses .width
        var pageSize = doc.internal.pageSize;
        var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
        doc.text(str, data.settings.margin.left, pageHeight - 8);
        
      },
       
      theme: 'grid',
      columnStyles: { 0:{cellWidth: 10, minCellHeight: 20},
                      1:{cellWidth: 35, minCellHeight: 20},
                      2:{cellWidth: 35, minCellHeight: 20},
                      3:{cellWidth: 35, minCellHeight: 20},
                      4:{cellWidth: 35, minCellHeight: 20},
                      5:{cellWidth: 35, minCellHeight: 20},
                      6:{cellWidth: 35, minCellHeight: 20},
                      7:{cellWidth: 35, minCellHeight: 20}},
      margin: { top: 30 },
      willDrawCell: (data) => {
        if (data.section === 'head' ) { 
           doc.setFillColor(0,79,101); 
        }
        if (data.section === 'body' && this.horasmaterias.find(n => n.idhoradia-horainicial == data.row.index && n.numsemana+1  == data.column.index) != null ) {
          let hor = this.horasmaterias.find(n => n.idhoradia-horainicial == data.row.index && n.numsemana+1  == data.column.index);
          let mat = this.materias.find(m => m.id == hor.idmateria);
         
          let  col  = this.getColor(mat.nombre.length);
          let color = this.HSLAToRGBA(col);
           
           doc.setFillColor(+color[0],+color[1],+color[2]);
           doc.setTextColor(250,250,250);
           
        }
        if(data.section === 'body' && (data.column.index == 1 || data.column.index == 7)){
          doc.setFillColor(115, 127, 142);
        }
      },
    }, 
    );
    doc.save('Horarios - ISAUI .pdf');

  }
  else {

  }

}


HSLAToRGBA(hsla,isPct = false) {
let ex = /^hsla\(((((([12]?[1-9]?\d)|[12]0\d|(3[0-5]\d))(\.\d+)?)|(\.\d+))(deg)?|(0|0?\.\d+)turn|(([0-6](\.\d+)?)|(\.\d+))rad)(((,\s?(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2},\s?)|((\s(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2}\s\/\s))((0?\.\d+)|[01]|(([1-9]?\d(\.\d+)?)|100|(\.\d+))%)\)$/i;
if (ex.test(hsla)) {
  let sep = hsla.indexOf(",") > -1 ? "," : " ";
  hsla = hsla.substr(5).split(")")[0].split(sep);

  // strip the slash if using space-separated syntax
  if (hsla.indexOf("/") > -1)
    hsla.splice(3,1);

  isPct = isPct === true;

  // must be fractions of 1
  let h = hsla[0],
    s = hsla[1].substr(0,hsla[1].length-1) / 100,
    l = hsla[2].substr(0,hsla[2].length-1) / 100,
    a = hsla[3];
  
  // strip label and convert to degrees (if necessary)
  if (h.indexOf("deg") > -1)
    h = h.substr(0,h.length - 3);
  else if (h.indexOf("rad") > -1)
    h = Math.round(h.substr(0,h.length - 3) / (2 * Math.PI) * 360);
  else if (h.indexOf("turn") > -1)
    h = Math.round(h.substr(0,h.length - 4) * 360);
  if (h >= 360)
    h %= 360;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs((h / 60) % 2 - 1)),
    m = l - c/2,
    r = 0,
    g = 0,
    b = 0;
  
  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  let pctFound = a.indexOf("%") > -1;

  if (isPct) {
    r = +(r / 255 * 100).toFixed(1);
    g = +(g / 255 * 100).toFixed(1);
    b = +(b / 255 * 100).toFixed(1);
    if (!pctFound) {
      a *= 100;
    } else {
      a = a.substr(0,a.length - 1);
    }

  } else if (pctFound) {
    a = a.substr(0,a.length - 1) / 100;
  }
  
  return  [+r , +g , +b , +a ]; //isPct ?: [ +r , +g , +b , +a];

} else {
  return "Invalid input color";
}
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
