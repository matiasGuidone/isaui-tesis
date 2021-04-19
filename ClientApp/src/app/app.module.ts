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
import { AbmestudianteComponent } from './abm-estudiante/abm-estudiante.component';
import { AbmDomicilioComponent } from './abm-domicilio/abm-domicilio.component';
import { AbmDireccionComponent } from './abm-direccion/abm-direccion.component';
import { AbmPaisComponent } from './abm-pais/abm-pais.component';
import { AbmProvinciaComponent } from './abm-provincia/abm-provincia.component';
import { AbmLocalidadComponent } from './abm-localidad/abm-localidad.component';
import { AbmCarreraComponent } from './abm-carrera/abm-carrera.component';
import { AbmCursoComponent } from './abm-curso/abm-curso.component';
import { AbmUsuarioComponent } from './abm-usuario/abm-usuario.component';
import { AbmMenuComponent } from './abm-menu/abm-menu.component';
import { AbmCiclolectivoComponent } from './abm-ciclolectivo/abm-ciclolectivo.component';
import { AbmMateriaComponent } from './abm-materia/abm-materia.component';
import { FiltroComponent } from './filtro-abm/filtro-abm.component'
import { RelestudianteMateria } from './rel-estudiantemateria/rel-estudiantemateria.component';
import { RelDocenteMateria } from './rel-docentemateria/rel-docentemateria.component';
import { RelCursoestudiante } from './rel-cursoestudiante/rel-cursoestudiante.component';
import { PeticionesService } from './services/peticiones.service';
import { AbmRolesComponent } from './abm-roles/abm-roles.component';
import { AbmExamenComponent } from './abm-examen/abm-examen.component';
import { AbmHorasDiaComponent } from './abm-horasdia/abm-horasdia.component';
import { AbmConvocatoriaComponent } from './abm-convocatoria/abm-convocatoria.component';
import { AbmEventoComponent } from './abm-evento/abm-evento.component';
import { FooterComponent } from './footer/footer.component';
import { RelRolesUsuario } from './rel-rolesusuario/rel-rolesusuario.component';
import { FrmAsistenciaComponent } from './frm-asistencia/frm-asistencia.component';
import { FrmHoraSemanaComponent } from './frm-horasemana/frm-horasemana.component';
import { IniciarSesionComponent } from './iniciar-sesion/inicar-sesion.component';
import { AuthLoginService } from './services/authlogin.service';
import { FrmCarganotasComponent } from './frm-carganotas/frm-carganotas.component';
import { ExcelService } from './services/excel.service';
import { FrmConsultaasistenciasComponent } from './frm-consultaasistencias/frm-consultaasistencias.component';
import { Guard } from './clases/guard';
import { AbmMensajeComponent } from './abm-mensaje/abm-mensaje.component';
import { AbmformulaComponent } from './abm-formula/abm-formula.component';
import { FrmMensajesComponent } from './frm-mensajes/frm-mensajes.component';
import { ConsultanotasComponent } from './frm-consultanotas/frm-consultanotas.component';
import { FrmCalendarioComponent } from './frm-calendario/frm-calendario.component';
import { CmpHorariosComponent } from './cmp-horarios/cmp-horarios.component';
import { FrmAsistenciasestudianteComponent } from './frm-asistenciasestudiante/frm-asistenciasestudiante.component';
import { GuardAutogestion } from './clases/guardautogestion';
import { FrmCalendariocompComponent } from './frm-calendariocomp/frm-calendariocomp.component';
import { VerMensajeComponent } from './ver-mensaje/ver-mensaje.component';
import { RelCurriculumconvocatoriaComponent } from './rel-curriculumconvocatoria/rel-curriculumconvocatoria.component';
import { AbmCurriculumComponent } from './abm-curriculum/abm-curriculum.component';
import { curriculum } from './clases/curriculum';
import { FrmCurriculumComponent } from './frm-curriculum/frm-curriculum.component';
import { OrdenmeritoComponent } from './ordenmerito/ordenmerito.component';
import { FrmConvocatoriasComponent } from './frm-convocatorias/frm-convocatorias.component';
import { FrmVercurriculumComponent } from './frm-vercurriculum/frm-vercurriculum.component';
import { FrmControlregularidadesComponent } from './frm-controlregularidades/frm-controlregularidades.component';
import { ConfiguracionUsuarioComponent } from './configuracion-usuario/configuracion-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    AbmDocenteComponent,
    AbmestudianteComponent,
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
    RelestudianteMateria,
    AbmRolesComponent,
    RelDocenteMateria,
    AbmExamenComponent,
    AbmConvocatoriaComponent,
    AbmEventoComponent,
    RelCursoestudiante,
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
    FrmCalendarioComponent,
    CmpHorariosComponent,
    FrmAsistenciasestudianteComponent,
    FrmCalendariocompComponent,
    VerMensajeComponent,
    ConsultanotasComponent,
    RelCurriculumconvocatoriaComponent,
    AbmCurriculumComponent,
    FrmCurriculumComponent,
    OrdenmeritoComponent,
    FrmConvocatoriasComponent,
    FrmVercurriculumComponent,
    AbmformulaComponent,
    FrmControlregularidadesComponent,
    ConfiguracionUsuarioComponent

  ],
  entryComponents: [MyModalComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    ModalServiceModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([

      { path: '', component: HomeComponent, canActivate: [GuardAutogestion] },
      { path: 'autogestion', component: HomeComponent, canActivate: [GuardAutogestion] },
      { path: 'configuracion-usuario', component: ConfiguracionUsuarioComponent, canActivate: [GuardAutogestion] },
      { path: 'frm-vermensajes', component: VerMensajeComponent, canActivate: [Guard] },
      { path: 'counter', component: CounterComponent, canActivate: [Guard] },
      { path: 'fetch-data', component: FetchDataComponent, canActivate: [Guard] },
      { path: 'abm-docente', component: AbmDocenteComponent, canActivate: [Guard] },
      { path: 'abm-estudiante', component: AbmestudianteComponent, canActivate: [Guard] },
      { path: 'abm-domicilio', component: AbmDomicilioComponent, canActivate: [Guard] },
      { path: 'abm-direccion', component: AbmDireccionComponent, canActivate: [Guard] },
      { path: 'abm-pais', component: AbmPaisComponent, canActivate: [Guard] },
      { path: 'abm-provincia', component: AbmProvinciaComponent, canActivate: [Guard] },
      { path: 'abm-localidad', component: AbmLocalidadComponent, canActivate: [Guard] },
      { path: 'abm-carrera', component: AbmCarreraComponent, canActivate: [Guard] },
      { path: 'abm-curso', component: AbmCursoComponent, canActivate: [Guard] },
      { path: 'abm-usuario', component: AbmUsuarioComponent, canActivate: [Guard] },
      { path: 'abm-menu', component: AbmMenuComponent, canActivate: [Guard] },
      { path: 'abm-ciclolectivo', component: AbmCiclolectivoComponent, canActivate: [Guard] },
      { path: 'abm-materia', component: AbmMateriaComponent, canActivate: [Guard] },
      { path: 'rel-estudiantemateria', component: RelestudianteMateria, canActivate: [Guard] },
      { path: 'abm-roles', component: AbmRolesComponent, canActivate: [Guard] },
      { path: 'rel-docentemateria', component: RelDocenteMateria, canActivate: [Guard] },
      { path: 'abm-convocatoria', component: AbmConvocatoriaComponent },
      { path: 'abm-examen', component: AbmExamenComponent, canActivate: [Guard] },
      { path: 'abm-evento', component: AbmEventoComponent, canActivate: [Guard] },
      { path: 'abm-horasdia', component: AbmHorasDiaComponent, canActivate: [Guard] },
      { path: 'rel-cursoestudiante', component: RelCursoestudiante, canActivate: [Guard] },
      { path: 'rel-rolesusuario', component: RelRolesUsuario, canActivate: [Guard] },
      { path: 'frm-asistencia', component: FrmAsistenciaComponent, canActivate: [Guard] },
      { path: 'frm-horasemana', component: FrmHoraSemanaComponent, canActivate: [Guard] },
      { path: 'frm-carganotas', component: FrmCarganotasComponent, canActivate: [Guard] },
      { path: 'frm-consultaasistencia', component: FrmConsultaasistenciasComponent, canActivate: [Guard] },
      { path: 'frm-asistenciasestudiante', component: FrmAsistenciasestudianteComponent, canActivate: [Guard] },
      { path: 'frm-calendariocomp', component: FrmCalendariocompComponent, canActivate: [Guard] },
      { path: 'frm-mensajes', component: FrmMensajesComponent, canActivate: [Guard] },
      { path: 'frm-calendario', component: FrmCalendarioComponent, canActivate: [Guard] },
      { path: 'frm-curriculum', component: FrmCurriculumComponent },
      { path: 'abm-mensaje', component: AbmMensajeComponent, canActivate: [Guard] },
      // { path: '', component: IniciarSesionComponent, pathMatch: 'full' },
      { path: 'frm-consultanotas', component: ConsultanotasComponent, canActivate: [Guard] },
      { path: 'abm-curriculum', component: AbmCurriculumComponent, canActivate: [Guard] },
      { path: 'rel-curriculumconvocatoria', component: RelCurriculumconvocatoriaComponent, canActivate: [Guard] },
      { path: 'frm-ordenmerito', component: OrdenmeritoComponent, canActivate: [Guard] },
      { path: 'frm-vercurriculum', component: FrmVercurriculumComponent, canActivate: [Guard] },
      { path: 'abm-formula', component: AbmformulaComponent, canActivate: [Guard] },
      { path: 'frm-controlregularidades', component: FrmControlregularidadesComponent, canActivate: [Guard] },
      { path: 'frm-convocatorias', component: FrmConvocatoriasComponent, canActivate: [Guard] },
    ])
  ],
  providers: [PeticionesService, ExcelService, AuthLoginService, Guard, GuardAutogestion],
  bootstrap: [AppComponent]
})
export class AppModule { }
