import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  url="http://localhost:5000/rol";
  constructor(private http : HttpClient) { }
  getRoles(){
    return this.http.get(this.url+'/todos');
  }}
