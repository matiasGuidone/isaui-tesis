import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthLoginService } from '../services/authlogin.service';



@Injectable()
export class Guard implements CanActivate {

    constructor(private router: Router, private logservicio: AuthLoginService) { }

    canActivate() {

        if (localStorage.getItem("Componentes") != 'undefined' && localStorage.getItem("Componentes") != null) {
            let componentes: any[] = JSON.parse(localStorage.getItem("Componentes"));
            if (componentes.find(da => da == this.logservicio.componenteGuard)) {
                this.logservicio.componenteGuard = '';
                return true;

            }
        }
        this.logservicio.componenteGuard = '';
        return false;
    }
}
