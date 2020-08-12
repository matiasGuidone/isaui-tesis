import { Component } from '@angular/core';
import { materia } from '../clases/materia';
import { docentemateria } from '../clases/docentemateria';
import { PeticionesService } from '../services/peticiones.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-docentemateria',
    templateUrl: './rel-docentemateria.component.html'

})
export class RelDocenteMateria {

    docenteSeleccionado = "No hay docente seleccionado";
    listaMaterias: materia[] = new Array<materia>();

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
        let dat = new docentemateria("0", this.servicio.idSeleccionado.toString()
            , this.servicio.idsSeleccionados[i].toString(), "1");
        this.servicio.addSingleAbm(dat, "docentemateria").subscribe(r => {
            if (i > 0) { this.guardarRecursivo(this.servicio.idsSeleccionados, i - 1); }

        });
    }

    ngOnInit() {

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
                    // for (let i = 0; i < res.length; i++) {

                    // }
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
            ("iddocente", this.servicio.idSeleccionado.toString(), "docentemateria")
            .subscribe(res => { this.router.navigate(["abm-materia"]); })

    }

}