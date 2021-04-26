import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';

//ventanas modales
import { ModalService } from '../modal/modal-service.service';
import { domicilio } from '../clases/domicilio';
import { abm } from '../clases/abm';
import { PeticionesService } from '../services/peticiones.service';
import { pais } from '../clases/pais';
import { provincia } from '../clases/provincia';
import { localidad } from '../clases/localidad';
import { AuthLoginService } from '../services/authlogin.service';

//ventanas modales

@Component({
  selector: 'app-abm-domicilio',
  templateUrl: './abm-domicilio.component.html',
  styleUrls: ['./abm-domicilio.component.css']
})
export class AbmDomicilioComponent extends abm<any> implements OnInit {

  listaPais: pais[];
  listaprovincia: provincia[];
  listalocalidad: localidad[];
  @Input() id: number = 0;
  @Output() emisorId = new EventEmitter<number>();

  constructor(protected location: Location,
    protected modalService: ModalService,
    public servicio: PeticionesService,
    protected logservicio: AuthLoginService) {
    super(location, modalService, servicio, logservicio);
    this.nombre = 'domicilio';
    this.objetoBlanco = new domicilio({'id':'0','direccion':'','idlocalidad':''});
    this.modalService.setFiltro(this.objetoBlanco);
    if (this.modalService.listAbm != null && this.modalService.listAbm != undefined) {
      if (this.modalService.listAbm.getData().name == this.nombre) {
        this.editar(this.modalService.listAbm.getData().id, 
        this.modalService.listAbm.getData());
      }
    }
    
  }
  cargarDomicilio(iddomicilio: any) {
    this.servicio.getById(iddomicilio, 'domicilio')
      .subscribe(domic => {
        document.getElementById('direccion')['value'] = domic.direccion;
        document.getElementById('localidad')['value'] = domic.idlocalidad;
        // this.id = domic.id
        let idprov =  this.listalocalidad.find(l => l.id == domic.idlocalidad).idprovincia;
        document.getElementById('provincia')['value'] = idprov;
        document.getElementById('pais')['value'] = this.listaprovincia.find(l => l.id == idprov).idpais;
      //   this.servicio.getById(domic.idlocalidad.toString(), 'localidad')
      //     .subscribe(local => {
      //       document.getElementById('provincia')['value'] = local.idprovincia;
      //       this.servicio.getById(local.idprovincia.toString(), 'provincia')
      //         .subscribe(provin => {
      //           document.getElementById('pais')['value'] = provin.idpais;
      //         });
      //     });
       });
  }
  //carga dinámica de listas
  ngOnInit() {
    this.servicio.loadGrilla('pais')
      .subscribe(resultado => { this.listaPais = resultado; 
      this.servicio.loadGrilla('provincia').subscribe(listp => {
        this.listaprovincia = listp;
        this.servicio.loadGrilla('localidad').subscribe(listl => {
          this.listalocalidad = listl;
          this.cargarDomicilio(this.id);
        })
      });
      })
    // });

      // if (this.modalService.listAbm != null && this.modalService.listAbm != undefined) {
      //   if (this.modalService.listAbm.getData().iddomicilio != 0 && this.modalService.listAbm.getData().iddomicilio != null) {
          //this.cargarDomicilio(this.id);
      //   }
  
      // }
  }
  onChangePais() {
    let id = document.getElementById('pais')['value'];
    this.servicio.loadGrilla('provincia', ['idpais', id.toString()])
      .subscribe(resultado => { this.listaprovincia = resultado;
                                this.onChangeProvincia(); });
  }
  onChangeProvincia() {
    let id = document.getElementById('provincia')['value'];
    this.servicio.loadGrilla('localidad', ['idprovincia', id.toString()])
      .subscribe(resultado => { this.listalocalidad = resultado; });
  }

  guardarDomicilio() {
    
    let domi = new domicilio({ 'id': this.id.toString(), 'direccion': document.getElementById('direccion')['value'], 'idlocalidad': document.getElementById('localidad')['value'] });
    this.servicio.addSingleAbm(domi, 'domicilio').subscribe(id => {
      
        if (this.id == 0) {
          this.id = +id;
          this.emisorId.emit(this.id);
        }
         else { 
          this.emisorId.emit(this.id); }
      
    })

  }

  addPais() {
    this.nombre = 'pais';
    this.objetoBlanco = new pais({ 'id': '0', 'nombre': '' });
    this.abrirModal('Nuevo pais ', 'pais', 3, new pais({ 'id': '0', 'nombre': '' }))
      .subscribe(obj => this.guardar(obj)
        .subscribe(json => this.servicio.loadGrilla('pais')
          .subscribe(res => { this.listaPais = res; })));
  }

  addProvincia() {
    this.nombre = 'provincia';
    this.objetoBlanco = new provincia({ 'id': '0', 'nombre': '', 'idpais': document.getElementById('pais')['value'] });
    this.abrirModal('Nueva provincia ', 'provincia', 3, new provincia({ 'id': '0', 'nombre': '', 'idpais': document.getElementById('pais')['value'] }))
      .subscribe(obj => this.guardar(obj)
        .subscribe(json => this.servicio.loadGrilla('provincia')
          .subscribe(res => { this.listaprovincia = res; })));
  }

  addLocalidad() {
    this.nombre = 'localidad';
    this.objetoBlanco = new localidad({ 'id': '0', 'nombre': '', 'idprovincia': document.getElementById('provincia')['value'], 'codpostal':'' });
    this.abrirModal('Nueva localidad ', 'localidad', 3, new localidad({ 'id': '0', 'nombre': '', 'idprovincia': document.getElementById('provincia')['value'] , 'codpostal':'' }))
      .subscribe(obj => this.guardar(obj)
        .subscribe(json => this.servicio.loadGrilla('localidad')
          .subscribe(res => { this.listalocalidad = res; })));
  }

  // colapsar(){
  //   var editor = document.getElementById('editor');
  //   if(editor.style.display == 'none'){
  //     if(this.id != 0){ this.cargarDomicilio(this.id);}
  //     editor.style.display = 'block';
  //   }
  //   else{
  //     editor.style.display = 'none';
  //   }
  // }
}



