import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '../modal/modal-service.service';
import { PeticionesService } from '../services/peticiones.service';
import * as jspdf from 'jspdf';  
import autoTable from 'jspdf-autotable'
import { logo64 } from './logo-base64';

@Component({
  selector: 'abm-filtro',
  templateUrl: './filtro-abm.component.html'
})
export class FiltroComponent {

  arrayValores: string[] = new Array<string>();

  private resultados : any[] = [];
  
  @Output() emisorFiltro = new EventEmitter<any[]>();

  constructor(private router: Router, private servicio: PeticionesService, private modalService: ModalService) {

  }
  //abrir y cerrar la ventana de filtros
  showFiltros() {
    document.getElementById('filtros')['style'].display = "block";
    document.getElementById('mostrar')['style'].display = "none";
  }
  cerrarFiltros() {
    document.getElementById('filtros')['style'].display = "none";
    document.getElementById('mostrar')['style'].display = "initial";
  }
  //obtiene el tipo de input para el filtro seleccionado
  getTipoFiltro() {
    let fil = "text";
    if (this.modalService.filtro != null && this.modalService.filtro != undefined) {
      let index = document.getElementById('filtro')['value'];
      fil = (this.modalService.filtro.find(filtro => filtro.campo === index)).tipo;
    }
    document.getElementById('valorFiltro')['type'] = fil;
  }

  //evento para el botón de filtrado
  filtrarCampo() {
    let filtro = document.getElementById('filtro')['value'];
    let valorFiltro = document.getElementById('valorFiltro')['value'];
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
        default : { break;}
      }
      this.servicio.loadGrilla(abm, this.arrayValores)
      .subscribe(res => this.emisorFiltro.emit(res));
   }

   
   public generarPDF()  
   {  
    const doc = new jspdf.jsPDF()
    let base64Img = logo64.image;
    if (this.resultados.length >0){
    let head = [[]];
    let body = new Array<any[]>();
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
        doc.text("Resultados", data.settings.margin.left , 25);

        // Footer
        //var str = "Página " + doc.nu
        // Total page number plugin only available in jspdf v1.0+
        
        // doc.setFontSize(10);

        // // jsPDF 1.4+ uses getWidth, <1.4 uses .width
        // var pageSize = doc.internal.pageSize;
        // var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
        // doc.text(str, data.settings.margin.left, pageHeight - 10);
    },
    margin: {top: 30}
    });
    doc.save('resultado.pdf');

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
  
//   pad( dato:string, size:number , LD : string): string {
//     if (LD == 'l'){
//       while (dato.length < size) dato = " " + dato;
//     }
//     else if (LD == 'r'){
//       while (dato.length < size) dato =  dato+" ";
//     }
    
//     return dato;
// }


}
