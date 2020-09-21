import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { AbmDocenteComponent } from './abm-docente/abm-docente.component';
import { MyModalComponent } from './modal/MyModalComponent';
import { ModalServiceModule } from './modal/modal-service.module';
import { AbmAlumnoComponent } from './abm-alumno/abm-alumno.component';
import { AbmDomicilioComponent } from './abm-domicilio/abm-domicilio.component';
import { AbmDireccionComponent } from './abm-direccion/abm-direccion.component';
import { AbmPaisComponent } from './abm-pais/abm-pais.component';
import { AbmProvinciaComponent } from './abm-provincia/abm-provincia.component';
import { AbmLocalidadComponent } from './abm-localidad/abm-localidad.component';
import { AbmCarreraComponent } from './abm-carrera/abm-carrera.component';
import { AbmCursoComponent } from './abm-curso/abm-curso.component';
import { AbmUsuarioComponent } from './abm-usuario/abm-usuario.component';
import { AbmMenuComponent } from './abm-menu/abm-menu.component';
import {AbmCiclolectivoComponent} from './abm-ciclolectivo/abm-ciclolectivo.component';
import {AbmMateriaComponent} from './abm-materia/abm-materia.component';
import {FiltroComponent} from './filtro-abm/filtro-abm.component'
import {RelAlumnoMateria} from './rel-alumnomateria/rel-alumnomateria.component';
import {RelDocenteMateria} from './rel-docentemateria/rel-docentemateria.component';
import {RelCursoAlumno} from './rel-cursoalumno/rel-cursoalumno.component';

import { PeticionesService } from './services/peticiones.service';
import { AbmRolesComponent } from './abm-roles/abm-roles.component';
import { AbmExamenComponent } from './abm-examen/abm-examen.component';
import { AbmHorasDiaComponent } from './abm-horasdia/abm-horasdia.component';
import { AbmConvocatoriaComponent } from './abm-convocatoria/abm-convocatoria.component';
import { AbmEventoComponent } from './abm-evento/abm-evento.component';
import { FooterComponent } from './footer/footer.component';
import {RelRolesUsuario} from './rel-rolesusuario/rel-rolesusuario.component';
import {FrmAsistenciaComponent} from './frm-asistencia/frm-asistencia.component';
import {FrmHoraSemanaComponent} from './frm-horasemana/frm-horasemana.component';
import { FrmCarganotasComponent } from './frm-carganotas/frm-carganotas.component';
import { ExcelService } from './services/excel.service';
import { FrmConsultaasistenciasComponent } from './frm-consultaasistencias/frm-consultaasistencias.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    AbmDocenteComponent,
    AbmAlumnoComponent,
    AbmPaisComponent,
    AbmDomicilioComponent,
    AbmProvinciaComponent,
    AbmLocalidadComponent,
    AbmCarreraComponent,
    AbmCursoComponent,
    MyModalComponent,
    AbmUsuarioComponent, 
    AbmMenuComponent,
    AbmCiclolectivoComponent,
    FiltroComponent,
    AbmMateriaComponent,
    RelAlumnoMateria,
    AbmRolesComponent,
    RelDocenteMateria,
    AbmExamenComponent,
    AbmConvocatoriaComponent,
    AbmEventoComponent,
    RelCursoAlumno,
    FooterComponent,
    RelRolesUsuario,
    AbmDireccionComponent,
    FrmAsistenciaComponent,
    FrmHoraSemanaComponent,
    AbmHorasDiaComponent,
    FrmCarganotasComponent,
    FrmConsultaasistenciasComponent,
     
  ],
  entryComponents: [MyModalComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    ModalServiceModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'abm-docente', component: AbmDocenteComponent },
      { path: 'abm-alumno', component: AbmAlumnoComponent },
      { path: 'abm-domicilio', component: AbmDomicilioComponent },
      { path: 'abm-direccion', component: AbmDireccionComponent },
      { path: 'abm-pais', component: AbmPaisComponent },
      { path: 'abm-provincia', component: AbmProvinciaComponent },
      { path: 'abm-localidad', component: AbmLocalidadComponent },
      { path: 'abm-carrera', component: AbmCarreraComponent},
      { path: 'abm-curso', component: AbmCursoComponent },
      { path: 'abm-usuario', component: AbmUsuarioComponent },
      { path: 'abm-menu', component: AbmMenuComponent },
      { path: 'abm-ciclolectivo', component: AbmCiclolectivoComponent},
      { path: 'abm-materia', component: AbmMateriaComponent},
      { path: 'rel-alumnomateria', component: RelAlumnoMateria},
      { path: 'abm-roles', component: AbmRolesComponent},
      { path: 'rel-docentemateria', component: RelDocenteMateria},
      { path: 'abm-convocatoria', component: AbmConvocatoriaComponent},
      { path: 'abm-examen', component: AbmExamenComponent},
      { path: 'abm-evento', component: AbmEventoComponent},
      { path: 'abm-horasdia', component: AbmHorasDiaComponent},
      { path: 'rel-cursoalumno', component: RelCursoAlumno },
      { path: 'rel-rolesusuario', component: RelRolesUsuario },
      { path: 'frm-asistencia', component: FrmAsistenciaComponent },
      { path: 'frm-horasemana', component: FrmHoraSemanaComponent }, 
      { path: 'frm-carganotas', component: FrmCarganotasComponent },
      { path: 'frm-consultaasistencia', component: FrmConsultaasistenciasComponent },
    ])
  ],
  providers: [PeticionesService, ExcelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
