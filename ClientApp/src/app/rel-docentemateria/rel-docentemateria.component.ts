import { Component } from '@angular/core';
import { materia } from '../clases/materia';
import { docentemateria } from '../clases/docentemateria';
import { PeticionesService } from '../services/peticiones.service';
import { Router } from '@angular/router';
import { AuthLoginService } from '../services/authlogin.service';
import { ciclolectivo } from '../clases/ciclolectivo';

@Component({
    selector: 'app-docentemateria',
    templateUrl: './rel-docentemateria.component.html',
    styleUrls: ['./rel-docentemateria.component.css']

})
export class RelDocenteMateria {

    docenteSeleccionado = "No hay docente seleccionado";
    listaMaterias: materia[] = new Array<materia>();
    ciclos: ciclolectivo[];

    constructor(private router: Router, public servicio: PeticionesService, protected logservicio: AuthLoginService ) {
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
        let dat = new docentemateria({'id':"0", 'iddocente' : this.servicio.idSeleccionado.toString()
            , 'idmateria' : this.servicio.idsSeleccionados[i].toString(), 'idciclolectivo': this.servicio.idcicloseleccionado});
        this.servicio.addSingleAbm(dat, "docentemateria").subscribe(r => {
            if (i > 0) { this.guardarRecursivo(this.servicio.idsSeleccionados, i - 1); }
            else if(i==0){this.servicio.idSeleccionado = null; this.servicio.idsSeleccionados=null;}
        });
    }

    ngOnInit() {
        // let filt = document.getElementById('filtros');
        // filt.style.marginTop = '-98px';
        document.getElementById('l-materias').style.display="none";
    }

    searchMaterias(docente) {
        document.getElementById('l-materias').style.display="block";
        if (docente != null) {
            this.servicio.idSeleccionado = +docente[0];
            this.docenteSeleccionado = docente[1];
            let fil = new Array<string>();
            let idCiclolectivo = document.getElementById('ciclolectivo')['value'];
            this.listaMaterias = new Array<materia>();
            fil.push("iddocente");
            fil.push(docente[0]);
            fil.push("idciclolectivo");
            fil.push(idCiclolectivo);
            //console.log(fil);
            this.servicio.loadGrilla("docentemateria", fil).subscribe(res => {
                if (res != null && res.length > 0) {
                    let i = res.length;
                    this.getMateriaByIds(res);
                    // for (let i = 0; i < res.length; i++) {

                    // }
                }
            });
        }
    }
    //método recursivo para buscar campos de materia
    getMateriaByIds(res) {
        let ids = new Array();
        for(let r of res ){ids.push(r.idmateria);}
        this.servicio.loadGrilla("materia",["ids",ids.join("-").toString()]).subscribe(re => {
            this.listaMaterias = re; 
        });
    }
    //evento botón modificar
    modificar() {
        this.servicio.idsSeleccionados = new Array<number>();
        for (let i = 0; i < this.listaMaterias.length; i++) {
            this.servicio.idsSeleccionados.push(this.listaMaterias[i].id);
        }
        let idCiclolectivo = document.getElementById('ciclolectivo')['value'];
        this.servicio.idcicloseleccionado = idCiclolectivo;
        this.servicio.eliminarConFiltro
            (["iddocente", this.servicio.idSeleccionado.toString(), "idciclolectivo", idCiclolectivo.toString() ], "docentemateria")
            .subscribe(res => {  this.logservicio.componenteGuard="abm-materia"; this.router.navigate(["abm-materia"]); })

    }
    closerel(){
        document.getElementById('l-materias').style.display="none";
    }

}