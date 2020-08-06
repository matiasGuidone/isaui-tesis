import { Component, OnInit } from '@angular/core';
import {CicloLectivo} from '../clases/ciclolectivo';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import {PeticionesService} from '../services/peticiones.service';

//VentanaModal
import { MyModalComponent } from '../modal/MyModalComponent';
import { ModalService } from '../modal/modal-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-abm-ciclolectivo',
  templateUrl: './abm-ciclolectivo.component.html',
  styleUrls: ['./abm-ciclolectivo.component.css'],
  providers:[PeticionesService]
})
export class AbmCiclolectivoComponent implements OnInit {

  ciclosLectivos: Array<CicloLectivo>;

  fecha: Date = new Date();

  constructor(public modalService: ModalService,
              private location: Location,
              private router: Router,
              private _peticionesService: PeticionesService,
              
    )
    {}
  ngOnInit() {
    // llamamos al servicio y al metodo loadGrilla que nos devolvera el contenido de nuestra tabla
    this._peticionesService.loadGrilla("ciclolectivo").subscribe(  
      x => {console.log('Observer tuvo un valor: ' + x);
    //guardamos la informacion dentro de nuestro arreglo de tipo cicloLectivo
    this.ciclosLectivos = x;
    console.log(this.ciclosLectivos);
     
  },
    // si tenemos algun error reportara via consola
    err => console.error('Observer got an error: ' + err)
    );
  }
// editar el registro que seleccionemos mediante su id
  editar(id: number){
    if (id != null && id != 0){
         for (let i= 0; i<this.ciclosLectivos.length; i++){
           if (id == this.ciclosLectivos[i].id){
             // creamos un nuevo objeto "registroFilled" llendando con los datos que coinciden con el id solicitado
            let registroFilled = new CicloLectivo(
              this.ciclosLectivos[i].id,
              this.ciclosLectivos[i].nombre,
              this.ciclosLectivos[i].descripcion
              );
              //abrimos el modal -------
            // esta es una alternativa al modal inicial--- ya que he experimentado problemas con el backend
            // cargamos nuestro objeto "registroFilled" al modal
            this.abrirModal('Nuevo ciclo Lectivo', 'curso' , 3, registroFilled).subscribe( 
             x =>{
               // aqui crearemos un nevo objeto con las modificaciones que haremos dentro del campo del modal
             let updateRegistro= new CicloLectivo(id, x.nombre, x.descripcion);
             this._peticionesService.addSingleAbm(updateRegistro,"ciclolectivo").subscribe(
             r => {
               // si esta todo bien el back nos respondera con la leyenda "Guardado Exitoso"
                console.log('El back-end respondio: ' + r);
                this._peticionesService.loadGrilla("ciclolectivo").subscribe(  
                  x => {
                this.ciclosLectivos = x;   
              },
                // si tenemos algun error reportara via consola
             err => console.error('error: ' + err)
                );
              },
             err => console.error('error: ' + err.data))
             }
             ,
             err=>{ console.log(err);
             }); 
           }
         }
  }

}
addRecord(){
let registro = new CicloLectivo(0,"","");
// alternativa modal
this.abrirModal('Nuevo ciclo Lectivo', 'curso' , 3, registro).subscribe( 
 x =>{
 let nuevoRegistro= new CicloLectivo(0, x.nombre, x.descripcion);
 this._peticionesService.addSingleAbm(nuevoRegistro,"ciclolectivo").subscribe(
 r => {
    console.log('El back-end respondio: ' + r);
    this._peticionesService.loadGrilla("ciclolectivo").subscribe(  
      x => {
    this.ciclosLectivos = x;   
  },
    // si tenemos algun error reportara via consola
 err => console.error('error: ' + err)
    );
  },
 err => console.error('error: ' + err.data))
 }
 ,
 err=>{ console.log(err);
 }); 
}

eliminar(id: number){
  this.abrirModal('Confirmación', '¿ Desea eliminar el registro ?', 1, null).subscribe(
    closed => {
  return this._peticionesService.eliminar(id, "ciclolectivo")
    .subscribe(json => this._peticionesService.loadGrilla("ciclolectivo")
    .subscribe( res => this.ciclosLectivos = res))});
}

//ventanas modales
abrirModal(titulo: string, mensaje: string, tipo: number, CicloLectivo: any): Observable<any>{
  const modalRef = this.modalService.open(MyModalComponent, { title: titulo, message: mensaje, tipo: tipo , parametros : CicloLectivo });
  return modalRef.onResult();
}


}
