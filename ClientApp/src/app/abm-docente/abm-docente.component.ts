import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-abm-docente',
  templateUrl: './abm-docente.component.html',
  styleUrls: ['./abm-docente.component.css']
})
export class AbmDocenteComponent implements OnInit {

  docentes: docente[];
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private router: Router) { }

  ngOnInit() {
    const headers = new HttpHeaders({ });
    return this.http.get<docente[]>(this.baseUrl + 'api/Docente', { headers: headers })
      .subscribe( res => this.docentes = res);
  }
  editar(id: number){}
  eliminar(id: number){
    const headers = new HttpHeaders({'id' : id.toString()});
    return this.http.delete(this.baseUrl + 'api/Docente', { headers: headers })
      .subscribe( this.actualizar);
  }
  actualizar(){
    this.router.navigate(["/abm-docente"]);
  }
}



