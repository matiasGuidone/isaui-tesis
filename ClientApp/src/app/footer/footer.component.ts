import { Component } from '@angular/core';

@Component({
  /* moduleId: module.id, */
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor() { }

  ngOnInit() {
  }

}
/*   let ubicacionPrincipalArriba = window.pageYOffset;*/
/* 186.6666717529297   */
let ubicacionPrincipalFooter = 186  
window.onscroll=function(){
    let desplazamiento_Y= window.pageYOffset;
    if(ubicacionPrincipalFooter >= desplazamiento_Y)
    {
      document.getElementById('redessociales').style.top='186.6666717529297 '
    }
    else
    {
      document.getElementById('redessociales').style.top= '-100px';
    }
    ubicacionPrincipalFooter = desplazamiento_Y;
  }  
