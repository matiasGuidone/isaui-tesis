import { Component, OnInit } from '@angular/core';
import { PeticionesService } from '../services/peticiones.service';

@Component({
  selector: 'app-frm-curriculum',
  templateUrl: './frm-curriculum.component.html',
  styleUrls: ['./frm-curriculum.component.css']
})
export class FrmCurriculumComponent implements OnInit {

  constructor(private servicio:PeticionesService) { }

  ngOnInit() {
  }

}
