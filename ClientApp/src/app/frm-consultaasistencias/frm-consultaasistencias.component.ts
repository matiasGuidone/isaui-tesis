import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal/modal-service.service';
import { PeticionesService } from '../services/peticiones.service';

@Component({
  selector: 'app-frm-consultaasistencias',
  templateUrl: './frm-consultaasistencias.component.html',
  styleUrls: ['./frm-consultaasistencias.component.css']
})
export class FrmConsultaasistenciasComponent implements OnInit {
  arrayValores: string[] = new Array<string>();
  lista: any[];
  constructor(private servicio:PeticionesService,private modalService: ModalService) { 

    //let obj = new Object({ 'Nombre/Apellido alumno': '', 'Carrera': '' ,'Curso':'','Fecha desde': new Date(),'Fecha hasta': new Date()});
    this.modalService.setCaseEstado('filtroAsistencias');
    let obj = this.modalService.estados;
    this.modalService.setFiltro(obj);
  }

  ngOnInit() {
  }

}
