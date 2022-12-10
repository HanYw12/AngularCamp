
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
//import { usuarioI } from '../component/registro/registro.component';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  url="http://localhost:5000/usuario";
  constructor(private http : HttpClient) { }
  getPersonas(){
    return this.http.get(this.url+'/todos');
  }

  postOrganizador(empleado:any){
    return this.http.post(this.url+'/organizador',empleado);
  }

  getRoles(usuario:any)
  {
    return this.http.post(this.url+'/getRoles',usuario);
  }

  postPersonaguardar(empleado:any){
    console.log(empleado);
    return this.http.post(this.url+'/guardar',empleado);
  }

  postVerificar(empleado:any){
    return this.http.post(this.url+'/solo',empleado.value );
  }

}
