import { Component, OnInit } from '@angular/core';
import { PeticionesService } from '../services/peticiones.service';
import { evento } from '../clases/evento';

@Component({
  selector: 'app-frm-calendario',
  templateUrl: './frm-calendario.component.html',
  styleUrls: ['./frm-calendario.component.css']
})
export class FrmCalendarioComponent implements OnInit {
  dias = ['0', '1', '2', '3', '4', '5'];
  semana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  meses: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  mes = "";
  indicedia = 0;
  actual = new Date();
  primero = new Date();
  cantidad = 0;
  eventos: evento[];
  celdasconeventos: HTMLDivElement[] = new Array<HTMLDivElement>();

  constructor(private servicio: PeticionesService) {
    for (let i = 0; i < 13; i++) {
      //console.log(i.toString() + ": " + this.diasEnUnMes(i, 2020));
    }
    this.primero = new Date(this.actual.getFullYear(), this.actual.getMonth(), 1);
    this.cantidad = this.diasEnUnMes(this.actual.getMonth() + 1, this.actual.getFullYear());
    this.mes = this.meses[this.actual.getMonth()];
    let rol = JSON.parse(localStorage.getItem("Rol"));
    if(rol.nombrerol.toString()=="Estudiante"){
      this.servicio.loadGrilla('evento',['idestudiante',rol.id.toString()]).subscribe(res => { this.eventos = res; this.completarCalendario(); });
    }
    else{
    this.servicio.loadGrilla('evento').subscribe(res => { this.eventos = res; this.completarCalendario(); });
   }
  }

  //carga los eventos de un determinado mes
  completarCalendario() {
    //carga de calendario
    //dias
    this.celdasconeventos = new Array<any>();
    for (let n of this.eventos) {
      let eve = new evento({ 'id': n.id, 'idmateria': n.idmateria, 'fechafin': n.fechafin, 'fechainicio': n.fechainicio, 'nombre': n.nombre, 'tipo': n.tipo });
      if (eve.fechainicio.getMonth() == this.actual.getMonth()
        && eve.fechainicio.getFullYear() == this.actual.getFullYear()) {
        let celdas = this.celdasPorFecha(eve.fechainicio, eve.fechafin);
        if (celdas.length > 0) {
          for (let c of celdas) {
            if(eve.tipo=="feriado"){
            c.innerHTML += "<div class='my-2' style='background-color:#e4263f59;max-width:80px;border-radius:3px;'>" + eve.nombre + "</div>";}
            else if(eve.tipo=="materia"){
              c.innerHTML += "<div class='my-2' style='background-color:#82e42659;max-width:80px;border-radius:3px;'>" + eve.nombre + "</div>";
            }
            else if(eve.tipo=="general"){
              c.innerHTML += "<div class='my-2' style='background-color:#18b81859;max-width:80px;border-radius:3px;'>" + eve.nombre + "</div>";
            }
            else{
              c.innerHTML += "<div class='my-2' style='background-color:#e4722659;max-width:80px;border-radius:3px;'>" + eve.nombre + "</div>";
            }
          }
          this.celdasconeventos = this.celdasconeventos.concat(celdas);
        }
      }
    }



  }

  //elimina los divs dentro de cada celda para refresco de mes
  limpiarcalendario() {
    for (let n of this.celdasconeventos) {
      let hijos = Array.from(n.childNodes);
       for(let h of hijos){
         if(h.nodeName=="DIV"){
           n.removeChild(h);
         }
       }
    }
  }

  //la función devuelve las celdas que abarcan las fechas ingresadas
  celdasPorFecha(fi: Date, ff: Date) {
    let celdas: any[] = new Array<any>();
    let ban = false;
    for (var y = 0; y < 6; y++) {
      for (var x = 0; x < 7; x++) {
        let cel = document.getElementById(x.toString() + '-' + y.toString());
        let inn = fi.getDate().toString();
        let fin = ff.getDate().toString();
        if (+cel.innerText.substring(0,2) == +inn) {
          celdas.push(cel);
          ban = true;
          if (fi.getUTCDate()== ff.getUTCDate()) 
          { ban = false; return celdas; }
        }
        else if (ban && +cel.innerText.substring(0,2) == +fin) {
          celdas.push(cel);
          ban = false;
          return celdas;
        }
        else if (ban) {
          celdas.push(cel);
        }


      }
    }

  }

  ngOnInit() {
    this.indicedia = 0;
    //this.cargarDias();
  }

  cargarDias(){
    let d = this.primero.getUTCDay();
    for (let y =0; y < 6; y++){
      for (let x =0; x < 7; x++){
        let celda = document.getElementById(x.toString()+'-'+y.toString());
        if(y==0 && x==d){
          this.indicedia++; celda.innerText = this.indicedia.toString();
        }
        else if (this.indicedia >= 1 && this.indicedia < this.cantidad) { 
          this.indicedia++;
          celda.innerText = this.indicedia.toString(); 
        }
        else {this.indicedia = 0; celda.innerText="";}
      }
    }
    
  }
  //esta funcion se llama directamente desde la plantilla para verificar cual día va en cada casillero
  calculoDia(x, y) {
    let d = this.primero.getUTCDay();
    if (x == d && y == '0') { this.indicedia++; return this.indicedia; }
    else if (this.indicedia >= 1 && this.indicedia < this.cantidad) { this.indicedia++; return this.indicedia; }
    else this.indicedia = 0; return '';
  }

  //calculo de cantidad de días en un mes particular
  diasEnUnMes(mes, año) {
    return new Date(año, mes, 0).getDate();
  }

  //esta funcion es pra cambiar el mes del calendario 
  cambiarMes(t) {
    if (t == 1) {

      this.mes = "";
      this.indicedia = 0;
      let semanaEnMilisegundos = 1000 * 60 * 60 * 24 * this.cantidad;
      //let dia = 1000 * 60 * 60 * 12;

      this.actual = new Date(this.actual.getTime() + semanaEnMilisegundos);
      //this.actual = new Date(this.actual.getFullYear(), this.actual.getMonth(), 1);

      this.primero = new Date(this.actual.getFullYear(), this.actual.getMonth(), 1);

      this.cantidad = this.diasEnUnMes(this.actual.getMonth() + 1, this.actual.getFullYear());
      this.mes = this.meses[this.actual.getMonth()];
      this.limpiarcalendario();
      this.cargarDias();
      this.servicio.loadGrilla('evento').subscribe(res => { this.eventos = res; this.completarCalendario(); });
    }
    else if (t == 0) {
      this.mes = "";
      this.indicedia = 0;
      let semanaEnMilisegundos = 1000 * 60 * 60 * 24 * this.cantidad;
      //let dia = 1000 * 60 * 60 * 12;

      this.actual = new Date(this.actual.getTime() - semanaEnMilisegundos);
      //this.actual = new Date(this.actual.getFullYear(), this.actual.getMonth(), 1);
      this.primero = new Date(this.actual.getFullYear(), this.actual.getMonth(), 1);
      this.cantidad = this.diasEnUnMes(this.actual.getMonth(), this.actual.getFullYear());
      this.mes = this.meses[this.actual.getMonth()];
      this.limpiarcalendario();
      this.cargarDias();
      this.servicio.loadGrilla('evento').subscribe(res => { this.eventos = res; this.completarCalendario(); });
    }
  }

}
