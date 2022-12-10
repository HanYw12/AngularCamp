import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { rolI, usuarioI } from '../component/registro/registro.component';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  isLogin = false;
  constructor() { }
  login (clave:string , usu:any){
    sessionStorage.setItem( clave ,JSON.stringify(usu));
  }
  
  get(clave:string):any{
    return sessionStorage.getItem(clave)
  }

  logout (clave : string){
    sessionStorage.removeItem(clave)
  }

  isLoggedIn() {
    const loggedIn = sessionStorage.getItem('estado');
    if (loggedIn == 'true')
      this.isLogin = true;
    else
      this.isLogin = false;
    return this.isLogin;
  }
  
}
