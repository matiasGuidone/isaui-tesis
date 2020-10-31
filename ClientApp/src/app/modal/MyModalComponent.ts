import { Component,OnInit } from '@angular/core';
import { Modal } from './models/modal.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalService } from './modal-service.service';
import { Router } from '@angular/router';
import Nodo from '../clases/Nodo';
import { AuthLoginService } from '../services/authlogin.service';


@Component({
  templateUrl: './MyModalComponent.html',
  styleUrls: ['./Modal.css']
})
export class MyModalComponent extends Modal implements OnInit {
  title: string;
  message: string;
  tipo: number;
  parametros: any[];
  formGroup: FormGroup;
  objetoIn: any;


  constructor(private modalService: ModalService, private router: Router, private logservicio: AuthLoginService) {
    super();
    this.formGroup = new FormGroup({});
    this.modalService.setListaAbm();
  }

  ngOnInit(){
    // Tipo 5 : Mensajes Vista
   /*  if (this.tipo == 5){
      let htmlvista = document.getElementById('htmlvista');
      htmlvista.innerHTML = this.message;
      } */
  }

  onInjectInputs(inputs): void {
    this.title = inputs.title;
    this.message = inputs.message;
    this.tipo = inputs.tipo;
    if (inputs.parametros != null && inputs.parametros != undefined) {
      this.modalService.setListaAbm();
      this.parametros = new Array();
      for (var i in inputs.parametros) {
        //objeto.hasOwnProperty se usa para filtrar las propiedades del objeto
        let tp: string = "text";
        if (Number.isInteger(inputs.parametros[i])) {
          tp = "number";
        }
        else if (inputs.parametros[i] instanceof Date) {
          tp = "date"
        }
        if (i.toString().toUpperCase().startsWith('FECHA', 0)) {
          tp = "date";
          inputs.parametros[i] = this.formatearFecha(inputs.parametros[i]);
        }
        else if (i.toString().startsWith('codigo', 0)) {
          tp = "password";
        }
        else if (i.toString().startsWith('hora', 0)) {
          tp = "time";
        }
        let obj = new ObjetoValor(i.toString(), inputs.parametros[i].toString(), tp);
        this.parametros.push(obj);
        this.formGroup.addControl(obj.tipo, new FormControl(obj.valor.toString(), Validators.required));
        if (obj.tipo == 'estado' || obj.tipo == 'tipo') {
          let abm = this.router.url.substring(5);
          this.modalService.setCaseEstado(abm);
        }
        if (obj.tipo.length > 2 && obj.tipo.startsWith('id', 0)) {
          this.buscarDescripcion(i.toString(), inputs.parametros[i].toString());
        }
      }
      this.objetoIn = inputs.parametros;

    }

  }


  save(): boolean {
    this.close('saving');
    return true;
  }


  cancel(): boolean {
    //this.message contiene el nombre del objeto actual
    //this.modalService.listAbm.getData().name contiene el nombre del objeto en la lista de nodos
    //
    if (this.modalService.listAbm != null && this.modalService.listAbm != undefined) {
      if (this.modalService.listAbm.getData().name == this.message
        && (this.modalService.listAbm.getNext() == null
          || this.modalService.listAbm.getNext() == undefined)) {
        this.modalService.listAbm = null;
      }
      this.modalService.setListaAbm();
    }
    this.dismiss('canceling');
    return false;
  }

  guardar(): any {
    let objeto = Object.assign({}, this.formGroup.value);
    if (this.modalService.listAbm != null && this.modalService.listAbm != undefined) {
      if (this.modalService.listAbm.getData().name == this.message
        && (this.modalService.listAbm.getNext() == null
          || this.modalService.listAbm.getNext() == undefined)) {
        this.modalService.listAbm = null;
      }
      this.modalService.setListaAbm();
    }
    this.close(objeto);
    return true;

  }

  abrirAbm(abm: string, actual: string) {
    let ruta = "abm-" + abm.substr(2);
    let objeto = Object.assign({}, this.formGroup.value);
    objeto.name = actual;
    if (this.modalService.listAbm == null || this.modalService.listAbm == undefined) {
      this.modalService.listAbm = new Nodo(objeto);
    }
    else {
      if (objeto.name == this.modalService.listAbm.getData().name) {
        this.modalService.listAbm.setData(objeto);
      } else {
        let nodo = new Nodo(objeto);
        nodo.setNext(this.modalService.listAbm);
        this.modalService.listAbm = nodo;
      }
    }
    this.logservicio.componenteGuard = ruta;
    this.router.navigate([ruta]);
    //this.cancel();
    this.modalService.setListaAbm();
    this.modalService.actual = abm.substr(2);
    this.dismiss('canceling');
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
  buscarDescripcion(desc: string, val: string) {
    let par = desc.substr(2);
    let valor = "0";
    try {
      valor = document.getElementById("in-" + desc)['value'];
      document.getElementById(desc + '-desc')['value'] = "";
      this.formGroup.get(desc).setValue('');
    }
    catch (e) { valor = val; }
    this.modalService.getDescripcion(valor, par)
      .subscribe(
        res => this.cargarCampo(res, desc));

  }
  cargarCampo(res: any, desc: string) {
    for (var i in res) {
      this.formGroup.get(desc).setValue(res['id']);
      document.getElementById(desc + '-desc')['value'] = res[i];
      break;
    }
  }
  isValidDesc(campo): boolean {
    try {
      if (document.getElementById(campo + '-desc')['value'] != '') { this.formGroup.get(campo).setValue(''); return true; }
      else return false;
    } catch (excep) { this.formGroup.get(campo).setValue(''); return true; }
  }

  selectRol(item) {
    this.close(item);
    return true;

  }
}

class ObjetoValor {
  tipo: string;
  valor: string;
  tipoCampo: string;
  constructor(tipo: string, valor: string, tipoCampo: string) {
    this.tipo = tipo;
    this.valor = valor;
    this.tipoCampo = tipoCampo;
  }
}
