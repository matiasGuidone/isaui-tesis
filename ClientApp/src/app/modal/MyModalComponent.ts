 import { Component } from '@angular/core';
import { Modal } from './models/modal.model';
import {  FormGroup, FormControl, Validators} from '@angular/forms';
import { ModalService } from './modal-service.service';


@Component({
  templateUrl: './MyModalComponent.html',
})
export class MyModalComponent extends Modal {
  title: string;
  message: string;
  tipo: number;
  parametros : any[];
  formGroup: FormGroup ;
  objetoIn: any;
  constructor(private modalService: ModalService){
    super();
    this.formGroup = new FormGroup({});

  }
  onInjectInputs(inputs): void {
    this.title = inputs.title;
    this.message = inputs.message;
    this.tipo = inputs.tipo;
    if (inputs.parametros !=null && inputs.parametros != undefined){
    this.parametros = new Array();
    for (var i in inputs.parametros) {
      //objeto.hasOwnProperty se usa para filtrar las propiedades del objeto
      let tp : string= "text";
      if(Number.isInteger(inputs.parametros[i])){
        tp = "number";
      }
      else if(inputs.parametros[i] instanceof Date){
        tp = "date"
      }
      console.log(tp);
      let obj = new ObjetoValor(i.toString(), inputs.parametros[i].toString(), tp);
      this.parametros.push(obj);
      this.formGroup.addControl(obj.tipo, new FormControl(obj.valor.toString(), Validators.required));
    }
     this.objetoIn =  inputs.parametros;
  
  }
}

  save(): boolean {
    this.close('saving');
    return true;
  }

  cancel(): boolean {
    this.dismiss('canceling');
    return false;
  }

  guardar(): any {
    let objeto = Object.assign({}, this.formGroup.value);
    this.close(objeto); 
    return true;
   }

}

class ObjetoValor{
  tipo :string;
  valor : string;
  tipoCampo : string;
  constructor(tipo : string, valor : string, tipoCampo: string){
    this.tipo =tipo;
    this.valor = valor;
    this.tipoCampo = tipoCampo;
  }
}