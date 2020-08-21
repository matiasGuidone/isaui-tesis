import { Component } from '@angular/core';
import { PeticionesService } from './services/peticiones.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  constructor(private servicio: PeticionesService){}
}
