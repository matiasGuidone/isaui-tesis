import { Component, OnInit } from '@angular/core';
import {convocatoria} from '../clases/convocatoria';
import {curriculum} from '../clases/curriculum';
import { curriculumconvocatoria } from '../clases/curriculumconvocatoria';
import { PeticionesService } from '../services/peticiones.service';
import { AuthLoginService } from '../services/authlogin.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-rel-curriculumconvocatoria',
  templateUrl: './rel-curriculumconvocatoria.component.html',
  //styleUrls: ['./rel-curriculumconvocatoria.component.css']
})
export class RelCurriculumconvocatoriaComponent {
  
  convocatoriaselecionada="No hay convocatoria seleccionado";
  listaCV: curriculum[]= new Array<curriculum>();

  constructor(private router: Router, private servicio: PeticionesService, protected logservicio: AuthLoginService ) { 
    if (this.servicio.idsSeleccionados != null && this.servicio.idsSeleccionados.length > 0 && this.servicio.idSeleccionado != null) 
    {
      this.servicio.idSeleccionado.toString();
      let i = this.servicio.idsSeleccionados.length;
      this.guardarRecursivo(this.servicio.idsSeleccionados, i - 1);

    }
  }     

  guardarRecursivo(res, i: number) {
    let dat = new curriculumconvocatoria({"id":"0", 'idcurriculum' :this.servicio.idSeleccionado.toString(),'idconvocatoria': this.servicio.idsSeleccionados[i].toString(), 'puntaje':"", 'prioridad':""});
    this.servicio.addSingleAbm(dat, "curriculimconvocatoria").subscribe(r => {
        if (i > 0) { this.guardarRecursivo(this.servicio.idsSeleccionados, i - 1); }
        else if(i==0){ this.servicio.idSeleccionado = null; this.servicio.idsSeleccionados = null; }

    });
}
  

  ngOnInit() {}

  searchCurriculum(convocatoria)
  {
    if(convocatoria !=null)
    {
      this.servicio.idSeleccionado=+convocatoria[0];
      this.convocatoriaselecionada= convocatoria[1];
      let fil = new Array<string>();
      this.listaCV= new Array<curriculum>();
      fil.push("idconvocatoria");
      fil.push(convocatoria[0]);
      this.servicio.loadGrilla("curriculumconvocatoria", fil).subscribe(res=> 
        {if (res !=null && res.length>0)
          {
            let i= res.length;
            this.getConvocatoriaById(res, i -1);
          }
        })
    }
  }

  getConvocatoriaById(res, i:number)
  {
    this.servicio.getById(res[i].idcurriculum, "curriculum").subscribe(r=>{
      this.listaCV.push(r);
      if(i>0){this.getConvocatoriaById(res, i-1);}
    });
  }

  modificar()
  {
    this.servicio.idsSeleccionados = new Array<number>();
    for(let i=0;i< this.listaCV.length;i++)
    {
      this.servicio.idsSeleccionados.push(this.listaCV[i].id);
    }
    this.servicio.eliminarConFiltro
    ("idconvocatoria", this.servicio.idSeleccionado.toString(),"curriculumconvocatoria")
    .subscribe(res=>{this.logservicio.componenteGuard="abm-curriculum"; this.router.navigate(["abm-curriculum"]);})
  }

}
