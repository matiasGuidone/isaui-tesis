import { Component, OnInit } from '@angular/core';
import { AuthLoginService } from '../services/authlogin.service';
import { PeticionesService } from '../services/peticiones.service';

@Component({
  selector: 'app-configuracion-usuario',
  templateUrl: './configuracion-usuario.component.html',
  styleUrls: ['./configuracion-usuario.component.css']
})
export class ConfiguracionUsuarioComponent implements OnInit {

  foto: string;
  usuario: any;
  num: any;
  archivoimg: any;
  imgseleccionada: any;
  estilonotif = "alert alert-success alert-dismissible fade show";

  constructor(public servicio: PeticionesService,  private logservicio: AuthLoginService) {
    this.foto = logservicio.getFoto();
    this.num = logservicio.getEstilo();
    
    this.usuario = logservicio.getNombreUsuario();
    if (this.foto == "" || this.foto == "System.Byte[]"){
      this.foto = "/assets/user.png"
    }
   }
  temaestablecido = 'Blanco';
  ngOnInit() {
    this.cambiarEstilo(this.num)
  }
  cambiarEstilo(num = null) {
    if (num == null || num == ""){
       num = document.getElementById("tema")['value'];
    } 
    this.num = num;
    switch (+num) {
      case 1://estilo negro
        this.servicio.classtable2 = "table table-dark table-hover";
        this.servicio.classtable = "table table-striped table-dark table-responsive";
        this.servicio.classimg = "img-logo";
        this.servicio.classbody = "bodyclass";
        this.servicio.classnav = "navbar navbar-expand-sm navbar-toggleable-sm navbar-dark bg-dark border-bottom box-shadow mb-3";
        this.temaestablecido = 'Negro';
        break;
      case 2://estilo blanco
        this.servicio.classtable2 = "table table-hover";
        this.servicio.classtable = "table-responsive";
        this.servicio.classimg = "custom-logo-link";
        this.servicio.classnav = "navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3";
        this.servicio.classbody = "bodyclasswh";
        this.temaestablecido = 'Blanco';
        break;
      case 3: //estilo gey
        this.servicio.classtable2 = "table table-hover bg-secondary ";
        this.servicio.classtable = "table-responsive bg-secondary ";
        this.servicio.classimg = "custom-logo-link";
        this.servicio.classnav = "navbar navbar-expand-sm navbar-toggleable-sm navbar-dark bg-secondary border-bottom box-shadow mb-3";
        this.servicio.classbody = "bodyclass bg-secondary";
        this.temaestablecido = 'Gris';
        break;
      default:
        break;

    }
  }
  // aplicafoto(){

  // }
  aplicafoto(event: any) {
    this.archivoimg = event.target.files[0];
    this.imgseleccionada = this.archivoimg.name;
    if (event.target.files && event.target.files[0] && event.target.files[0].size < (512 * 1024)) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.foto = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    else{
      let not = document.getElementById("notificacion");
      let tnot = document.getElementById("textnotificacion");
      not.style.display="block";
      tnot.innerHTML = "El tamaño del archivo seleccionado excede el límite de memoria";
      this.estilonotif = "alert alert-danger alert-dismissible fade show";

    }
  }

    almacenarcambios(){
      const formData = new FormData();
      if (this.archivoimg != undefined){ formData.append(this.archivoimg.name, this.archivoimg);}
      this.servicio.setstilo(this.num).subscribe(d =>{
        let not = document.getElementById("notificacion");
          let tnot = document.getElementById("textnotificacion");
          not.style.display="block";
          tnot.innerHTML = "Estilo de interfaz modificado";
          this.estilonotif = "alert alert-success alert-dismissible fade show";
        if (this.archivoimg != undefined){ 
        this.servicio.upFoto(formData).subscribe(f=>{
          console.log(f);
          let s = JSON.parse(localStorage.getItem("Rol"));
          s.foto = this.foto;
          s.estilo = this.num;
          localStorage.setItem("Rol",JSON.stringify(s));
          this.logservicio.foto = this.foto;
          let not = document.getElementById("notificacion");
          let tnot = document.getElementById("textnotificacion");
          not.style.display="block";
          tnot.innerHTML = "Foto de perfil modificada";
          this.estilonotif = "alert alert-success alert-dismissible fade show";
        });
      }
      else{
        let s = JSON.parse(localStorage.getItem("Rol")); 
          s.estilo = this.num;
          localStorage.setItem("Rol",JSON.stringify(s));
      }
      })
    }
    closealert(){
      let notificacion = document.getElementById("notificacion");
      notificacion.style.display = "none";
    }


}
