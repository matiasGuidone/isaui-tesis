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
    AbmUsuarioComponent
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
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
