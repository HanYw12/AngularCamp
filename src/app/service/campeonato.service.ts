import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CampeonatoService {
  url="http://localhost:5000/campeonato";
  request:any =[];

  constructor(private http:HttpClient) { }

  getVerCampeonato(){
    return this.http.get(this.url+'/todos');
  }

  getCategoriaxEquipo(campeonato:any){
    console.log(campeonato);
    return this.http.post(this.url+'/campeonatoCategorias',campeonato);
  }

  postGuardarCampeonato(campeonato:any){
    return this.http.post(this.url+'/guardar',campeonato);
  }

}
