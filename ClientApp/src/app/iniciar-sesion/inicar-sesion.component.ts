import { Component, OnInit } from '@angular/core';
import { AuthLoginService } from '../services/authlogin.service';
import { usuario } from '../clases/usuario';
import { abm } from '../clases/abm';
import { PeticionesService } from '../services/peticiones.service';// sacar
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { MyModalComponent } from '../modal/MyModalComponent';
import { ModalService } from '../modal/modal-service.service';
import { HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {
  nCuenta: string;
  nClave: string;
  loading = false;
  version = 'ver. 1.1'

  formUsuario: FormGroup = this.formbuilder.group({
    usuario: '',
    contra: '',
    contra2: '',
  });

  constructor(public servicio: PeticionesService, private formbuilder: FormBuilder, private autS: AuthLoginService, protected modalService: ModalService, private router: Router) {

  }

  onLogin() {
    const user = { nombre: this.nCuenta, codigo: this.nClave };
    this.autS.login(user).subscribe(res => {
      //console.log(res);
      if (res != "404") {
        let json = JSON.parse(res.toString());
        if (Array.isArray(json.rol.nombrerol)) {
          this.abrirModal("Seleccione un Rol para ingresar", json.rol.nombrerol, 4, null).subscribe(obj => {
            let Headers: HttpHeaders = new HttpHeaders({ 'usuario': user.nombre, 'pass': user.codigo, 'token': json.accessToken, 'rol': obj });
            this.servicio.logueosegundo(Headers).subscribe(res => {
              let json = JSON.parse(res.toString());
              this.autS.saveToken(json.accessToken, json.expiresIn, JSON.stringify(json.componentes), JSON.stringify(json.rol));
              this.autS.componenteGuard = "autogestion"; this.loading = false; this.router.navigate(['autogestion']);

            });
          });
        }
        else { this.autS.componenteGuard = "autogestion"; this.loading = false; this.router.navigate(['autogestion']); }
      }
      else {
        this.loading = false;
        this.abrirModal("Inicio de sesión", "El usuario y contraseña ingresados no son válidos", 2, null).subscribe(n => { localStorage.setItem("InicioSesion", "false"); });
      }
    },
      er => {
        //console.log(er);
        this.loading = false;
        this.abrirModal("Inicio de sesión", "El usuario y contraseña ingresados no son válidos", 2, null).subscribe(n => { console.log(n); });
      }
    );

    this.LimpiarCampos();
  }

  onSignup(){
    //control de valores de input
    this.loading = true;
    let usu = new usuario({'id':'0',
    'nombre':this.formUsuario.get('usuario').value,
    'codigo':this.formUsuario.get('contra').value,
    'codigoayuda':'',
    'correo': document.getElementById("correo")['value'],
    'estado':'0'});
    this.servicio.addSingleAbm(usu,'usuario').subscribe(res=>{
      if(res == "UsuarioExistente"){
        this.abrirModal("Usuario no válido","Ingrese un nombre de usuario alternativo",2,null)
        .subscribe(ed=>{this.loading = false;});
      }
      else if (res == "UsuarioCv"){
      this.nCuenta = this.formUsuario.get('usuario').value;
      this.nClave = this.formUsuario.get('contra').value;
      this.onLogin();
    }
    })

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

  LimpiarCampos()
  {
    this.nClave='';
    this.nCuenta='';
  }
  signupcv(){
    // this.router.navigate(['sign-up-cv'])
    let div = document.getElementById("formjs");
    div.style.display = 'none';
  let divs = document.getElementById("formjs2");
    divs.style.display = 'block';
  }
  volver(){
    // this.router.navigate(['sign-up-cv'])
    let div = document.getElementById("formjs");
    div.style.display = 'block';
    let divs = document.getElementById("formjs2");
    divs.style.display = 'none';
  }

  validar(){
    if(this.formUsuario.get('usuario').value.length >= 8
    && this.formUsuario.get('contra').value.length >= 8
    && this.formUsuario.get('contra').value == this.formUsuario.get('contra2').value
    && this.formUsuario.valid )
    {return false;}
    return true;
  }
}
