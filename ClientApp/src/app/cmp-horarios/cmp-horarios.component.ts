import { Component, Input, OnInit } from '@angular/core';
import { horasdia } from '../clases/horasdia';
import { PeticionesService } from '../services/peticiones.service';
import { materia } from '../clases/materia';
import { ModalService } from '../modal/modal-service.service';

@Component({
  selector: 'app-cmp-horarios',
  templateUrl: './cmp-horarios.component.html',
  styleUrls: ['./cmp-horarios.component.css']
})
export class CmpHorariosComponent implements OnInit {

  horas: horasdia[] = new Array<horasdia>();
  horasmaterias: any[] = new Array<any>();
  materias: materia[] = new Array<materia>();
  @Input() idMateria = "";

  constructor(protected servicio: PeticionesService, protected modalService: ModalService) { }

  ngOnInit() {
    let rol = JSON.parse(localStorage.getItem("Rol"));
    this.servicio.loadGrilla('horasdia').subscribe(res =>{this.horas = res;});
  
     if(rol.nombrerol.toString()=="Docente"){
      this.servicio.loadGrilla('materia', ['iddocente', rol.id.toString()]).subscribe(materias =>{
        this.materias = materias;
        if (this.materias.length > 0){
          this.buscarHoras(this.materias, this.materias.length-1);
        }
    });
     }
     else if(rol.nombrerol.toString()=="Alumno"){
    this.servicio.loadGrilla('materia', ['idalumno', rol.id.toString()]).subscribe(materias =>{
      this.materias = materias;
      if (this.materias.length > 0){
        this.buscarHoras(this.materias, this.materias.length-1);
      }
  });
}
else if(rol.nombrerol.toString()=="Curriculum"){
  this.servicio.getById(this.idMateria,'materia').subscribe(materia =>{
    this.materias = new Array<materia>();
    this.materias.push(materia);
    if (this.materias.length > 0){
      this.buscarHoras(this.materias, this.materias.length-1);
    }
});
}
}

buscarHoras(materias, i: number) {
  this.servicio.loadGrilla('horasmateria',['idmateria', materias[i].id.toString()]).subscribe(r => {
      for (let res of r){this.horasmaterias.push(res);}

      if (i > 0) { this.buscarHoras(materias, i - 1); }
      else if(i==0) {
        for (let modulo of this.horasmaterias){
            let h = this.horas.find(hora => hora.id == modulo.idhoradia);
            let celda = document.getElementById('celda'+h.numorden.toString()+'-'+modulo.numsemana.toString());
            celda.style.backgroundColor = this.getColor(modulo.idmateria);
            let mat = this.materias.find(materia => materia.id == modulo.idmateria).nombre;
            const desc = document.createElement('div');
            const small = document.createElement('small');
            small.append(mat);//.substr(0,5)+'-'+mat.slice(-1));
            desc.append(small);
            desc.style.whiteSpace='nowrap';
            desc.style.overflow='hidden';
            desc.style.minWidth='60px'
            desc.style.maxWidth='80px'
            desc.id = 'child';
            celda.appendChild(desc);
        } 
      }
  });
}
 getColor(id){ 
      let color = "hsl(" + (360 * +this.idFlotante(id)).toString() + ',' +
               (25 + 70 * +this.idFlotante(id)).toString() + '%,' + 
               (45 + 10 * +this.idFlotante(id)).toString() + '%, 0.4)';
      return color;
  }

  idFlotante(num)  { 
    let largo = num.toString().length;
    let num_ceros = '10000000000000000000000000000000000'.substring(0,largo+1);
    let numero = num / (+num_ceros);
    return numero;  }
  
  calcularmodulo(hora){
    this.modalService.setCaseEstado('modulo');
    let modulo = +this.modalService.estados[0];
    let h : any = +hora.toString().substring(0,2);
    let m = +hora.toString().substring(3,5);
    h = h + ((m + modulo)/60);
    hora = ((m + modulo)%60).toString();
    if (hora.length==1){hora ='0'+hora;}
    return h.toString().split('.',2)[0]+':'+hora;
  }


}
