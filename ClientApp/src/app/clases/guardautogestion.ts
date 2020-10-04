import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthLoginService } from '../services/authlogin.service';



@Injectable()
export class GuardAutogestion implements CanActivate {

    constructor(private router: Router, private logservicio: AuthLoginService) { }

    canActivate() {
        if(localStorage.getItem('Access_Token')!= undefined && localStorage.getItem('Access_Token') != 'undefined'){
            return true;
          }
          return false;
    }
}