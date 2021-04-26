import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { convocatoria } from '../clases/convocatoria';
import { curriculumconvocatoria } from '../clases/curriculumconvocatoria';
import { materia } from '../clases/materia';
import { ModalService } from '../modal/modal-service.service';
import { MyModalComponent } from '../modal/MyModalComponent';
import { AuthLoginService } from '../services/authlogin.service';
import { PeticionesService } from '../services/peticiones.service';

@Component({
  selector: 'app-frm-convocatorias',
  templateUrl: './frm-convocatorias.component.html',
  styleUrls: ['./frm-convocatorias.component.css']
})
export class FrmConvocatoriasComponent implements OnInit {
  //administrador: any;
  lista: any[];
  curriculum: any[];
  convocatorias_anotadas = new Array<any>();
  materiaid: number = 0;
  materia = new materia({'id':0,'nombre':'','idcurso':0});
  todas_postuladas: boolean = false;
  nombre: string;
  curcom: any;

  constructor(
    protected modalService: ModalService,
    public servicio: PeticionesService,
    protected logservicio: AuthLoginService) { 
  //  this.administrador = JSON.parse(localStorage.getItem("Rol"));
  }

  ngOnInit() {
  //  if (this.administrador.nombrerol == 'Curriculum') {
      this.servicio.loadGrilla('convocatoria', ['convocatoriascv']).subscribe(l => {
        this.lista = l;
        this.inicioCv();

      });
   
  }

  //método para hacer recarga del usuario cv
  inicioCv() {

    this.servicio.loadGrilla('Curriculum', ['idusuario']).subscribe(curr => {
      this.curriculum = curr;
      //this.curriculum = this.curriculum[0].id.toString();
      if (this.curriculum != undefined) {
        this.servicio.loadGrilla('curriculumconvocatoria', ['usuariocurriculum']).subscribe(cogu => {
          this.convocatorias_anotadas = cogu.filter(element => {
            let b = false;
            this.lista.forEach(conv => {
              if (element.idconvocatoria == conv.id) { b = true; }
            });
            return b;
          });

          this.todas_selecciondas();



        });
      }


    });

  }

  AsignarCuraConvocatoria(ids) {
    this.abrirModaldos('Confirmar', ' Confirmar postularse en esta convocatoria ', 1, null).subscribe(r => {

      this.curcom = new curriculumconvocatoria({ 'idcurriculum': this.curriculum, 'idconvocatoria': ids, 'puntaje': 0, 'prioridad': 0 });
      //console.log(this.curcom)
      this.servicio.addSingleAbm(this.curcom, 'Curriculumconvocatoria').subscribe(x => {
        this.abrirModaldos(x, 'Muchas gracias por tu Postulacion', 2, 3).subscribe(n => {
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
      let param: convocatoria;
      if (obj.idcurriculum != undefined && obj.idcurriculum != null) {
        param = new convocatoria({ "id": obj.id, "fechainicio": obj.fechainicio, "fechafin": obj.fechafin, "descripcion": obj.descripcion, "idmateria": obj.idmateria, "estado": obj.estado, "idcurriculum": obj.idcurriculum });
      }
      else {
        param = new convocatoria({ "id": obj.id, "fechainicio": obj.fechainicio, "fechafin": obj.fechafin, "descripcion": obj.descripcion, "idmateria": obj.idmateria, "estado": obj.estado, "idcurriculum": "0" });
      }
      return this.servicio.addSingleAbm(param, this.nombre);
    }
    else {
      let param: convocatoria;
      param = new convocatoria({ "id": obj.id, "fechainicio": obj.fechainicio, "fechafin": obj.fechafin, "descripcion": obj.descripcion, "idmateria": obj.idmateria, "estado": obj.estado, "idcurriculum": "0" });
      return this.servicio.addSingleAbm(param, this.nombre);
    }
  }

  abrirModaldos(titulo: string, mensaje: string, tipo: number, menu: any): Observable<any> {
    const modalRef =
      this.modalService.open(MyModalComponent,
        { title: titulo, message: mensaje, tipo: tipo, parametros: menu });
    return modalRef.onResult();
  }

  eliminar_relacion( id2) {
    this.abrirModaldos('Confirmar', `¿ Confirma cancelar su postulación ?`, 1, null).subscribe(
      closed => {
        return this.servicio.eliminarConFiltro(['idcurriculum', this.curriculum[0].id.toString() , 'idconvocatoria', id2], 'Curriculumconvocatoria')
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
    this.materiaid = 0;
    let convoc = this.lista.find(c => c.id == idconvocatoria);
    this.servicio.getById(convoc.idmateria.toString(), 'materia').subscribe(mat => {
      this.materiaid = convoc.idmateria;
      this.materia = mat;
    });
  }

  //recibe el id de la convocatoria y garantiza que el postulante está o no este potulado
  estaconvocado(id) {
    let d = this.convocatorias_anotadas.find(c => c.idconvocatoria == id)
    if (d == undefined) { return true; } else { return false; }
  }

  fondorow(id){
    let d = this.convocatorias_anotadas.find(c => c.idconvocatoria == id)
    if (d == undefined) { return "background-color: cadetblue;"; } else { return ""; }
  }
}
