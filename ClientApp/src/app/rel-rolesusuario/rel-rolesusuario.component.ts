import { Component } from '@angular/core';
import { roles } from '../clases/roles'; 
import { PeticionesService } from '../services/peticiones.service';
import { Router } from '@angular/router';
import { rolesusuario } from '../clases/rolesusuario';

@Component({
    selector: 'app-rolesusuario',
    templateUrl: './rel-rolesusuario.component.html'

})
export class RelRolesUsuario {

    usuarioSeleccionado = "No hay usuario seleccionado";
    listaroles: roles[] = new Array<roles>();

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
        let dat = new rolesusuario({'id':"0", 'idusuario' : this.servicio.idSeleccionado.toString()
            , 'idroles' : this.servicio.idsSeleccionados[i].toString(), 'descripcion': ""});
        this.servicio.addSingleAbm(dat, "rolesusuario").subscribe(r => {
            if (i > 0) { this.guardarRecursivo(this.servicio.idsSeleccionados, i - 1); }
            else if(i==0){this.servicio.idSeleccionado = null; this.servicio.idsSeleccionados=null;}
        });
    }

    ngOnInit() {}

    searchRoles(usuario) {
        if (usuario != null) {
            this.servicio.idSeleccionado = +usuario[0];
            this.usuarioSeleccionado = usuario[1];
            let fil = new Array<string>();
            this.listaroles = new Array<roles>();
            fil.push("idusuario");
            fil.push(usuario[0]);
            this.servicio.loadGrilla("rolesusuario", fil).subscribe(res => {
                if (res != null && res.length > 0) {
                    let i = res.length;
                    this.getrolesById(res, i - 1); 
                }
            });
        }
    }
    //método recursivo para buscar campos de roles
    getrolesById(res, i: number) {
        this.servicio.getById(res[i].idroles, "roles").subscribe(re => {
            this.listaroles.push(re);
            if (i > 0) { this.getrolesById(res, i - 1); }
        });
    }
    //evento botón modificar
    modificar() {
        this.servicio.idsSeleccionados = new Array<number>();
        for (let i = 0; i < this.listaroles.length; i++) {
            this.servicio.idsSeleccionados.push(this.listaroles[i].id);
        }
        this.servicio.eliminarConFiltro
            ("idusuario", this.servicio.idSeleccionado.toString(), "rolesusuario")
            .subscribe(res => { this.router.navigate(["abm-roles"]); })

    }

}