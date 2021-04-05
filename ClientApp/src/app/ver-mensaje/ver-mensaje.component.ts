import { Component, OnInit } from '@angular/core';
import { mensajeestudiante } from '../clases/mensajeestudiante';
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

  mensaje: mensajeestudiante;
  mensajes: Array<mensajeestudiante>;
  estudiante: Array<any>;

  constructor(protected servicio: PeticionesService,
    protected modalService: ModalService) {
  }

  ngOnInit(): void {

    if (!this.mensajes) {

      this.estudiante = JSON.parse(localStorage.getItem("Rol"));
      //console.log(this.estudiante)

    }
    this.servicio.loadGrilla("estudiantemensaje", this.estudiante['id'].toString()).subscribe(res => { this.mensajes = res; });

  }

  abrirModal(idmsj: number, idestudiante: string, titulo: string, mensaje: string, tipo: number, menu: any) {

    let msjestudiante = new mensajeestudiante({ 'id': idmsj, 'idestudiante': idestudiante, 'tituloMensaje': '', 'nombreMateria': '', 'mensaje': '' })
    this.servicio.addSingleAbm(msjestudiante, "estudiantemensaje").subscribe(ls => {
      let mensajeHTML = mensaje;

      const modalRef =
        this.modalService.open(MyModalComponent,
          { title: titulo, message: mensaje, tipo: 5, parametros: { titulo: titulo } });
      modalRef.onResult().subscribe(de => {
        if (!this.mensajes) {

          this.estudiante = JSON.parse(localStorage.getItem("Rol"));
          //console.log(this.estudiante)

        }
        this.servicio.loadGrilla("estudiantemensaje", this.estudiante['id'].toString())
            .subscribe(res => { this.mensajes = res; }
           );
      }, error => {   if (!this.mensajes) {

        this.estudiante = JSON.parse(localStorage.getItem("Rol"));
        //console.log(this.estudiante)

      }
      this.servicio.loadGrilla("estudiantemensaje", this.estudiante['id'].toString())
          .subscribe(res => { this.mensajes = res; }); } 
    );

  });


}
}
