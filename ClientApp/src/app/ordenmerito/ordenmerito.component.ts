import { Component, OnInit } from '@angular/core';
import { convocatoria } from '../clases/convocatoria';
import { AuthLoginService } from '../services/authlogin.service';
import { PeticionesService } from '../services/peticiones.service';
import { ModalService } from '../modal/modal-service.service';
import * as jspdf from 'jspdf';
import autoTable from 'jspdf-autotable'
import { logo64 } from '../filtro-abm/logo-base64';
import { curriculumconvocatoria } from '../clases/curriculumconvocatoria';
import { Router } from '@angular/router';
import { MyModalComponent } from '../modal/MyModalComponent';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-ordenmerito',
  templateUrl: './ordenmerito.component.html',
  styleUrls: ['./ordenmerito.component.css']
})
export class OrdenmeritoComponent implements OnInit {

  convocatorias: convocatoria[] = new Array<convocatoria>();
  cvs: any[] = new Array<any>();
  curriculumconvocatoria: curriculumconvocatoria[];
  materia: string;

  
  constructor(private servicio: PeticionesService, private router:Router,protected logservicio: AuthLoginService, private modalservice: ModalService) { 
    let rol = JSON.parse(localStorage.getItem("Rol"));
    if (rol.nombrerol.toString() == "Administrador") {
      this.servicio.loadGrilla('convocatoria').subscribe(resultado => { this.convocatorias = resultado; if (this.convocatorias.length > 0) { this.selecionarconvocatoria(this.convocatorias[0].id); } });
    }
    
  }

  ngOnInit() {
  }

  selecionarconvocatoria(ids=0)
  {
    this.cvs=new Array<any>();
    let id = ids;
    if (ids == 0) {
      id = document.getElementById('convocatoria')['value'];
    }
    this.servicio.loadGrilla('curriculumrepo', [ id.toString()]).subscribe(res=>
     { 
      if (res != null && res.length > 0) 
      {
        /* if(this.convocatorias.idmateria>0) */
        this.materia=res[0]["materia"];
        this.cvs = res;
      }
    })
  }

pdfNotas() {
    let fecha = this.stringFecha(new Date(), 'comp');
    let fechafile = this.stringFecha(new Date(), '');
    let head = [[]];
    let body = new Array<any[]>();
    const doc = new jspdf.jsPDF();
    let descripcion: string;
    
    let base64Img = logo64.image;
    let data: any[] = new Array<any>();
    for (let n of this.cvs) {
      let cv: any = new Object();
      cv['postulante'] = n.postulante ;
      cv['puntaje']= n.puntaje;
      if(n["prioridad"]>1)
      {
        cv['prioridad']="profesor"
      }
      else
      {cv['prioridad']="-"}
/*       for (let i of this.curriculumconvocatorias) {
        let no = this.curriculumconvocatoria.find(m => m.idcurriculum == i.id);
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
      } */
      data.push(cv);
    }
    

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
    let desc = 'Convocatoria para: ' + this.convocatorias.find(convocatoria => convocatoria.id == document.getElementById('convocatoria')['value']).descripcion ;
    let fechade =  this.convocatorias.find(convocatoria => convocatoria.id == document.getElementById('convocatoria')['value']).fechainicio ;
    let ndate1= new Date(fechade);
    let fechahasta = this.convocatorias.find(convocatoria => convocatoria.id == document.getElementById('convocatoria')['value']).fechafin;
    let ndate2= new Date(fechahasta);
    desc+=' (fechas: ' + this.formatofecha(ndate1) + ' - '+ this.formatofecha(ndate2) +')';
    let mat= 'Materia: ' + this.materia;
    autoTable(doc, {
      head: head,
      body: body,
      didDrawPage: function (dat) {
        
        doc.setFontSize(12);
        doc.setTextColor(40);

        if (base64Img) {
          doc.addImage(base64Img, 'JPEG', dat.settings.margin.left, 5, 40, 12);
        }
        doc.text(desc, dat.settings.margin.left, 22);
        doc.setFontSize(9);


        doc.text(mat, dat.settings.margin.left, 26);
        doc.setFontSize(7);
        

        doc.text("Hora y fecha de emisión: " + fecha, 113, 14);
        doc.text("ISAUI - Administracion ", 168, 10);
        
        var str = "Página " + dat.pageNumber.toString();

        
        var pageSize = doc.internal.pageSize;
        var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
        doc.text(str, dat.settings.margin.left, pageHeight - 8);
      },
      margin: { top: 30 }
    });
    doc.save('Postulantes-' + this.convocatorias.find(res => res.id == document.getElementById('convocatoria')['value']).descripcion + '.pdf');

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

  formatofecha(f: Date)
  {
    if(f!=null)
    {
      let formatFecha: string = '';
      formatFecha += f.getDate().toString();
      formatFecha += '/' + f.getMonth().toString();
      formatFecha += '/' +f.getFullYear().toString();
      return formatFecha;
    }
  }
  verCurriculum(id){
    let cv = this.cvs.find(cuv => cuv.idcv == id);
    this.servicio.getById(cv.idcv.toString(),'curriculum').subscribe(curr=>{
      this.servicio.selectedcurriculum = curr;  
      this.logservicio.componenteGuard = "frm-vercurriculum";
      this.router.navigate(['frm-vercurriculum']);  });
   
  }
  almacenarprioridad(id){
    let prioridad = document.getElementById('prio-'+id)['value'];
    let idconvocatoria = document.getElementById('convocatoria')['value'];
    let aux = this.cvs.find(cv => cv.idcv == id);
    let cvconvocatoria : curriculumconvocatoria= new curriculumconvocatoria({'id':'0','idcurriculum':id.toString(),'idconvocatoria':idconvocatoria.toString(),'puntaje': aux.puntaje,'prioridad':prioridad.toString()})
    this.servicio.addSingleAbm(cvconvocatoria,'curriculumconvocatoria').subscribe(re=>{
      this.selecionarconvocatoria(idconvocatoria);
    });

  }
  establecerCandidato(id){
    this.abrirModal('Convocatorias','¿ Desea establecer este currículum como elegido para la convocatoria ?',2,null).subscribe(result=>{
      if(result){
        let conv = this.convocatorias.find(convocatoria => convocatoria.id == document.getElementById('convocatoria')['value']);
        conv.idcurriculum = id;
        this.servicio.addSingleAbm(conv,'convocatoria').subscribe(re=>{
           this.selecionarconvocatoria();
        });
      }
      else return;
    })
  }

  abrirModal(titulo: string, mensaje: string, tipo: number, menu: any): Observable<any> {
    const modalRef = 
    this.modalservice.open(MyModalComponent, 
      { title: titulo, message: mensaje, tipo: tipo, parametros: menu });
    return modalRef.onResult();
  }
}
