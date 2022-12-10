import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CampeonatoequipoService {



  url="http://localhost:5000/campeonatoequipo";
  constructor(private http:HttpClient) { }

  postGuardarCampeonato(equipo:any,campeonato:any){
    return this.http.post(this.url+'/guardar',{"campeonato":campeonato.campeonato,"categoria":campeonato.categorias,"equipos":equipo})
  }

  getVerCampeonato(id:number){
    return this.http.get(this.url+'/todocampeonato/'+id)
  }

}
