import { Component, OnInit } from '@angular/core';
import { materia } from '../clases/materia';
import { docentemateria } from '../clases/docentemateria';
import { PeticionesService } from '../services/peticiones.service';
import { Router } from '@angular/router';
import { AuthLoginService } from '../services/authlogin.service';

@Component({
  selector: 'app-carganotadocente',
  templateUrl: './carganotadocente.component.html',
  styleUrls: ['./carganotadocente.component.css']
})
export class CarganotadocenteComponent implements OnInit {

  docenteSeleccionado = "No hay docente seleccionado";
    listaMaterias: materia[] = new Array<materia>();

  constructor(private router: Router, private servicio: PeticionesService, protected logservicio: AuthLoginService) { }
  
  rol : any;
  
  ngOnInit() {
    if (localStorage.getItem("Rol") != undefined && localStorage.getItem("Rol") != 'undefined' )
    {
      this.rol = JSON.parse(localStorage.getItem("Rol"));
    }
  }

  getMateriaById(res, i: number) {
    this.servicio.getById(res[i].idmateria, "materia").subscribe(re => {
        this.listaMaterias.push(re);
        if (i > 0) { this.getMateriaById(res, i - 1); }
    });
}

searchMaterias(docente) {
  if (docente != null) {
      this.servicio.idSeleccionado = +docente[0];
      this.docenteSeleccionado = docente[1];
      let fil = new Array<string>();
      this.listaMaterias = new Array<materia>();
      fil.push("iddocente");
      fil.push(docente[0]);
      this.servicio.loadGrilla("docentemateria", fil).subscribe(res => {
          if (res != null && res.length > 0) {
              let i = res.length;
              this.getMateriaById(res, i - 1);

          }
      });
  }
}


}
