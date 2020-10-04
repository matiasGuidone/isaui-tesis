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
import { IniciarSesionComponent } from './iniciar-sesion/inicar-sesion.component';
import{AuthLoginService} from './services/authlogin.service';
import { FrmCarganotasComponent } from './frm-carganotas/frm-carganotas.component';
import { ExcelService } from './services/excel.service';
import { FrmConsultaasistenciasComponent } from './frm-consultaasistencias/frm-consultaasistencias.component';
import { Guard } from './clases/guard';
import { AbmMensajeComponent } from './abm-mensaje/abm-mensaje.component';
import { FrmMensajesComponent } from './frm-mensajes/frm-mensajes.component';
import { CarganotadocenteComponent } from './carganotadocente/carganotadocente.component';
import { FrmCalendarioComponent } from './frm-calendario/frm-calendario.component'; 
import { CmpHorariosComponent } from './cmp-horarios/cmp-horarios.component';
import { FrmAsistenciasalumnoComponent } from './frm-asistenciasalumno/frm-asistenciasalumno.component';
import { GuardAutogestion } from './clases/guardautogestion';
import { FrmCalendariocompComponent } from './frm-calendariocomp/frm-calendariocomp.component';


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
    IniciarSesionComponent,
    FrmCarganotasComponent,
    FrmConsultaasistenciasComponent,
    AbmMensajeComponent,
    FrmMensajesComponent,
    CarganotadocenteComponent,
    FrmCalendarioComponent, 
    CmpHorariosComponent,
    FrmAsistenciasalumnoComponent,
    FrmCalendariocompComponent,
  ],
  entryComponents: [MyModalComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    ModalServiceModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, canActivate: [GuardAutogestion]},
      { path: 'autogestion', component: HomeComponent, canActivate: [GuardAutogestion]},
      { path: 'counter', component: CounterComponent, canActivate : [Guard] },
      { path: 'fetch-data', component: FetchDataComponent, canActivate : [Guard] },
      { path: 'abm-docente', component: AbmDocenteComponent, canActivate : [Guard] },
      { path: 'abm-alumno', component: AbmAlumnoComponent, canActivate : [Guard] },
      { path: 'abm-domicilio', component: AbmDomicilioComponent, canActivate : [Guard] },
      { path: 'abm-direccion', component: AbmDireccionComponent, canActivate : [Guard] },
      { path: 'abm-pais', component: AbmPaisComponent, canActivate : [Guard] },
      { path: 'abm-provincia', component: AbmProvinciaComponent, canActivate : [Guard] },
      { path: 'abm-localidad', component: AbmLocalidadComponent, canActivate : [Guard] },
      { path: 'abm-carrera', component: AbmCarreraComponent, canActivate : [Guard]},
      { path: 'abm-curso', component: AbmCursoComponent, canActivate : [Guard] },
      { path: 'abm-usuario', component: AbmUsuarioComponent, canActivate : [Guard] },
      { path: 'abm-menu', component: AbmMenuComponent, canActivate : [Guard] },
      { path: 'abm-ciclolectivo', component: AbmCiclolectivoComponent, canActivate : [Guard]},
      { path: 'abm-materia', component: AbmMateriaComponent, canActivate : [Guard]},
      { path: 'rel-alumnomateria', component: RelAlumnoMateria, canActivate : [Guard]},
      { path: 'abm-roles', component: AbmRolesComponent, canActivate : [Guard]},
      { path: 'rel-docentemateria', component: RelDocenteMateria, canActivate : [Guard]},
      { path: 'abm-convocatoria', component: AbmConvocatoriaComponent, canActivate : [Guard]},
      { path: 'abm-examen', component: AbmExamenComponent, canActivate : [Guard]},
      { path: 'abm-evento', component: AbmEventoComponent, canActivate : [Guard]},
      { path: 'abm-horasdia', component: AbmHorasDiaComponent, canActivate : [Guard]},
      { path: 'rel-cursoalumno', component: RelCursoAlumno, canActivate : [Guard] },
      { path: 'rel-rolesusuario', component: RelRolesUsuario, canActivate : [Guard] },
      { path: 'frm-asistencia', component: FrmAsistenciaComponent, canActivate : [Guard] },
      { path: 'frm-horasemana', component: FrmHoraSemanaComponent, canActivate : [Guard] },
      { path: 'frm-carganotas', component: FrmCarganotasComponent, canActivate : [Guard] },
      { path: 'frm-consultaasistencia', component: FrmConsultaasistenciasComponent, canActivate : [Guard] },
      { path: 'frm-asistenciasalumno', component: FrmAsistenciasalumnoComponent, canActivate : [Guard] },
      { path: 'frm-calendariocomp', component: FrmCalendariocompComponent, canActivate : [Guard] },
      { path: 'frm-mensajes', component: FrmMensajesComponent, canActivate : [Guard] },
      { path: 'frm-calendario', component: FrmCalendarioComponent, canActivate : [Guard] },
      {path: 'abm-mensaje', component: AbmMensajeComponent, canActivate:[Guard]},
     // { path: '', component: IniciarSesionComponent, pathMatch: 'full' },
     {path: 'carganotadocente', component: CarganotadocenteComponent, canActivate:[Guard]},
    ])
  ],
  providers: [PeticionesService, ExcelService, AuthLoginService, Guard, GuardAutogestion],
  bootstrap: [AppComponent]
})
export class AppModule { }
