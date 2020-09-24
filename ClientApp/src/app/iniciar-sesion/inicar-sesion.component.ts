import { Component, OnInit } from '@angular/core';
import { AuthLoginService } from '../services/authlogin.service';
import { usuario } from '../clases/usuario'; 
import { abm } from '../clases/abm';
import { PeticionesService } from '../services/peticiones.service';// sacar 
import {Router} from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {
nCuenta: string;
nClave: string;
  constructor(private autS: AuthLoginService, private router: Router) { }
  
  onLogin(){
    const user= {nombre: this.nCuenta, codigo: this.nClave};
    this.autS.login(user).subscribe(res =>{
      console.log(res)
      this.router.navigate(['/autogestion']);
    },
    er=>console.log(er)
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
  
  ngOnInit() {
  }


}
