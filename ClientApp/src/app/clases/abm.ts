import { Location } from '@angular/common';
import { MyModalComponent } from '../modal/MyModalComponent';
import { ModalService } from '../modal/modal-service.service';
import { Observable } from 'rxjs';
import { PeticionesService } from '../services/peticiones.service';
import { Input } from '@angular/core';
import { AuthLoginService } from '../services/authlogin.service';


export class abm<T>{

  @Input() lista: T[];
    objetoBlanco : T;
    cantidad : number = 0;
    registrosvistos : number = 20;
    banord = true;
    nombre : string;
    constructor(protected location: Location,
                protected modalService: ModalService,
                protected servicio: PeticionesService,
                protected logservicio: AuthLoginService
                ) {}

    ngOnInit() {
      this.servicio.getCantidad(this.nombre).subscribe(cantidad =>{
        this.cantidad = cantidad;
        if(cantidad >0){this.servicio.loadGrilla(this.nombre,null,'20','0').subscribe(res => this.lista = res);}
        else{ this.servicio.loadGrilla(this.nombre).subscribe(res => this.lista = res);}
      });
      
    }


    eliminar(id: number) {
      this.abrirModal('Confirmación', '¿ Desea eliminar el registro ?', 1, null).subscribe(
        closed => {
          return this.servicio.eliminar(id, this.nombre)
            .subscribe(json => {
              let notificacion = document.getElementById("notificacion");
              let textnotificacion = document.getElementById("textnotificacion");
              if (json != null && json != undefined && json.toString() != "error"){
                notificacion.className = "alert alert-success alert-dismissible fade show";
                notificacion.style.display = "block";
                textnotificacion.innerText = ""+json;
                this.servicio.loadGrilla(this.nombre)
                .subscribe(res => {this.lista = res;});}
              else{
                notificacion.className = "alert alert-danger alert-dismissible fade show";
                notificacion.style.display = "block";
                textnotificacion.innerText = "error durante el proceso de eliminacion, no se pudo completar"
              }
              })
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
        this.location.subscribe(r=>{ this.logservicio.componenteGuard = r.url.toString().substring(1); });
      }

      editar(id: number, obj: any) {
        if (obj != null && obj != undefined) {
            obj.id = id;
            let doc = this.castObjeto(obj);
          this.abrirModal('Nuevo '+this.nombre, this.nombre, 3, doc)
          .subscribe(obj => this.guardar(obj)
          .subscribe(json => {
            let notificacion = document.getElementById("notificacion");
            let textnotificacion = document.getElementById("textnotificacion");
            if (json != null && json != undefined ){
              notificacion.className = "alert alert-success alert-dismissible fade show";
              notificacion.style.display = "block";
              textnotificacion.innerText = ""+json;}
            else{
              notificacion.className = "alert alert-danger alert-dismissible fade show";
              notificacion.style.display = "block";
              textnotificacion.innerText = "error durante el proceso de almacenado"
            }
            this.servicio.loadGrilla(this.nombre)
          .subscribe(res => this.lista = res);}));
        }
        else if (id != 0) {
          this.abrirModal('Editar '+this.nombre, this.nombre, 3, this.lista
          .find(T => T['id'] === id)).subscribe(
            obj => this.guardar(obj)
            .subscribe(json => {
              let notificacion = document.getElementById("notificacion");
              let textnotificacion = document.getElementById("textnotificacion");
              if (json != null && json != undefined){
                notificacion.className = "alert alert-success alert-dismissible fade show";
                notificacion.style.display = "block";
                textnotificacion.innerText = ""+json;}
              else{
                notificacion.className = "alert alert-danger alert-dismissible fade show";
                notificacion.style.display = "block";
                textnotificacion.innerText = "error durante el proceso de almacenado"
              }
              this.servicio.loadGrilla(this.nombre)
            .subscribe(res => this.lista = res);}));
        }
        else {
          this.abrirModal('Nuevo '+this.nombre, this.nombre, 3, this.objetoBlanco)
          .subscribe(obj => this.guardar(obj)
            .subscribe(json => {
              let notificacion = document.getElementById("notificacion");
              let textnotificacion = document.getElementById("textnotificacion");
              if (json != null && json != undefined){
                notificacion.className = "alert alert-success alert-dismissible fade show";
                notificacion.style.display = "block";
                textnotificacion.innerText = ""+json;}
              else{
                notificacion.className = "alert alert-danger alert-dismissible fade show";
                notificacion.style.display = "block";
                textnotificacion.innerText = "error durante el proceso de almacenado"
              }
              this.servicio.loadGrilla(this.nombre)
              .subscribe(res => this.lista = res);}));
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

      ordenar(col){ 
        if(this.banord){
        this.lista = this.lista.sort(function (a, b) {
          if (a[col] > b[col]) {
            return 1;
          }
          if (a[col] < b[col]) {
            return -1;
          }
          // a must be equal to b
          
          return 0;
        }); this.banord = false;}
        else{
          this.lista = this.lista.sort(function (a, b) {
            if (a[col] < b[col]) {
              return 1;
            }
            if (a[col] > b[col]) {
              return -1;
            }
            
            // a must be equal to b
            return 0;
          });this.banord = true;
        }
      }

      paginar(dat){
        switch (dat) { 
          case "limite":
            this.registrosvistos = +document.getElementById("limite")['value'];
            this.servicio.loadGrilla(this.nombre,null,this.registrosvistos.toString(),'0').subscribe(res => {this.lista = res;});
            break; 
          default: 
            this.servicio.loadGrilla(this.nombre,null,this.registrosvistos.toString(),(dat*this.registrosvistos).toString()).subscribe(res => {this.lista = res;});
            break;
        }
      }


}
