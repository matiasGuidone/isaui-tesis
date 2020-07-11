import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

//ventanas modales
import { MyModalComponent } from '../modal/MyModalComponent';
import { ModalService } from '../modal/modal-service.service';
import { Observable } from 'rxjs';
//ventanas modales

@Component({
  selector: 'app-abm-docente',
  templateUrl: './abm-docente.component.html',
  styleUrls: ['./abm-docente.component.css']
})
export class AbmDocenteComponent implements OnInit {

  docentes: docente[];
  constructor(private modalService:ModalService, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private router: Router) { }

  ngOnInit() {
    const headers = new HttpHeaders({ });
    return this.http.get<docente[]>(this.baseUrl + 'api/Docente', { headers: headers })
      .subscribe( res => this.docentes = res);
  }
  editar(id: number){
    this.abrirModal('Editar docente', '' , 3,   this.docentes.find( docente => docente.id === id )).subscribe(
      close => {
        let obj = close;
        console.log(obj);
    //const headers = new HttpHeaders({'id' : id.toString()});
    //return this.http.delete(this.baseUrl + 'api/Docente', { headers: headers })
    //  .subscribe( this.actualizar);});
  
  });
}

  eliminar(id: number){
    this.abrirModal('Confirmación', '¿ Desea eliminar el registro ?', 1, null).subscribe(
      closed => {
    const headers = new HttpHeaders({'id' : id.toString()});
    return this.http.delete(this.baseUrl + 'api/Docente', { headers: headers })
      .subscribe( this.actualizar);});
  }

  actualizar(){
    this.router.navigate(["/abm-docente"]);
  }

  //ventanas modales
  abrirModal(titulo: string, mensaje: string, tipo: number, docente:any): Observable<any> {
    const modalRef = this.modalService.open(MyModalComponent, { title: titulo, message: mensaje, tipo: tipo , parametros : docente });
    return modalRef.onResult();
  }
}



