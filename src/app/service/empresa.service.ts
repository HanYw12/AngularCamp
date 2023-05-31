import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { parametroDetI } from '../component/productos/productos.component';
import { usuarioI } from '../component/registro/registro.component';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  url = 'http://localhost:5000/';
  constructor(private http: HttpClient ) { }

  postGuardarEmpresa(empresa: empresaI) {
    return this.http.post(this.url + 'empresa/nueva', empresa);
  }
  
  getParametros( descripcion:String) {
    return this.http.get(this.url + 'parametrosDet/getParametrosPorDescripcion/'+ descripcion);
  }

  postProductos(producto : productosI){
    return this.http.post(this.url + 'productos/nuevo', producto);
  }
  postParametrosxCriterios(paramtroDet : parametroDetI){
    return this.http.post(this.url + 'parametrosDet/getParametrosPorCriterios', paramtroDet);
  }

  postInventario(empresa : empresaI){
    return this.http.post(this.url + 'productos/inventario', empresa);
  }
  postProductoPorDetalle(producto : productosI){
    return this.http.post<respuestaI>(this.url + 'productos/productoPorDetalle', producto);
  }
}

export interface productosI{
  idProducto:number,
  empresaId:empresaI,
  producto:string,
  cantidad:number,
  fechaCaducidad:Date,
  fechaCreacion:Date,
  codigo:string,
  auxCodigo:string,
  unidadMedida:string,
  noObjetoIva:boolean;
  iva:boolean,
  IRBPNR:boolean,
  ice:parametroDetI,
  tipoProducto:string,
  valorUnitario:number
}
export interface empresaI {
  id:number,
  razonSocial:string,
  ruc:string,
  representanteLegalId:usuarioI,
  regimenRimpe:boolean,
  agenteRetencion:number,
  contribuyenteEspecial:string,
  obligadoContabilidad:boolean,
  direccionMatriz:string,
  UsrCreacion:usuarioI,
  fechaCreacion:Date,
  UsrModificacion:usuarioI,
  fechaModificacion:Date,
  Estado:string,
  cedula:string,
  ambiente:number,
  emision:number,
}

export interface respuestaI {
  mensajeUsuario : string,
	mensajeTecnico : string,
	status : Object,
	data : Object,
}