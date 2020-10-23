import { Component, OnInit } from '@angular/core';
import { PeticionesService } from '../services/peticiones.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalService } from '../modal/modal-service.service';
import { pais } from '../clases/pais';
import { provincia } from '../clases/provincia';
import { localidad } from '../clases/localidad';
import { antecedentetitulo } from '../clases/antecedentetitulo';
import { MyModalComponent } from '../modal/MyModalComponent';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-frm-curriculum',
  templateUrl: './frm-curriculum.component.html',
  styleUrls: ['./frm-curriculum.component.css']
})
export class FrmCurriculumComponent implements OnInit {

  formCurriculum: FormGroup;
  tiposDoc: any;
  sexos: any; 
  paises: pais[];
  provincias: provincia[];
  localidades: localidad[];
  formaciones: any[] = new Array<antecedentetitulo>();
  experiencias: any[] = new Array<antecedentetitulo>();


  constructor(private servicio: PeticionesService, private formbuilder: FormBuilder, private modalService: ModalService) {

  }

  ngOnInit() {
    //utiliza el json de parametro para obtener los tipos de documento
    this.modalService.setCaseEstado('tipoDoc');
    this.tiposDoc = this.modalService.estados;

    this.modalService.setCaseEstado('sexo');
    this.sexos = this.modalService.estados;

    this.formCurriculum = this.formbuilder.group({
      idCurriculum: 1,
      nombre: '',
      apellido: '',
      fechanac:  '',
      sexo: 1,
      numerodoc: '',
      telefono: '',
      correo: '',
      telefonodos: '',
      tipodoc: '',
      pais: '',
      provincia: '',
      localidad: '',
      domicilio: '',

    });
    this.servicio.loadGrilla('pais')
      .subscribe
      (resultado => 
        { this.paises = resultado; this.onChangePais(); });

  }

  onChangePais() {
    let id = document.getElementById('pais')['value'];
    this.servicio.loadGrilla('provincia', ['idpais', id.toString()])
      .subscribe(resultado => { this.provincias = resultado; this.onChangeProvincia(); });
  }

  onChangeProvincia() {
    let id = document.getElementById('provincia')['value'];
    this.servicio.loadGrilla('localidad', ['idprovincia', id.toString()])
      .subscribe(resultado => { this.localidades = resultado; });
  }
  onChangeLocalidad() {
    let id = document.getElementById('localidad')['value'];
     if(id=='0'){
      document.getElementById('inputlocalidad')['disabled']=false;
     }
     else{ document.getElementById('inputlocalidad')['disabled']=true;}
  }

  borrar(Titulo,tipo){
    if(tipo ==1){
    let ind = this.formaciones.findIndex(val => val.Titulo == Titulo);
    this.formaciones.splice(ind, 1);}
    if(tipo ==2){
      let ind = this.experiencias.findIndex(val => val.Titulo == Titulo);
      this.experiencias.splice(ind, 1);}
  }

  nuevo(tipo, titulo,cargo,establecimiento){
    // 1-nueva formacion
    // 2-editar formacion
    // 3-nueva experiencia
    // 4-editar experiencia

    if (tipo==1){
      this.modalService.setCaseEstado('formacion');
      this.abrirModal("Nueva formación","",3,
      { Establecimiento: '','Fecha inicio':new Date(),
       'Fecha fin': new Date(), 'Titulo': '', tipo:''})
       .subscribe(result=>{this.formaciones.push(result)})
    }
    if (tipo==2){
      this.modalService.setCaseEstado('formacion');
      let formacion = this.formaciones.find(form => form.Titulo ==titulo && form.Establecimiento == establecimiento);
      this.abrirModal("Editar formación","",3,
      { Establecimiento: formacion.Establecimiento ,'Fecha inicio':formacion['Fecha inicio'],
       'Fecha fin': formacion['Fecha fin'], 'Titulo': formacion.Titulo, tipo: formacion.tipo})
       .subscribe(result=>{this.formaciones.push(result)})
    }
    if (tipo==3){
      //this.modalService.setCaseEstado('formacion');
      this.abrirModal("Nueva experiencia laboral","",3,
      { Establecimiento: '','Fecha inicio':new Date(),
       'Fecha fin': new Date(), 'Cargo': '', 'Relación con docencia':''})
       .subscribe(result=>{this.experiencias.push(result)})
    }
    if (tipo==4){
      //this.modalService.setCaseEstado('formacion');
      let experiencia = this.experiencias.find(exp => exp.Cargo == cargo && exp.Establecimiento == establecimiento);
      this.abrirModal("Editar experiencia laboral","",3,
      { Establecimiento: experiencia.Establecimiento ,'Fecha inicio':experiencia['Fecha inicio'],
       'Fecha fin': experiencia['Fecha fin'], 'Cargo': experiencia.Cargo, 'Relación con docencia': experiencia['Relación con docencia']})
       .subscribe(result=>{this.experiencias.push(result)})
    }
    
  }
  // this.id = +id;
  // this.relaciondocente =+relaciondocente;
  // this.idlugar =  +idlugar;
  // this.fechainicio = new Date (fechainicio);
  // this.fechafin = new Date(fechafin);
  // this.puntajedocente= +puntajedocente;
  // this.descripcion =  descripcion;
  // this.titulo =  titulo; 
  // this.tipotitulo= +tipotitulo;
  // this.idcurriculum= +idcurriculum;

  abrirModal(titulo: string, mensaje: string, tipo: number, menu: any): Observable<any> {
    const modalRef = 
    this.modalService.open(MyModalComponent, 
      { title: titulo, message: mensaje, tipo: tipo, parametros: menu });
    return modalRef.onResult();
  }

}
