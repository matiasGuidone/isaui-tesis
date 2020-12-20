import { Component, OnInit, Input, EventEmitter, Output, } from '@angular/core';
import { Location } from '@angular/common';
import { from, Observable } from 'rxjs';

//ventanas modales
import { ModalService } from '../modal/modal-service.service';
import { convocatoria } from '../clases/convocatoria';
import { abm } from '../clases/abm';
import { PeticionesService } from '../services/peticiones.service';
import { AuthLoginService } from '../services/authlogin.service';
import { curriculumconvocatoria } from '../clases/curriculumconvocatoria';
import { MyModalComponent } from '../modal/MyModalComponent';
import { materia } from '../clases/materia';
//ventanas modales

@Component({
  selector: 'app-abm-convocatoria',
  templateUrl: './abm-convocatoria.component.html',
  styleUrls: ['./abm-convocatoria.component.css']
})
export class AbmConvocatoriaComponent extends abm<convocatoria> implements OnInit {

  administrador: any;
  curcom: curriculumconvocatoria;
  curriculum: any;
  todas_postuladas: boolean = true;
  convocatorias_anotadas: any;
  materia:materia;


  @Input() esRelacion: boolean = false;
  @Output() emisorId = new EventEmitter<string[]>();
  materiaid: number = 0;

  constructor(protected location: Location,
    protected modalService: ModalService,
    protected servicio: PeticionesService,
    protected logservicio: AuthLoginService) {
    super(location, modalService, servicio, logservicio);
    this.administrador = JSON.parse(localStorage.getItem("Rol"));
    this.nombre = 'convocatoria';
    this.objetoBlanco = new convocatoria({ 'id': '0', 'nombre': '', 'fechainicio': '', 'fechafin': '', 'descripcion': '', 'idmateria': '', 'estado': '' });
    this.modalService.setFiltro(this.objetoBlanco);
    if (this.modalService.listAbm != null && this.modalService.listAbm != undefined) {
      if (this.modalService.listAbm.getData().name == this.nombre) {
        this.editar(this.modalService.listAbm.getData().id,
          this.modalService.listAbm.getData());
      }
    }


  }

  //método para hacer recarga del usuario cv
  inicioCv() {

    this.servicio.loadGrilla('Curriculum', ['idusuario']).subscribe(curr => {
      this.curriculum = curr;
      this.curriculum = this.curriculum[0].id.toString();
      if (this.curriculum != undefined) {
        this.servicio.loadGrilla('curriculumconvocatoria', ['usuariocurriculum']).subscribe(cogu => {
          this.convocatorias_anotadas = cogu.filter(element => {
             let b = false;
              this.lista.forEach(conv => {
                if( element.idconvocatoria == conv.id){b = true;}
              });
              return b;
           });
          
          this.todas_selecciondas();



        });
      }


    });

  }
  ngOnInit() {
    if (this.administrador.nombrerol == 'Curriculum') {
      this.servicio.loadGrilla('convocatoria', ['convocatoriascv']).subscribe(l => {
        this.lista = l;
        this.inicioCv();

      });
    }
    else {
      this.servicio.loadGrilla(this.nombre).subscribe(res => this.lista = res);
    }

  }

  seleccionar(id) {
    if (this.esRelacion) {
      let datos = new Array<string>();
      datos.push(id);
      datos.push(this.lista.find(convocatoria => convocatoria.id === id).descripcion);
      this.emisorId.emit(datos);
    }
    else {
      let nodo = this.modalService.listAbm;
      while (nodo.getData().name == "convocatoria") {
        this.modalService.listAbm = nodo.getNext();
        nodo = nodo.getNext();
      }
      this.modalService.listAbm.getData().idconvocatoria = id;
      this.location.back();
      this.location.subscribe(r => { this.logservicio.componenteGuard = r.url.toString().substring(1); });
    }
  }

  //función para evaluar check
  esSeleccionado(par) {
    if (this.servicio.idsSeleccionados
      .find(id => id === par) == null) { return false; }
    else
      return true;
  }

  AsignarCuraConvocatoria(ids) {
    this.abrirModal('Confirmar', 'Desea postularse en esta convocatoria', 1, null).subscribe(r => {

      this.curcom = new curriculumconvocatoria({ 'idcurriculum': this.curriculum, 'idconvocatoria': ids, 'puntaje': 0, 'prioridad': 0 });
      console.log(this.curcom)
      this.servicio.addSingleAbm(this.curcom, 'Curriculumconvocatoria').subscribe(x => {
        this.abrirModal(x, 'Muchas gracias por tu Postulacion', 2, 3).subscribe(n => {
          this.inicioCv();
        });


        // this.servicio.loadGrilla('Curriculumconvocatoria').subscribe(cuco => {
        //   this.servicio.loadGrilla('ConvocatoriaGuardados', cuco[0].idcurriculum.toString()).subscribe(cogu => {
        //     this.convocatorias_anotadas = cogu;

        //   });
        // });

      },
        err => console.error('Observer got an error: ' + err)

      );
    });

  }

  guardar(obj): Observable<convocatoria> {
    if (+obj.id != 0) {
      //let param =  this.castObjeto(obj);
      // this.id =+ obj.id;
      // this.fechainicio = new Date(obj.fechainicio);
      // this.fechafin = new Date(obj.fechafin);
      // this.descripcion = obj.descripcion;
      // this.idmateria = +obj.idmateria;
      // this.estado = +obj.estado;
      // this.idcurriculum = +obj.idcurriculum;
      let param : convocatoria;
      if(obj.idcurriculum!= undefined && obj.idcurriculum != null){
        param = new convocatoria({"id":obj.id, "fechainicio":obj.fechainicio, "fechafin": obj.fechafin ,"descripcion": obj.descripcion, "idmateria": obj.idmateria,"estado":obj.estado,"idcurriculum":obj.idcurriculum});
      }
      else{
        param = new convocatoria({"id":obj.id, "fechainicio":obj.fechainicio, "fechafin": obj.fechafin ,"descripcion": obj.descripcion, "idmateria": obj.idmateria,"estado":obj.estado,"idcurriculum":"0"});
      }
      return this.servicio.addSingleAbm(param, this.nombre);
    }
    else {
      let param : convocatoria;
      param = new convocatoria({"id":obj.id, "fechainicio":obj.fechainicio, "fechafin": obj.fechafin ,"descripcion": obj.descripcion, "idmateria": obj.idmateria,"estado":obj.estado,"idcurriculum":"0"});
      return this.servicio.addSingleAbm(param, this.nombre);
    }
  }

  abrirModal(titulo: string, mensaje: string, tipo: number, menu: any): Observable<any> {
    const modalRef =
      this.modalService.open(MyModalComponent,
        { title: titulo, message: mensaje, tipo: tipo, parametros: menu });
    return modalRef.onResult();
  }

  eliminar_relacion(id, id2) {
    this.abrirModal('Confirmación', '¿ Desea eliminar el registro ?', 1, null).subscribe(
      closed => {
        return this.servicio.eliminarConFiltro(['idcurriculum', id, 'idconvocatoria', id2], 'Curriculumconvocatoria')
          .subscribe(json => this.inicioCv());
      });
  }


  todas_selecciondas() {
    this.todas_postuladas = true;

    this.servicio.loadGrilla('Convocatoria').subscribe((cuco: any[]) => {
      if (cuco != undefined) {
        for (let n of cuco) {
          if (Array.isArray(this.convocatorias_anotadas)) {
            let indice = this.convocatorias_anotadas.find(c => c.idconvocatoria == n.id);
            if (indice == undefined) {
              this.todas_postuladas = false;
            }
          }
          else { this.todas_postuladas = false; }
        }
      }
    })

      ;

  }
  verHorarios(idconvocatoria) {
    let convoc = this.lista.find(c => c.id == idconvocatoria);
    this.materiaid = convoc.idmateria;
    this.servicio.getById(this.materiaid.toString(),'materia').subscribe(mat=>{
      this.materia = mat;
    });
  }

  //recibe el id de la convocatoria y garantiza que el postulante está o no este potulado
  estaconvocado(id) {
    let d = this.convocatorias_anotadas.find(c => c.idconvocatoria == id)
    if (d == undefined) { return true; } else { return false; }
  }

}



