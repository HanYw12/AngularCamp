import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EquiposService {
  
  url="http://localhost:5000/equipo";
  constructor(private http : HttpClient) { }
  getEquipos(){
    return this.http.get(this.url+'/todos');
  }
  
  getCategoria(){
    return this.http.get('http://localhost:5000/categoria/todos')
  }

  

  postGuardarEquipo(equipo:any){
    return this.http.post(this.url+'/guardar',equipo)
  }

  
  postGuardarEquipoUsuario(equipo:any){
    return this.http.post(this.url+'usuario/guardar',equipo)
  }

  getEquipoUsuario(equipo:any){
    return this.http.post(this.url+'usuario/todoequipo',{"id":equipo})
  }


}
