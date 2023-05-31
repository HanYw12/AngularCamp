
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { usuarioI } from '../component/registro/registro.component';
//import { usuarioI } from '../component/registro/registro.component';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  url="http://localhost:5000/usuario";
  constructor(private http : HttpClient) { }
  // getPersonas(){
  //   return this.http.get(this.url+'/todos');
  // }

  postOrganizador(empleado:any){
    return this.http.post(this.url+'/organizador',empleado);
  }

  getRoles(usuario:any)
  {
    return this.http.post(this.url+'/getRoles',usuario);
  }

  postPersonaguardar(empleado:any){
    return this.http.post(this.url+'/guardar',empleado.value);
  }

  postClienteguardar(empleado:any){
    return this.http.post(this.url+'/guardar',empleado.value);
  }

  postVerificar(empleado:any){
    return this.http.post(this.url+'/solo',empleado.value );
  }

  getFuncionalidades(){
    return this.http.get('http://localhost:5000/funcionalidad/todos');
  }

  getCliente(usuario : string){
    return this.http.get(this.url+'/cliente/'+usuario);
  }

  //alertas
  public Toast = Swal.mixin({
      toast: true,
      position: 'top-right',
      color:'white',
      customClass: {
        container: 'colored-toast',
      },
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true
    });


}
