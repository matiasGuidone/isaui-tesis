import { Component } from '@angular/core';
import { alumno } from '../clases/alumno';
import { cursoalumno } from '../clases/cursoalumno';
import { PeticionesService } from '../services/peticiones.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-cursoalumno',
    templateUrl: './rel-cursoalumno.component.html'

})
export class RelCursoAlumno {

    cursoSeleccionado = "No hay curso seleccionado";
    listaAlumnos: alumno[] = new Array<alumno>();

    constructor(private router: Router, private servicio: PeticionesService) {
        if (this.servicio.idsSeleccionados != null && this.servicio.idSeleccionado != null) {
            this.servicio.idSeleccionado.toString();
            let i = this.servicio.idsSeleccionados.length;
            //for ( 0 ; i< ; i++) {
            this.guardarRecursivo(this.servicio.idsSeleccionados, i - 1);


        }
    }

    //método recursivo para el almacenado de los datos

    guardarRecursivo(res, i: number) {
        let dat = new cursoalumno("0", this.servicio.idSeleccionado.toString()
            , this.servicio.idsSeleccionados[i].toString(), "1");
        this.servicio.addSingleAbm(dat, "cursoalumno").subscribe(r => {
            if (i > 0) { this.guardarRecursivo(this.servicio.idsSeleccionados, i - 1); }

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
            this.servicio.loadGrilla("cursoalumno", fil).subscribe(res => {
                if (res != null && res.length > 0) {
                    let i = res.length;
                    this.getAlumnoById(res, i - 1);
                    // for (let i = 0; i < res.length; i++) {

                    // }
                }
            });
        }
    }
    //método recursivo para buscar campos de alumno
    getAlumnoById(res, i: number) {
        this.servicio.getById(res[i].idalumno, "alumno").subscribe(re => {
            this.listaAlumnos.push(re);
            if (i > 0) { this.getAlumnoById(res, i - 1); }
        });
    }
    //evento botón modificar
    modificar() {
        this.servicio.idsSeleccionados = new Array<number>();
        for (let i = 0; i < this.listaAlumnos.length; i++) {
            this.servicio.idsSeleccionados.push(this.listaAlumnos[i].id);
        }
        this.servicio.eliminarConFiltro
            ("idcurso", this.servicio.idSeleccionado.toString(), "cursoalumno")
            .subscribe(res => { this.router.navigate(["abm-alumno"]); })

    }

}