import { Component } from '@angular/core';
import { materia } from '../clases/materia';
import { estudiantemateria } from '../clases/estudiantemateria';
import { PeticionesService } from '../services/peticiones.service';
import { Router } from '@angular/router';
import { AuthLoginService } from '../services/authlogin.service';
import { ciclolectivo } from '../clases/ciclolectivo';

@Component({
    selector: 'app-estudiantemateria',
    templateUrl: './rel-estudiantemateria.component.html'

})
export class RelestudianteMateria {

    estudianteSeleccionado = "No hay estudiante seleccionado";
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
        let dat = new estudiantemateria("0", this.servicio.idSeleccionado.toString()
            , this.servicio.idsSeleccionados[i].toString(), "1");
        this.servicio.addSingleAbm(dat, "estudiantemateria").subscribe(r => {
            if (i > 0) { this.guardarRecursivo(this.servicio.idsSeleccionados, i - 1); }
            else if(i==0){ this.servicio.idSeleccionado = null; this.servicio.idsSeleccionados = null; }

        });
    }

    ngOnInit() {
        // let filt = document.getElementById('filtros');
        // filt.style.marginTop = '-98px';
        document.getElementById('l-materias').style.display="none";
    }

    searchMaterias(estudiante) {
        document.getElementById('l-materias').style.display="block";
        if (estudiante != null) {
            this.servicio.idSeleccionado = +estudiante[0];
            this.estudianteSeleccionado = estudiante[1];
            let fil = new Array<string>();
            let idCiclolectivo = document.getElementById('ciclolectivo')['value'];
            this.listaMaterias = new Array<materia>();
            fil.push("idestudiante");
            fil.push(estudiante[0]);
            fil.push("idciclolectivo");
            fil.push(idCiclolectivo);
            this.servicio.loadGrilla("estudiantemateria", fil).subscribe(res => {
                if (res != null && res.length > 0) {
                    let i = res.length;
                    this.getMateriaByIds(res);
                   
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
        this.servicio.eliminarConFiltro
            (["idestudiante", this.servicio.idSeleccionado.toString(),"idciclolectivo",idCiclolectivo], "estudiantemateria")
            .subscribe(res => { this.logservicio.componenteGuard="abm-materia";  this.router.navigate(["abm-materia"]); })

    }
    closerel(){
        document.getElementById('l-materias').style.display="none";
    }

}