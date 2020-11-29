import { Component } from '@angular/core';
import { materia } from '../clases/materia';
import { alumnomateria } from '../clases/alumnomateria';
import { PeticionesService } from '../services/peticiones.service';
import { Router } from '@angular/router';
import { AuthLoginService } from '../services/authlogin.service';
import { ciclolectivo } from '../clases/ciclolectivo';

@Component({
    selector: 'app-alumnomateria',
    templateUrl: './rel-alumnomateria.component.html'

})
export class RelAlumnoMateria {

    alumnoSeleccionado = "No hay alumno seleccionado";
    listaMaterias: materia[] = new Array<materia>();
    ciclos: ciclolectivo[];

    constructor(private router: Router, private servicio: PeticionesService, protected logservicio: AuthLoginService ) {
        this.servicio.loadGrilla('ciclolectivo').subscribe(ciclos => {
            this.ciclos = ciclos;});
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

    ngOnInit() {let filt = document.getElementById('filtros');
    filt.style.marginTop = '-98px';}

    searchMaterias(alumno) {
        if (alumno != null) {
            this.servicio.idSeleccionado = +alumno[0];
            this.alumnoSeleccionado = alumno[1];
            let fil = new Array<string>();
            let idCiclolectivo = document.getElementById('ciclolectivo')['value'];
            this.listaMaterias = new Array<materia>();
            fil.push("idalumno");
            fil.push(alumno[0]);
            fil.push("idciclolectivo");
            fil.push(idCiclolectivo);
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
        let idCiclolectivo = document.getElementById('ciclolectivo')['value'];
        this.servicio.eliminarConFiltro
            (["idalumno", this.servicio.idSeleccionado.toString(),"idciclolectivo",idCiclolectivo], "alumnomateria")
            .subscribe(res => { this.logservicio.componenteGuard="abm-materia";  this.router.navigate(["abm-materia"]); })

    }

}