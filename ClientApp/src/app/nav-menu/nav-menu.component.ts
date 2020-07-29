import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject } from '@angular/core';
import { AbmMenuComponent } from '../abm-menu/abm-menu.component';
import { menu } from '../clases/menu';
import { ModalService } from '../modal/modal-service.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  menus : menu[];
  constructor(private http: HttpClient, private modalService:ModalService,@Inject('BASE_URL') private baseUrl: string){
    new AbmMenuComponent(null,modalService ,http, baseUrl,null).cargarGrilla()
    .subscribe( res => this.menus = res);
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
