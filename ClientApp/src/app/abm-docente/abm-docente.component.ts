import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Component({
  selector: 'app-abm-docente',
  templateUrl: './abm-docente.component.html',
  styleUrls: ['./abm-docente.component.css']
})
export class AbmDocenteComponent implements OnInit {

  docentes: docente[];
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  ngOnInit() {
    const headers = new HttpHeaders({ });
    return this.http.get<docente[]>(this.baseUrl + 'api/Docente', { headers: headers })
      .subscribe( res => this.docentes = res);
  }
}



