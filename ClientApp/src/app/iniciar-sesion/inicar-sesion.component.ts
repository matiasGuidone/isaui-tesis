import { Component, OnInit } from '@angular/core';
import { AuthLoginService } from '../services/authlogin.service';
import { usuario } from '../clases/usuario';
import { abm } from '../clases/abm';
import { PeticionesService } from '../services/peticiones.service';// sacar 
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { MyModalComponent } from '../modal/MyModalComponent';
import { ModalService } from '../modal/modal-service.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {
  nCuenta: string;
  nClave: string;
  constructor(private autS: AuthLoginService, protected modalService: ModalService, private router: Router) { }

  onLogin() {
    const user = { nombre: this.nCuenta, codigo: this.nClave };
    this.autS.login(user).subscribe(res => {
      console.log(res);
      if (res != "404") { this.router.navigate(['autogestion']); }
      else {
        this.abrirModal("Inicio de sesión", "El usuario y contraseña ingresados no son válidos", 2, null).subscribe(n => {  localStorage.setItem("InicioSesion", "false" );});
      }
    },
      er => {
        console.log(er);
        this.abrirModal("Inicio de sesión", "El usuario y contraseña ingresados no son válidos", 2, null).subscribe(n => { console.log(n); });
      }
    );
    /* console.log(user) */
    /* this.autS.login(user).subscribe(res=>{
      this.router.navigateByUrl(this.urls)
    }); */



    /* this.peticionesService.login(user, "prueba").subscribe(
      data =>{console.log(data);},
      error =>{console.log(error);} //pasa por error 
    ); */
  }
  enterLogin(key) {
    if (key.keyCode === 13) {
      this.onLogin();
    }
  }
  ngOnInit() {
  }

  abrirModal(titulo: string, mensaje: string, tipo: number, menu: any): Observable<any> {
    const modalRef =
      this.modalService.open(MyModalComponent,
        { title: titulo, message: mensaje, tipo: tipo, parametros: menu });
    return modalRef.onResult();
  }


}
