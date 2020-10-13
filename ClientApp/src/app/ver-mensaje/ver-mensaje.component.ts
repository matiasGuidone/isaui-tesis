import { Component, OnInit } from '@angular/core';
import {mensajeAlumno} from '../clases/mensajeAlumno';
import { PeticionesService } from '../services/peticiones.service';
import { MyModalComponent } from '../modal/MyModalComponent';
import { ModalService } from '../modal/modal-service.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-ver-mensaje',
  templateUrl: './ver-mensaje.component.html',
  styleUrls: ['./ver-mensaje.component.css']
})
export class VerMensajeComponent implements OnInit {

  mensaje: mensajeAlumno;
  mensajes: Array <mensajeAlumno>;
  alumno : Array<any>;

  constructor(protected servicio: PeticionesService,
              protected modalService: ModalService) {
  }

  ngOnInit(): void {

    if (!this.mensajes){

      this.alumno =  JSON.parse(localStorage.getItem("Rol"));
      console.log(this.alumno)

    }
    this.servicio.loadGrilla("Materiaalumnomensaje", this.alumno['id'].toString()).subscribe(res => {this.mensajes = res; console.log(this.mensajes);});

      }
        abrirModal(titulo: string, mensaje: string, tipo: number, menu: any): Observable<any> {
        let mensajeHTML = mensaje;

        const modalRef =
        this.modalService.open(MyModalComponent,
          { title: titulo, message: mensaje, tipo: 5 , parametros: {titulo: titulo} });
        return modalRef.onResult();
      }


}
