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
import { investigacion } from '../clases/investigacion';
import { curriculum } from '../clases/curriculum';
import { domicilio } from '../clases/domicilio';
import { createAotUrlResolver } from '@angular/compiler';
import { datoadjunto } from '../clases/datoadjunto';

@Component({
  selector: 'app-frm-curriculum',
  templateUrl: './frm-curriculum.component.html',
  styleUrls: ['./frm-curriculum.component.css']
})
export class FrmCurriculumComponent implements OnInit {
  indice=1;

  formCurriculum: FormGroup = this.formbuilder.group({
    id: 0,
    nombre: '',
    apellido: '',
    fechanac: '',
    sexo: '',
    numerodoc: '',
    telefono: '',
    telefonodos: '',
    correo: '',
    observaciones: '',
    tipodoc: '',
    iddomicilio: 0,
    idusuario: 0,

  });
  tiposDoc: any = new Array<any>();
  sexos: any = new Array<any>();
  paises: pais[] = new Array<pais>();
  provincias: provincia[] = new Array<provincia>();
  localidades: localidad[] = new Array<localidad>();
  formaciones: any[] = new Array<antecedentetitulo>();
  experiencias: any[] = new Array<antecedentetitulo>();
  investigaciones: any[] = new Array<investigacion>();
  adjuntos: datoadjunto[] = new Array<datoadjunto>();
  domicilioaux: domicilio;
  idpais: number = 0;



  constructor(public servicio: PeticionesService, private formbuilder: FormBuilder, private modalService: ModalService) {
    
  }
  
  teclaenter(key) {
    if (key.keyCode === 13) {
      //console.log(key);
    }
  }
  cargaInicial() {
    this.servicio.loadGrilla('localidad').subscribe(l => {
      this.localidades = l;
      this.servicio.loadGrilla('provincia').subscribe(p => {
        this.provincias = p;
        this.servicio.loadGrilla('pais').subscribe(pa => {
          this.paises = pa;
          //console.log('carga inicial finalizada***')
          let idpro = this.localidades.find(loc => loc.id ==  this.domicilioaux.idlocalidad ).idprovincia;
          this.idpais = this.provincias.find(pro => pro.id == idpro ).idpais;
          //document.getElementById('pais')['value'] = idpais;
          document.getElementById('provincia')['value'] = idpro;
          document.getElementById('domicilio')['value'] = this.domicilioaux.direccion;
         document.getElementById('localidad')['value'] = this.domicilioaux.idlocalidad;
        })
      })
    });
  }

  ngAfterContentInit(){
   

  }
  ngOnInit() {
    this.servicio.loadGrilla('pais')
    .subscribe
    (resultado => { this.paises = resultado; });
  this.servicio.loadGrilla('provincia')
    .subscribe(resultado => { this.provincias = resultado; });
  this.servicio.loadGrilla('localidad')
    .subscribe(resultado => { this.localidades = resultado; });

  this.servicio.loadGrilla('curriculum', ['idusuario']).subscribe(curr => {
    //utiliza el json de parametro para obtener los tipos de documento
    this.modalService.setCaseEstado('tipoDoc');
    this.tiposDoc = this.modalService.estados;

    this.modalService.setCaseEstado('sexo');
    this.sexos = this.modalService.estados;

    if (curr.length == 0) {

      this.cargarPaises();
    }
    else {


      this.formCurriculum = this.formbuilder.group({
        id: curr[0].id,
        nombre: curr[0].nombre,
        apellido: curr[0].apellido,
        fechanac: curr[0].fechanac.substring(0,10),
        sexo: curr[0].sexo,
        numerodoc: curr[0].numerodoc,
        telefono: curr[0].telefono,
        telefonodos: curr[0].telefonodos,
        correo: curr[0].correo,
        observaciones: curr[0].observaciones,
        tipodoc: curr[0].tipodoc,
        iddomicilio: curr[0].iddomicilio,
        idusuario: curr[0].idusuario,


      });
      this.servicio.loadGrilla('antecedentetitulo', ['idcurriculum', curr[0].id.toString()]).subscribe((antecedetes: antecedentetitulo[]) => {
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
        this.servicio.loadGrilla('investigacioninformacion', ['idcurriculum', curr[0].id.toString()]).subscribe((investigaciones: investigacion[]) => {
          for (let inv of investigaciones) {
            this.investigaciones.push({
              'id': inv.id, Descripcion: inv.descripcion, 'Fecha': inv.fecha,
              'Lugar': inv.lugar, 'tipo': inv.tipo
            });
            
          }
          this.servicio.loadGrilla('datoadjunto',['idcurriculum', curr[0].id.toString()]).subscribe(list =>{
            this.adjuntos = list;
          });

        });
      });


    }
    this.servicio.getById(curr[0].iddomicilio, 'domicilio').subscribe((result: domicilio) => {
      this.domicilioaux= result;
      

      this.cargaInicial();

    });
  }
  );

  }
  cargarPaises() {
    this.servicio.loadGrilla('pais')
      .subscribe
      (resultado => { this.paises = resultado; this.onChangePais(); });
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
    if (id == '0') {
      document.getElementById('inputlocalidad')['disabled'] = false;
    }
    else { document.getElementById('inputlocalidad')['disabled'] = true; }
  }

  borrar(Titulo, tipo) {
    this.abrirModal('Confirmar','¿Desea eliminar el registro?',1,null).subscribe(r=>{
    if (tipo == 1) {
      let ind = this.formaciones.findIndex(val => val.Titulo == Titulo);
      this.formaciones.splice(ind, 1);
    }
    if (tipo == 2) {
      let ind = this.experiencias.findIndex(val => val.Cargo == Titulo);
      this.experiencias.splice(ind, 1);
    }
    if (tipo == 3) {
      let ind = this.investigaciones.findIndex(val => val.Descripcion == Titulo);
      this.investigaciones.splice(ind, 1);
    }
  });
  }

  nuevo(tipo, titulo=null, cargo=null, establecimiento=null, descripcion=null) {
    // 1-nueva formacion
    // 2-editar formacion
    // 3-nueva experiencia
    // 4-editar experiencia
    // 5-nueva investgacion/publicacion
    // 6-editar investgacion/publicacion

    if (tipo == 1) {
      this.modalService.setCaseEstado('formacion');
      this.abrirModal("Nueva formación", "", 3,
        {
          id: '0', Establecimiento: '', 'Fecha inicio': new Date(),
          'Fecha fin': new Date(), 'Titulo': '', tipo: ''
        })
        .subscribe(result => { this.formaciones.push(result) })
    }
    if (tipo == 2) {
      this.modalService.setCaseEstado('formacion');
      let formacion = this.formaciones.find(form => form.Titulo == titulo && form.Establecimiento == establecimiento);
      let fechf =  (formacion['Fecha fin']).substring(0,10);
      let fechain =  (formacion['Fecha inicio']).substring(0,10);
      this.abrirModal("Editar formación", "", 3,
        {
          'id': formacion.id, Establecimiento: formacion.Establecimiento, 'Fecha inicio': fechain,
          'Fecha fin': fechf, 'Titulo': formacion.Titulo, tipo: formacion.tipo
        })
        .subscribe(result => {
          let ind = this.formaciones.findIndex(n => n == formacion);
          this.formaciones.splice(ind,1,result);
            })
    }
    if (tipo == 3) {
      //this.modalService.setCaseEstado('formacion');
      this.abrirModal("Nueva experiencia laboral", "", 3,
        {
          id: '0', Establecimiento: '', 'Fecha inicio': new Date(),
          'Fecha fin': new Date(), 'Cargo': '', 'Relación con docencia': ''
        })
        .subscribe(result => { this.experiencias.push(result) })
    }
    if (tipo == 4) {
      //this.modalService.setCaseEstado('formacion');
      let experiencia = this.experiencias.find(exp => exp.Cargo == cargo && exp.Establecimiento == establecimiento);
      let fechaf =  (experiencia['Fecha fin']).substring(0,10);
      let fechai =  (experiencia['Fecha inicio']).substring(0,10);
      this.abrirModal("Editar experiencia laboral", "", 3,
        {
          'id': experiencia.id, Establecimiento: experiencia.Establecimiento, 'Fecha inicio': new Date(fechai),
          'Fecha fin': new Date(fechaf), 'Cargo': experiencia.Cargo, 'Relación con docencia': experiencia['Relación con docencia']
        })
        .subscribe(result => {
          let ind = this.experiencias.findIndex(n => n == experiencia);
          this.experiencias.splice(ind,1,result);
         })
    }
    if (tipo == 5) {
      this.modalService.setCaseEstado('investigacion');
      this.abrirModal("Nueva investigación/publicación", "", 3,
        {
          id: '0', Descripcion: '', 'Fecha': new Date(),
          'Lugar': '', 'tipo': ''
        })
        .subscribe(result => { this.investigaciones.push(result) })
    }
    if (tipo == 6) {
      this.modalService.setCaseEstado('investigacion');
      let investigacion = this.investigaciones.find(inv => inv.Descripcion == descripcion);
      let fecha =  (investigacion.Fecha).substring(0,10);
      this.abrirModal("Editar investigación/publicación", "", 3,
        {
          'id': investigacion.id, Descripcion: investigacion.Descripcion, 'Fecha': fecha,
          'Lugar': investigacion.Lugar, 'tipo': investigacion['tipo']
        })
        .subscribe(result => {
          let ind = this.investigaciones.findIndex(n => n == investigacion);
          this.investigaciones.splice(ind,1,result); })
    }

  }

  btnguardar() {
    //validar la localidad ingresada en caso de ser cero
    let locali = document.getElementById('localidad')['value'];
    if (locali == '0') {
      let ban = false;
      let nombre: string = document.getElementById('inputlocalidad')['value'];
      for (let dato of this.localidades) {
        if (dato.nombre.toUpperCase() == nombre.toUpperCase()) {
          locali = dato.id;
          ban = true;
          break;
         }
      }
      //se envía la nueva localidad al servidor
      if (!ban) {
        let loc = new localidad({ 'idprovincia': document.getElementById('provincia')['value'], 'nombre': document.getElementById('inputlocalidad')['value'], 'id': '0','codpostal':'0' });
        this.servicio.addSingleAbm(loc, 'localidad').subscribe(id => {
          this.guardarcv(id);
        });
      }
      else {
        this.guardarcv(locali);
      }
    }
    else {
      this.guardarcv(locali);
    }
  }

  guardarcv(idlocalidad) {
    let cv = Object.assign({}, this.formCurriculum.value);
    let domi: domicilio = new domicilio({ 'direccion': document.getElementById('domicilio')['value'], 'idlocalidad': idlocalidad, 'id': cv.iddomicilio });
    this.servicio.addSingleAbm(domi, 'domicilio').subscribe(iddomicilio => {
      if(!Number.isInteger(iddomicilio)){
        iddomicilio = cv.iddomicilio;
      }
      let curr = new curriculum({
        'id': cv.id, 'nombre': cv.nombre, 'apellido': cv.apellido,
        'fechanac': cv.fechanac, 'sexo': +cv.sexo, 'numerodoc': cv.numerodoc, 'telefono': cv.telefono, 'telefonodos': cv.telefonodos,
        'correo': cv.correo, 'observaciones': cv.observaciones, 'tipodoc': cv.tipodoc, 'iddomicilio': iddomicilio, 'idusuario': cv.idusuario
      })


      this.servicio.addSingleAbm(curr, 'curriculum').subscribe(idcurriculum => {
        if(!Number.isInteger(idcurriculum)){
          idcurriculum = cv.id;
        }
        let antecedentes = new Array<antecedentetitulo>();
        for (let f of this.formaciones) {
          let auxant = new antecedentetitulo(f.id, '-1', f.Establecimiento, f['Fecha inicio'], f['Fecha fin'], 0, '', f.Titulo, f.tipo, idcurriculum);
          antecedentes.push(auxant);
        }
        for (let e of this.experiencias) {
          let auxant = new antecedentetitulo(e.id, e['Relación con docencia'], e.Establecimiento, e['Fecha inicio'], e['Fecha fin'], 0, e.Cargo, '', 'exp.laboral', idcurriculum);
          antecedentes.push(auxant);
        }
        let invpub: investigacion[] = new Array<investigacion>();
        for (let i of this.investigaciones) {
          let auxinv = new investigacion({ 'id': i.id, 'descripcion': i.Descripcion, 'lugar': i.Lugar, 'tipo': i['tipo'], 'idcurriculum': idcurriculum ,'fecha':i.Fecha });
          invpub.push(auxinv);
        }
         
        for (let i = 0;i<this.adjuntos.length;i++) {
          this.adjuntos[i].idcurriculum = idcurriculum; //utilizo esa columnna para el id de cv
        }

        this.servicio.addSingleAbm(antecedentes, 'antecedentetitulo').subscribe(n => {
          this.servicio.addSingleAbm(invpub, 'investigacioninformacion').subscribe(n => {
            this.servicio.addSingleAbm(this.adjuntos, 'datoadjunto').subscribe(n => {
            this.abrirModal('ISAUI- curriculums', 'Las modificaciones se almacenaron exitosamente', 2, null);
            });
          });

        });
      });

    });
  }


  abrirModal(titulo: string, mensaje: string, tipo: number, menu: any): Observable<any> {
    const modalRef =
      this.modalService.open(MyModalComponent,
        { title: titulo, message: mensaje, tipo: tipo, parametros: menu });
    return modalRef.onResult();
  }

  anterior(){
    if(this.indice >1){this.indice--;}
    else{}
    document.getElementById('paso1').classList.remove('active');
    document.getElementById('paso2').classList.remove('active');
    document.getElementById('paso3').classList.remove('active');
    document.getElementById('paso'+this.indice.toString()).className = 'active';
  }
  siguiente(){
    if(this.indice < 3){this.indice++;}
    else{}
    document.getElementById('paso1').classList.remove('active');
    document.getElementById('paso2').classList.remove('active');
    document.getElementById('paso3').classList.remove('active');
    document.getElementById('paso'+this.indice.toString()).className = 'active';
  }
  paso(num){
    this.indice = num;
    document.getElementById('paso1').classList.remove('active');
    document.getElementById('paso2').classList.remove('active');
    document.getElementById('paso3').classList.remove('active');
    document.getElementById('paso'+this.indice.toString()).className = 'active';

  }

  upload(files:File[]) {
    
    if (files.length === 0 )
      return;
    
    const formData = new FormData();
    
    if ( files[0].size<(2048*1024)) {
   
          formData.append('P_'+files[0].name, files[0]);
  
        }
    

      this.servicio.subirArchivo(formData).subscribe(event => {
        if(event.status == 200 
          && event.statusText=="OK" 
          && event.body != undefined){
            let archivo : datoadjunto = new datoadjunto({'direccion':JSON.parse(event.body).path,'id':'0','idcurriculum':'0'});
            this.adjuntos.push(archivo);
        } 
      });
  }
  borrarFile(p){
    this.abrirModal('Confirmar','¿Desea eliminar el archivo?',1,null).subscribe(r=>{
      let ind = this.adjuntos.findIndex(n => n.direccion == p);
    this.adjuntos.splice(ind,1);
    });
    
  }
  verPdf(path){
    this.servicio.obtenerArchivo(path)
      .subscribe(data => {
        const byteArray = new Uint8Array(atob(data).split('').map(char => char.charCodeAt(0)));
        const file = new Blob([byteArray], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);

      });
  }

}
