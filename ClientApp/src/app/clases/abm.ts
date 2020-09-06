import { Location } from '@angular/common';
import { MyModalComponent } from '../modal/MyModalComponent';
import { ModalService } from '../modal/modal-service.service';
import { Observable } from 'rxjs';
import { PeticionesService } from '../services/peticiones.service';
import { Input } from '@angular/core';


export class abm<T>{

  @Input() lista: T[];
    objetoBlanco : T;
    nombre : string;
    constructor(protected location: Location, 
                protected modalService: ModalService,
                protected servicio: PeticionesService
                ) {}

    ngOnInit() {
      this.servicio.loadGrilla(this.nombre).subscribe(res => this.lista = res);
    }
  
      
    eliminar(id: number) {
      this.abrirModal('Confirmación', '¿ Desea eliminar el registro ?', 1, null).subscribe(
        closed => {
          return this.servicio.eliminar(id, this.nombre)
            .subscribe(json => this.servicio.loadGrilla(this.nombre)
            .subscribe(res => this.lista = res))
        });
    }
  
    abrirModal(titulo: string, mensaje: string, tipo: number, menu: any): Observable<any> {
      const modalRef = 
      this.modalService.open(MyModalComponent, 
        { title: titulo, message: mensaje, tipo: tipo, parametros: menu });
      return modalRef.onResult();
    }
 
  

    guardar(obj): Observable<T> {
      if (+obj.id != 0) {
        let param =  this.castObjeto(obj);
        return this.servicio.addSingleAbm(param, this.nombre);
      }
      else {
        let aux = this.objetoBlanco;
        let param = this.castObjeto(obj);
        return this.servicio.addSingleAbm(param, this.nombre);
      }
    }
  
    seleccionar(id) {
        let nodo = this.modalService.listAbm;
        while (nodo.getData().name == this.nombre) {
          this.modalService.listAbm = nodo.getNext();
          nodo = nodo.getNext();
        }
        this.modalService.listAbm.getData()['id'+this.nombre] = id;
        this.location.back();
      }

      editar(id: number, obj: any) {
        if (obj != null && obj != undefined) {
            obj.id = id;
            let doc = this.castObjeto(obj);
          this.abrirModal('Nuevo '+this.nombre, this.nombre, 3, doc)
          .subscribe(obj => this.guardar(obj)
          .subscribe(json => this.servicio.loadGrilla(this.nombre)
          .subscribe(res => this.lista = res)));
        }
        else if (id != 0) {
          this.abrirModal('Editar '+this.nombre, this.nombre, 3, this.lista
          .find(T => T['id'] === id)).subscribe(
            obj => this.guardar(obj)
            .subscribe(json => this.servicio.loadGrilla(this.nombre)
            .subscribe(res => this.lista = res)));
        }
        else {
          this.abrirModal('Nuevo '+this.nombre, this.nombre, 3, this.objetoBlanco)
          .subscribe(obj => this.guardar(obj)
            .subscribe(json => this.servicio.loadGrilla(this.nombre)
              .subscribe(res => this.lista = res)));
        }
      }

      castObjeto(obj) : T {

        let objaux: any = Object.assign({}, this.objetoBlanco);
        for (var i in objaux){
          let p : any = objaux[i];
          if (Number.isInteger(p)) {
            let n : any = +obj[i];
            objaux[i] = n;
          }
          else if (p instanceof Date || i.toString().startsWith('fecha', 0)){
            let d : any = new Date(obj[i]);
            objaux[i] = d;
          }
          else {
            objaux[i] = obj[i];
          }
        }
        return objaux;
      }

      

     
}
