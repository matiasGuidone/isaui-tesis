import { Component } from '@angular/core';
import { alumno } from '../clases/alumno';
import { cursoalumno } from '../clases/cursoalumno';
import { PeticionesService } from '../services/peticiones.service';
import { Router } from '@angular/router';
import { alumnomateria } from '../clases/alumnomateria';

@Component({
    selector: 'app-cursoalumno',
    templateUrl: './rel-cursoalumno.component.html'

})
export class RelCursoAlumno {

    cursoSeleccionado = "No hay curso seleccionado";
    listaAlumnos: alumno[] = new Array<alumno>();

    constructor(private router: Router, private servicio: PeticionesService) {
        if (this.servicio.idsSeleccionados != null && this.servicio.idSeleccionado != null) {
            let idcurso = this.servicio.idSeleccionado.toString();
            let i = this.servicio.idsSeleccionados.length;
            //se realiza una búsqueda de los ids de las materias del curso seleccionado
            this.servicio.loadGrilla("materia", ['idcurso',idcurso]).subscribe(
                idsmaterias =>{
                this.guardarRecursivo
                    (idsmaterias, idsmaterias.length-1 , this.servicio.idsSeleccionados, i - 1);}
            );
             //this.servicio.idsSeleccionados.length;
            
        }
    }

    //método recursivo para el almacenado de los datos

    guardarRecursivo(idsmaterias, j:number, idsalumnos, i: number) {
        let dat = new alumnomateria("0", this.servicio.idsSeleccionados[i].toString()
            , idsmaterias[j].id.toString(), "1");
            if (i==0 && j==0){this.servicio.idSeleccionado = null; this.servicio.idsSeleccionados=null;}
            if (i==0){j--;i = idsalumnos.length}
            
            this.servicio.addSingleAbm(dat, "alumnomateria").subscribe(r => {
                if (i >= 0 && j >= 0) 
                    { this.guardarRecursivo(idsmaterias, j, idsalumnos, i - 1);}
        });
    }
    
    ngOnInit() {

    }

    searchalumnos(curso) {
        if (curso != null) {
            this.servicio.idSeleccionado = +curso[0];
            this.cursoSeleccionado = curso[1];
            let fil = new Array<string>();
            this.listaAlumnos = new Array<alumno>();
            fil.push("idcurso");
            fil.push(curso[0]);
            this.servicio.loadGrilla("alumno", fil).subscribe(res => {
                this.listaAlumnos = res;
            });
        }
    }
    //evento botón modificar
    modificar() {
        this.servicio.idsSeleccionados = new Array<number>();
        for (let i = 0; i < this.listaAlumnos.length; i++) {
            this.servicio.idsSeleccionados.push(this.listaAlumnos[i].id);
        }
        this.servicio.eliminarConFiltro
            ("idcurso", this.servicio.idSeleccionado.toString(), "alumnomateria")
            .subscribe(res => { this.router.navigate(["abm-alumno"]); })
    }

}