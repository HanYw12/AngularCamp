import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  url = "http://localhost:5000/categoria";
  url2 = "http://localhost:5000/campeonatocategoria";
  categoriacampeonato:any;

  constructor(private http: HttpClient) { }

  postGuardarCategoria(categoria: any) {
    return this.http.post(this.url + '/guardar', categoria);
  }

  getVerCategoria() {
    return this.http.get(this.url + '/todos');
  }

  postGuardarCampeonatoCategoria(categoria: any,campeonato:any) {
    return this.http.post(this.url2 + '/guardar', {"campeonato":campeonato,"categorias":categoria.categorias} );
  }

  getVerCampeonatoCategoria(campeonato:number) {
    return this.http.get(this.url2 + '/campeonato/'+campeonato);
  }

}
