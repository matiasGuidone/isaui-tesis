import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '../modal/modal-service.service';
import { PeticionesService } from '../services/peticiones.service';
import * as jspdf from 'jspdf';  
import autoTable from 'jspdf-autotable'
import { logo64 } from './logo-base64';

@Component({
  selector: 'abm-filtro',
  templateUrl: './filtro-abm.component.html',
  styleUrls: ['./filtro-abm.component.css']
})
export class FiltroComponent {

  arrayValores: string[] = new Array<string>();

  @Input() resultados : any[] = [];
  private camposid = new Array<any[]>();
  private listSeleccionado : any[];
  private estado : any[]= new Array<string>();
  @Output() emisorFiltro = new EventEmitter<any[]>();

  constructor(private router: Router, private servicio: PeticionesService, private modalService: ModalService) {
    if (this.modalService.filtro != null && this.modalService.filtro != undefined) {
      this.camposid = new Array<any[]>();
      for (var i in this.modalService.filtro){
        if (this.modalService.filtro[i].tipo == 'list'){
          let list = this.modalService.filtro[i].campo.toString().replace('id','');
          this.servicio.loadGrilla(list).subscribe(res =>{
            res['nombre'] = list;
            this.camposid.push(res);
          });
        }
      }
      //let index = document.getElementById('filtro')['value'];
      //(this.modalService.filtro.find(filtro => filtro.campo === index)).tipo;
    }
  }
  //abrir y cerrar la ventana de filtros
  showFiltros() {
    document.getElementById('filtros')['style'].opacity = "1";
    document.getElementById('mostrar')['style'].display = "none";
    //document.getElementById('pdf')['style'].display = "none";
  }
  cerrarFiltros() {
    document.getElementById('filtros')['style'].opacity = "0";
    document.getElementById('mostrar')['style'].display = "initial";
    //document.getElementById('pdf')['style'].display = "initial";
  }
  //obtiene el tipo de input para el filtro seleccionado
  getTipoFiltro() {
    let fil = "text";
    if (this.modalService.filtro != null && this.modalService.filtro != undefined) {
      let index = document.getElementById('filtro')['value'];
      fil = (this.modalService.filtro.find(filtro => filtro.campo === index)).tipo;

    if (fil == 'list'){
      this.listSeleccionado = this.camposid.find(val => val['nombre'] === index);
      this.camposid;
      document.getElementById('valorFilList').style['display'] = 'block';
      document.getElementById('valorFiltro').style['display'] = 'none';
      document.getElementById('valorFilCase').style['display'] = 'none';
      document.getElementById('valorFiltro')['value'] = fil;
    }
    else if (fil == 'case'){
      document.getElementById('valorFilList').style['display'] = 'none';
      document.getElementById('valorFiltro').style['display'] = 'none';
      document.getElementById('valorFilCase').style['display'] = 'block';
      document.getElementById('valorFiltro')['value'] = fil;
      let abm = this.router.url.substring(5);
      this.modalService.setCaseEstado(abm);
      this.estado = this.modalService.estados;
    }
    else{
      document.getElementById('valorFilList').style['display'] = 'none';
      document.getElementById('valorFiltro').style['display'] = 'block';
      document.getElementById('valorFilCase').style['display'] = 'none';
      document.getElementById('valorFiltro')['type'] = fil;
      } 
    }
  }

  //evento para el botón de filtrado
  filtrarCampo() {
    let filtro = document.getElementById('filtro')['value'];
    let valorFiltro = document.getElementById('valorFiltro')['value'];
    if(document.getElementById('valorFiltro')['value']=='list'){
        filtro = 'id'+filtro;
        valorFiltro = document.getElementById('valorFilList')['value'];
    }
    else if(document.getElementById('valorFiltro')['value']=='case'){
      valorFiltro = document.getElementById('valorFilCase')['value'];
    }
    if(this.arrayValores.find(val => filtro === val))
      { let ind = this.arrayValores.findIndex(val => filtro === val);
        ind++;
        this.arrayValores[ind] = valorFiltro;}
    else{
        this.arrayValores.push(filtro);
        this.arrayValores.push(valorFiltro);
    }
    let abm = this.router.url.substring(5);

      //Este case es para establecer una de las dos tablas 
      //para el filtrado en los abm relacionales

      switch (abm){
        case "alumnomateria": { abm = "alumno"; break; }
        case "docentemateria": { abm = "docente"; break; }
        case "cursoalumno": { abm = "alumno"; break; }
        default : { break;}
      }
    
    this.servicio.loadGrilla(abm, this.arrayValores)
      .subscribe(res => {this.emisorFiltro.emit(res); this.resultados = res});
  }

  borrar(dato: string) {
      let ind = this.arrayValores.findIndex(val => dato === val);
      this.arrayValores.splice(ind,2);
      let abm = this.router.url.substring(5);
      
      switch (abm){
        case "alumnomateria": { abm = "alumno"; break; }
        case "docentemateria": { abm = "docente"; break; }
        case "cursoalumno": { abm = "alumno"; break; }
        default : { break;}
      }
      this.servicio.loadGrilla(abm, this.arrayValores)
      .subscribe(res => this.emisorFiltro.emit(res));
   }

   //funcion que genera el pdf
   public generarPDF()  
   {  
    const doc = new jspdf.jsPDF();
    let descripcion : string ;
    //obtengo la imagen base64
    let base64Img = logo64.image;
    
    if (this.resultados.length >0){
      let pag = 1;
      let head = [[]];
      let body = new Array<any[]>();
      let fecha = this.stringFecha(new Date(),'comp');
      let fechafile = this.stringFecha(new Date(),'');
      //obtengo el nombre de la tabla filtrada
      let abm = this.router.url.substring(5);
        switch (abm){
          case "alumnomateria": { abm = "alumno"; break; }
          case "docentemateria": { abm = "docente"; break; }
          default : { break;}
        }
      
      //se crea la descripción del encabezado junto con los filtros aplicados
      descripcion = "Resultados de "+this.capitalizar(abm);
      let descrp_filtros = "Filtros empleados: ";
      let banId = false;
      let strId = '';
      for (let n  in this.arrayValores){
        if (+n%2 == 0){
          if(this.arrayValores[n].toString().startsWith('id')){
            strId = this.arrayValores[n].toString().replace('id','');
            descrp_filtros += " *"+ this.arrayValores[n].toString().replace('id','');
            banId = true;
          }
          else{
            descrp_filtros += " *"+ this.arrayValores[n].toString();
            banId = false;
          }
        }
        else{
          if (banId){
            let m = this.camposid.find(val => val['nombre'] === strId);
            descrp_filtros += " = '"+ m.find(val => val.id === +this.arrayValores[n]).nombre+"' -";
            banId = false;
          }
          else{
            descrp_filtros += " = '"+ this.arrayValores[n].toString()+"' -";
          }
          }
      }
      
      for(let m in this.resultados[0]){
        if(!m.startsWith('id') && !m.startsWith('codigo'))
          head[0].push(this.capitalizar(m));
            }
      let n = 0;
      for (var i in this.resultados){ 
        let ar : any[] = new Array<any>();
          for (var j in this.resultados[i]){
            if(!j.startsWith('id') && !j.startsWith('codigo'))
              {
                if(j.startsWith('fecha')){
                  ar.push(this.formatearFecha(this.resultados[i][j]));
                  }
                  else{ar.push(this.resultados[i][j]);}
              }   
            }
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
              doc.addImage(base64Img, 'JPEG', data.settings.margin.left  , 5, 40, 12);
          }
          doc.text(descripcion, data.settings.margin.left , 22);
          doc.setFontSize(9);

          doc.text(descrp_filtros, data.settings.margin.left , 28);
          doc.text("Hora y fecha de emisión: "+fecha, 113 , 14);
          doc.text("ISAUI - Autogestión ", 168 , 10);
          // Footer
          var str = "Página " + data.pageNumber.toString();
        
          // Total page number plugin only available in jspdf v1.0+
          
          // // jsPDF 1.4+ uses getWidth, <1.4 uses .width
          var pageSize = doc.internal.pageSize;
          var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
          doc.text(str, data.settings.margin.left, pageHeight - 8);
      },
      margin: {top: 30}
      });
      doc.save( abm+fechafile+'.pdf');
    
    }  
 }
 capitalizar (str: string) : string {
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

cargarCampo(res: any) : string{
  for (var i in res) {
    return res[i].toString();
    }
  }
}
