import { Component } from '@angular/core';
import { materia } from '../clases/materia';
import { alumnomateria } from '../clases/alumnomateria';
import { PeticionesService } from '../services/peticiones.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-alumnomateria',
    templateUrl: './rel-alumnomateria.component.html'

})
export class RelAlumnoMateria {

    alumnoSeleccionado = "No hay alumno seleccionado";
    listaMaterias: materia[] = new Array<materia>();

    constructor(private router: Router, private servicio: PeticionesService) {
        if (this.servicio.idsSeleccionados != null && this.servicio.idsSeleccionados.length > 0 && this.servicio.idSeleccionado != null) {
            this.servicio.idSeleccionado.toString();
            let i = this.servicio.idsSeleccionados.length;
            //for ( 0 ; i< ; i++) {
            this.guardarRecursivo(this.servicio.idsSeleccionados, i - 1);


        }
    }

    //método recursivo para el almacenado de los datos

    guardarRecursivo(res, i: number) {
        let dat = new alumnomateria("0", this.servicio.idSeleccionado.toString()
            , this.servicio.idsSeleccionados[i].toString(), "1");
        this.servicio.addSingleAbm(dat, "alumnomateria").subscribe(r => {
            if (i > 0) { this.guardarRecursivo(this.servicio.idsSeleccionados, i - 1); }
            else if(i==0){ this.servicio.idSeleccionado = null; this.servicio.idsSeleccionados = null; }

        });
    }

    ngOnInit() {}

    searchMaterias(alumno) {
        if (alumno != null) {
            this.servicio.idSeleccionado = +alumno[0];
            this.alumnoSeleccionado = alumno[1];
            let fil = new Array<string>();
            this.listaMaterias = new Array<materia>();
            fil.push("idalumno");
            fil.push(alumno[0]);
            this.servicio.loadGrilla("alumnomateria", fil).subscribe(res => {
                if (res != null && res.length > 0) {
                    let i = res.length;
                    this.getMateriaById(res, i - 1);
                   
                }
            });
        }
    }
    //método recursivo para buscar campos de materia
    getMateriaById(res, i: number) {
        this.servicio.getById(res[i].idmateria, "materia").subscribe(re => {
            this.listaMaterias.push(re);
            if (i > 0) { this.getMateriaById(res, i - 1); }
        });
    }
    //evento botón modificar
    modificar() {
        this.servicio.idsSeleccionados = new Array<number>();
        for (let i = 0; i < this.listaMaterias.length; i++) {
            this.servicio.idsSeleccionados.push(this.listaMaterias[i].id);
        }
        this.servicio.eliminarConFiltro
            ("idalumno", this.servicio.idSeleccionado.toString(), "alumnomateria")
            .subscribe(res => { this.router.navigate(["abm-materia"]); })

    }

}