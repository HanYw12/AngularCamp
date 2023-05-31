import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DocumentosService {
  url="http://localhost:5000/documentoContable";
  constructor(private http : HttpClient) { }
  // getPersonas(){
  //   return this.http.get(this.url+'/todos');
  // }

  postDocumentoContable(data:any){
    return this.http.post(this.url+'/guardar', data );
  }
}
