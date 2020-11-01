import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { antecedentetitulo } from '../clases/antecedentetitulo';
import { curriculum } from '../clases/curriculum';
import { domicilio } from '../clases/domicilio';
import { investigacion } from '../clases/investigacion';
import { localidad } from '../clases/localidad';
import { pais } from '../clases/pais';
import { provincia } from '../clases/provincia';
import { ModalService } from '../modal/modal-service.service';
import { AuthLoginService } from '../services/authlogin.service';
import { PeticionesService } from '../services/peticiones.service';

@Component({
  selector: 'app-frm-vercurriculum',
  templateUrl: './frm-vercurriculum.component.html',
  styleUrls: ['./frm-vercurriculum.component.css']
})
export class FrmVercurriculumComponent implements OnInit {
  curriculum: curriculum;
  generos: any;
  documentos: any;
  dom: string ="";
  loc:string ="";
  pro: string ="";
  pais:string ="";
  formaciones: any[]= new Array<any>();
  experiencias: any[]= new Array<any>();
  investigaciones: any[]= new Array<any>();

  constructor(private servicio :PeticionesService,private router:Router, private modalservicio: ModalService,private logservicio:AuthLoginService) {
     this.curriculum = servicio.selectedcurriculum;
     this.servicio.getById(this.curriculum.iddomicilio.toString(),'domicilio').subscribe((dom:domicilio)=>{
      this.dom = dom.direccion;
      this.servicio.getById(dom.idlocalidad.toString(),'localidad').subscribe((loc:localidad)=>{
        this.loc = loc.nombre+', cód. postal: '+loc.codpostal;
        this.servicio.getById(loc.idprovincia.toString(),'provincia').subscribe((pro:provincia)=>{
          this.pro = pro.nombre;
          this.servicio.getById(pro.idpais.toString(),'pais').subscribe((pa:pais)=>{
            this.pais=pa.nombre;
          });
        });
      });
     });
     this.servicio.loadGrilla('antecedentetitulo', ['idcurriculum', this.curriculum.id.toString()]).subscribe((antecedetes: antecedentetitulo[]) => {
      for (let ant of antecedetes) {
        if (ant.relaciondocencia == '-1') {
          this.formaciones.push({
            'id': ant.id, Establecimiento: ant.lugar, 'Fecha inicio': ant.fechainicio,
            'Fecha fin': ant.fechafin, 'Titulo': ant.titulo, tipo: ant.tipotitulo
          })
        }
        else {
          this.experiencias.push({
            'id': ant.id, Establecimiento: ant.lugar, 'Fecha inicio': ant.fechainicio,
            'Fecha fin': ant.fechafin, 'Cargo': ant.descripcion, 'Relación con docencia': ant.relaciondocencia
          });

        }
      }
      this.servicio.loadGrilla('investigacioninformacion', ['idcurriculum', this.curriculum.id.toString()]).subscribe((investigaciones: investigacion[]) => {
        for (let inv of investigaciones) {
          this.investigaciones.push({
            'id': inv.id, Descripcion: inv.descripcion, 'Fecha': inv.fecha,
            'Lugar': inv.lugar, 'tipo': inv.tipo
          });
        }

      });
    });
     this.modalservicio.setCaseEstado('sexo');
     this.generos=this.modalservicio.estados;

     this.modalservicio.setCaseEstado('tipoDoc');
     this.documentos=this.modalservicio.estados;



   }

  ngOnInit() {
  }

  edad(nac:Date):number{
     const hoy: Date = new Date();
     const nacimiento:Date = new Date(nac); 
     const diferencia = Math.abs(hoy.getTime() - nacimiento.getTime());
    return Math.floor(diferencia/(1000*3600*24)/365);


  }
  genero(id){
    return this.generos[id];
  }
  tipodedoc(id){
    return this.documentos[id];
  }
  volver(){
    this.logservicio.componenteGuard = "frm-ordenmerito";
    this.router.navigate(['frm-ordenmerito']);   
  }
}
