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
import { AbmdomicilioComponent } from './abm-domicilio/abm-domicilio.component';
import { AbmpaisComponent } from './abm-pais/abm-pais.component';
import { AbmprovinciaComponent } from './abm-provincia/abm-provincia.component';
import { AbmlocalidadComponent } from './abm-localidad/abm-localidad.component';
import { AbmCarreraComponent } from './abm-carrera/abm-carrera.component';
import { AbmCursoComponent } from './abm-curso/abm-curso.component';
import { AbmUsuarioComponent } from './abm-usuario/abm-usuario.component';
import { AbmMenuComponent } from './abm-menu/abm-menu.component';
import {AbmCiclolectivoComponent} from './abm-ciclolectivo/abm-ciclolectivo.component';
import {AbmMateriaComponent} from './abm-materia/abm-materia.component';
import {FiltroComponent} from './filtro-abm/filtro-abm.component'
import {RelAlumnoMateria} from './rel-alumnomateria/rel-alumnomateria.component';
import {RelDocenteMateria} from './rel-docentemateria/rel-docentemateria.component';
import { PeticionesService } from './services/peticiones.service';
import { AbmRolesComponent } from './abm-roles/abm-roles.component';
import { AbmConvocatoriaComponent } from './abm-convocatoria/abm-convocatoria.component';
import { AbmExamenComponent } from './abm-examen/abm-examen.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    AbmDocenteComponent,
    AbmAlumnoComponent,
    AbmpaisComponent,
    AbmdomicilioComponent,
    AbmprovinciaComponent,
    AbmlocalidadComponent,
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
    AbmConvocatoriaComponent,
    RelDocenteMateria,
    AbmExamenComponent,
    AbmExamenComponent


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
      { path: 'abm-domicilio', component: AbmdomicilioComponent },
      { path: 'abm-pais', component: AbmpaisComponent },
      { path: 'abm-provincia', component: AbmprovinciaComponent },
      { path: 'abm-localidad', component: AbmlocalidadComponent },
      { path: 'abm-carrera', component: AbmCarreraComponent},
      { path: 'abm-curso', component: AbmCursoComponent },
      { path: 'abm-usuario', component: AbmUsuarioComponent },
      { path: 'abm-menu', component: AbmMenuComponent },
      { path: 'abm-cicloLectivo', component: AbmCiclolectivoComponent},
      { path: 'abm-materia', component: AbmMateriaComponent},
      { path: 'rel-alumnomateria', component: RelAlumnoMateria},
      { path: 'abm-roles', component: AbmRolesComponent},
      { path: 'abm-convocatoria', component: AbmConvocatoriaComponent},
      { path: 'rel-docentemateria', component: RelDocenteMateria},
      { path: 'abm-examen', component: AbmExamenComponent}

    ])
  ],
  providers: [PeticionesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
