import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalService } from '../modal/modal-service.service';
import { MyModalComponent } from '../modal/MyModalComponent';
import { PeticionesService } from '../services/peticiones.service';

@Component({
  selector: 'app-frm-consultaasistencias',
  templateUrl: './frm-consultaasistencias.component.html',
  styleUrls: ['./frm-consultaasistencias.component.css']
})
export class FrmConsultaasistenciasComponent implements OnInit {
  arrayValores: string[] = new Array<string>();
  lista: any[];
  constructor(public servicio:PeticionesService,private modalService: ModalService) { 

    //let obj = new Object({ 'Nombre/Apellido estudiante': '', 'Carrera': '' ,'Curso':'','Fecha desde': new Date(),'Fecha hasta': new Date()});
    this.modalService.setCaseEstado('filtroAsistencias');
    let obj = this.modalService.estados;
    this.modalService.setFiltro(obj);
  }

  ngOnInit() {
  }
  setList(list){
    if(list.length == 0){
        this.abrirModal("Datos filtrados", "No se encontraron datos con los criterios de búsqueda empleados", 2, null).subscribe(el=> console.log(el));
    }
    this.lista = list;
  }

  abrirModal(titulo: string, mensaje: string, tipo: number, menu: any): Observable<any> {
    const modalRef = 
    this.modalService.open(MyModalComponent, 
      { title: titulo, message: mensaje, tipo: tipo, parametros: menu });
    return modalRef.onResult();
  }
}
