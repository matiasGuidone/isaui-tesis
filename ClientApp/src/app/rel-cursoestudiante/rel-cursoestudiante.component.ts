import { Component } from '@angular/core';
import { estudiante } from '../clases/estudiante';
import { cursoestudiante } from '../clases/cursoestudiante';
import { PeticionesService } from '../services/peticiones.service';
import { Router } from '@angular/router';
import { estudiantemateria } from '../clases/estudiantemateria';
import { AuthLoginService } from '../services/authlogin.service';
import { ciclolectivo } from '../clases/ciclolectivo';

@Component({
    selector: 'app-cursoestudiante',
    templateUrl: './rel-cursoestudiante.component.html'

})
export class RelCursoestudiante {

    cursoSeleccionado = "No hay curso seleccionado";
    listaestudiantes: estudiante[] = new Array<estudiante>();
    ciclos: ciclolectivo[];

    constructor(private router: Router, public servicio: PeticionesService, protected logservicio: AuthLoginService ) {
        this.servicio.loadGrilla('ciclolectivo').subscribe(ciclos => {
            this.ciclos = ciclos;});
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

    guardarRecursivo(idsmaterias, j:number, idsestudiantes, i: number) {
        let dat = new estudiantemateria("0", this.servicio.idsSeleccionados[i].toString()
            , idsmaterias[j].id.toString(), "1");
            if (i==0 && j==0){this.servicio.idSeleccionado = null; this.servicio.idsSeleccionados=null;}
            if (i==0){j--;i = idsestudiantes.length}
            
            this.servicio.addSingleAbm(dat, "estudiantemateria").subscribe(r => {
                if (i >= 0 && j >= 0) 
                    { this.guardarRecursivo(idsmaterias, j, idsestudiantes, i - 1);}
        });
    }
    
    ngOnInit() {let filt = document.getElementById('filtros');
    filt.style.marginTop = '-98px';

    }

    searchestudiantes(curso) {
        if (curso != null) {
            this.servicio.idSeleccionado = +curso[0];
            this.cursoSeleccionado = curso[1];
            let fil = new Array<string>();
            this.listaestudiantes = new Array<estudiante>();
            fil.push("idcurso");
            fil.push(curso[0]);
            this.servicio.loadGrilla("estudiante", fil).subscribe(res => {
                this.listaestudiantes = res;
            });
        }
    }
    //evento botón modificar
    modificar() {
        this.servicio.idsSeleccionados = new Array<number>();
        for (let i = 0; i < this.listaestudiantes.length; i++) {
            this.servicio.idsSeleccionados.push(this.listaestudiantes[i].id);
        }
        
        this.servicio.eliminarConFiltro
            (["idcurso", this.servicio.idSeleccionado.toString()], "estudiantemateria")
            .subscribe(res => { this.logservicio.componenteGuard="abm-estudiante";  this.router.navigate(["abm-estudiante"]); })
    }

}