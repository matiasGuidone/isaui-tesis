import { Component, OnInit } from '@angular/core';
import { materia } from '../clases/materia';
import { mensaje } from '../clases/mensaje';
import { PeticionesService } from '../services/peticiones.service';

@Component({
  selector: 'app-frm-mensajes',
  templateUrl: './frm-mensajes.component.html',
  styleUrls: ['./frm-mensajes.component.css']
})
export class FrmMensajesComponent implements OnInit {

  constructor(protected servicio: PeticionesService) {
    this.servicio.loadGrilla('materia').subscribe(resultado => { this.materias = resultado; });
   }

  materias: materia[];
  mensajes : mensaje[];
  mensajeSeleccionado : mensaje;
  ngOnInit() {
  }


  seleccionarMateria() { 
    this.mensajes = new Array<mensaje>();
    let id = document.getElementById('materia')['value'];
    this.servicio.loadGrilla('mensaje', ['idmateria', id.toString()]).subscribe(msjs => {
      if (msjs != null && msjs.length > 0) {
        this.mensajes = msjs; 
      }
    });

  }
  seleccionarMensaje() {
    this.mensajeSeleccionado = this.mensajes.find(msj => msj.id == document.getElementById('mensaje')['value']);
    document.getElementById('fechah')['value']= this.mensajeSeleccionado.fechafin.toString().substring(0,10);
    document.getElementById('fechad')['value']= this.mensajeSeleccionado.fechainicio.toString().substring(0,10);
    document.getElementById('titulo')['value']= this.mensajeSeleccionado.titulo;
    document.getElementById("visualiza").innerHTML = this.mensajeSeleccionado.mensaje;
     
  }



  guardarMensaje(){
    if(this.mensajeSeleccionado== null || this.mensajeSeleccionado==undefined){
      let msj = new mensaje({'id':'0','fechainicio': this.formatearFecha(document.getElementById('fechad')['value']),
        'fechafin': this.formatearFecha(document.getElementById('fechah')['value']) 
        ,'titulo': document.getElementById('titulo')['value']
        ,'mensaje': document.getElementById("visualiza").innerHTML ,'idmateria':document.getElementById("materia")['value']
        ,'iddocente':''}); //agregar el docente
        this.servicio.addSingleAbm(msj,'mensaje').subscribe(l=>{
          this.seleccionarMateria();
        });
       
    }
    else{
      let msj = new mensaje({'id': this.mensajeSeleccionado.id,'fechainicio': this.formatearFecha(document.getElementById('fechad')['value']),
        'fechafin': this.formatearFecha(document.getElementById('fechah')['value']) 
        ,'titulo': document.getElementById('titulo')['value']
        ,'mensaje': document.getElementById("visualiza").innerHTML ,'idmateria':document.getElementById("materia")['value']
        ,'iddocente':this.mensajeSeleccionado.iddocente});
        this.servicio.addSingleAbm(msj,'mensaje').subscribe(l=>{
          this.seleccionarMateria();
        });
    }
  }

  countsize(){
    if(document.getElementById("visualiza").innerHTML.length > 1999){
      document.getElementById("visualiza").innerHTML = document.getElementById("visualiza").innerHTML.substring(0,2000);
    }
  }


  formatearFecha(f: any): string {
    if (f instanceof Date) {
      f.setDate(f.getDate() + 1);
    }
    let fecha: Date = new Date(f);
    let mes: string = (fecha.getMonth() + 1).toString();
    let dia: string = (fecha.getDate()).toString();
    if (mes.length < 2) { mes = '0' + mes; }
    if (dia.length < 2) { dia = '0' + dia; }
    return (fecha.getFullYear() + '-' + mes + '-' + dia);
  }
  //paleta de elementos HTML
  
  textBold(){
    let visualiza = document.getElementById("visualiza"); 
    let texto = window.getSelection().toString();
    if(visualiza.innerHTML.includes("<strong>"+texto+"</strong>") == false){
      visualiza.innerHTML =   this.replaceAll(texto,"<strong>"+texto+"</strong>", visualiza.innerHTML);
    }
    else{
      visualiza.innerHTML =   this.replaceAll("<strong>"+texto+"</strong>",texto, visualiza.innerHTML);
    }
  }
   
  textItalic(){
    let visualiza = document.getElementById("visualiza"); 
    let texto = window.getSelection().toString();
    if(visualiza.innerHTML.includes("<em>"+texto+"</em>") == false){
      visualiza.innerHTML =   this.replaceAll(texto,"<em>"+texto+"</em>", visualiza.innerHTML);
    }
    else{
      visualiza.innerHTML =   this.replaceAll("<em>"+texto+"</em>",texto, visualiza.innerHTML);
    }
  }
  textChiquite(){
    let visualiza = document.getElementById("visualiza"); 
    let texto = window.getSelection().toString();
    if(visualiza.innerHTML.includes("<small>"+texto+"</small>") == false){
      visualiza.innerHTML =   this.replaceAll(texto,"<small>"+texto+"</small>", visualiza.innerHTML);
    }
    else{
      visualiza.innerHTML =   this.replaceAll("<small>"+texto+"</small>",texto, visualiza.innerHTML);
    }
  }
  textSubrayado(){
    let visualiza = document.getElementById("visualiza"); 
    let texto = window.getSelection().toString();
    if(visualiza.innerHTML.includes("<u>"+texto+"</u>") == false){
      visualiza.innerHTML =   this.replaceAll(texto,"<u>"+texto+"</u>", visualiza.innerHTML);
    }
    else{
      visualiza.innerHTML =   this.replaceAll("<u>"+texto+"</u>",texto, visualiza.innerHTML);
    }
  }

  textCode(){
    let visualiza = document.getElementById("visualiza"); 
    let texto = window.getSelection().toString();
    if(visualiza.innerHTML.includes("<code>"+texto+"</code>") == false){
      visualiza.innerHTML =   this.replaceAll(texto,"<code>"+texto+"</code>", visualiza.innerHTML);
    }
    else{
      visualiza.innerHTML =   this.replaceAll("<code>"+texto+"</code>",texto, visualiza.innerHTML);
    }
  }
  textmark(){
    let visualiza = document.getElementById("visualiza"); 
    let texto = window.getSelection().toString();
    if(visualiza.innerHTML.includes("<mark>"+texto+"</mark>") == false){
      visualiza.innerHTML =   this.replaceAll(texto,"<mark>"+texto+"</mark>", visualiza.innerHTML);
    }
    else{
      visualiza.innerHTML =   this.replaceAll("<mark>"+texto+"</mark>",texto, visualiza.innerHTML);
    }
  }
  textStr(){
    let visualiza = document.getElementById("visualiza"); 
    let texto = window.getSelection().toString();
    if(visualiza.innerHTML.includes("<s>"+texto+"</s>") == false){
      visualiza.innerHTML =   this.replaceAll(texto,"<s>"+texto+"</s>", visualiza.innerHTML);
    }
    else{
      visualiza.innerHTML =   this.replaceAll("<s>"+texto+"</s>",texto, visualiza.innerHTML);
    }
  }
  

  replaceAll (search, replacement, cadena) : string {
    var target = cadena;
    return target.split(search).join(replacement);
     }
  
}
