import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmpresaService, productosI } from 'src/app/service/empresa.service';
import { SessionService } from 'src/app/service/session.service';
import { UserService } from 'src/app/service/user.service';
import { usuarioI } from '../registro/registro.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  iceParametros! : parametroDetI[];
  tipoProducto! : Array<any>;
  unidadMedida! : parametroDetI[];
  formaGuardar : FormGroup = {} as FormGroup;
  total! : number;
  usuarioSe:usuarioI;
  parametroDetIva: parametroDetI = {
    descripcion: 'TipoIva',
    estado: 'Activo',
    valor1: '',
    valor2: '',
    valor3: 'IvaEcuador',
    id:0,
    codigo:'',
    comentarios:'',
    parametroCab: {} as parametroCabI,
    fechaCreacion:new Date(),
    usrModificacion:'',
    fechaModificacion:''
  }

  Iva!:parametroDetI;
  boolNoObjetoIva:boolean = true;
  constructor(private empresaS:EmpresaService,
              private session:SessionService,
              private usuarioS: UserService,
              private fb : FormBuilder) { 
    this.usuarioSe = JSON.parse(this.session.get('usuario'));
                

      this.formaGuardar = this.fb.group({
        codigo: ['', [Validators.required]],
        auxCodigo: [''],
        producto: ['', [Validators.required]],
        unidadMedida: ['', [Validators.required]],
        cantidad: ['', [Validators.required]],
        valorUnitario: ['', [Validators.required]],
        fechaCaducidad: [''],
        tipoProducto: ['',[Validators.required]],
        noObjetoIva: [''],
        iva: [{value:'',disabled: false}],
        irbpnr: [{value:'',disabled: false}],
        ice: {value: {} as parametroDetI , disabled:false},
      });

    this.empresaS.getParametros('ice').subscribe(
      (parametros: any) => {
        this.iceParametros = parametros.data;
      },
      (error: any) => {
        this.usuarioS.Toast.fire({
          icon: 'error',
          title: error.error.mensajeUsuario,
          background: 'linear-gradient(#006992, #2E1760)' ,
        });
      }
    );

    this.empresaS.getParametros('UnidadesMedida').subscribe(
      (parametros: any) => {
        this.unidadMedida = parametros.data;
      },
      (error: any) => {
        this.usuarioS.Toast.fire({
          icon: 'error',
          title: error.error.mensajeUsuario,
          background: 'linear-gradient(#006992, #2E1760)' ,
        });
      }
    );

    this.empresaS.postParametrosxCriterios(this.parametroDetIva).subscribe(
      (parametros: any) => {
        this.Iva = parametros.data;
      },
      (error: any) => {
        this.usuarioS.Toast.fire({
          icon: 'error',
          title: error.mensajeUsuario,
          background: 'linear-gradient(#006992, #2E1760)' ,
        });
      }
    );
    

    this.empresaS.getParametros('TipoProducto').subscribe(
      (parametros: any) => {
        this.tipoProducto = parametros.data;
      },
      (error: any) => {
        this.usuarioS.Toast.fire({
          icon: 'error',
          title: error.error.mensajeUsuario,
          background: 'linear-gradient(#006992, #2E1760)' ,
        });
      }
    );              
  }

  ngOnInit(): void {
    
  }

  guardar(producto : productosI) {
    // var produ = producto;
    // produ.ice.id =  producto.value.ice;
    producto.empresaId = this.usuarioSe.establesimientoId.empresaId;
    this.empresaS.postProductos(producto).subscribe(
      (respuesta: any) => {
        this.usuarioS.Toast.fire({
          icon: 'success',
          title: respuesta.mensajeUsuario,
          background: 'linear-gradient(#006992, #2E1760)' ,
        });
      },
      (error: any) => {
        this.usuarioS.Toast.fire({
          icon: 'error',
          title: error.mensajeUsuario,
          background: 'linear-gradient(#006992, #2E1760)' ,
        });
      }
    );

  }

  calcularTotal(): void {
    const subtotalCal = this.formaGuardar.value.valorUnitario * this.formaGuardar.value.cantidad; 
    const esActivo = this.formaGuardar.value.iva;
    const objetoIva = this.formaGuardar.value.noObjetoIva;
    let ivaCal:number;
    let iceCal:number;
    this.total = subtotalCal;
    if(!objetoIva)
    {
      if(esActivo)
      {
        ivaCal = subtotalCal * (parseInt(this.Iva.valor1)/100);
        this.total += ivaCal; 
      }
      if(this.formaGuardar.value.ice.valor3 != null)
      {
        iceCal = subtotalCal * (parseInt(this.formaGuardar.value.ice.valor3)/100);
        this.total += iceCal; 
      } 
    }
    this.total = parseFloat(this.total.toFixed(2)); 
  }

  noObjetoIva(evento:any){
    if (!evento.target.checked) {
      this.boolNoObjetoIva = true;
      this.formaGuardar.get('ice')?.enable();
      this.formaGuardar.get('iva')?.enable();
      this.formaGuardar.get('irbpnr')?.enable();
    }else{
      this.boolNoObjetoIva = false;
      this.formaGuardar.get('ice')?.disable();
      this.formaGuardar.get('iva')?.disable();
      this.formaGuardar.get('irbpnr')?.disable();
    }
  }
}


export interface parametroDetI{
  id:number,
  codigo:string,
  descripcion:string,
  comentarios:string,
  parametroCab:parametroCabI,
  fechaCreacion:Date,
  usrModificacion:string,
  fechaModificacion:string,
  valor1:string,
  valor2:string,
  valor3:string,
  estado:string
}

export interface parametroCabI{
  id:number,
  descripcion:string,
  comentarios:string,
  usrCreacion:string,
  fechaCreacion:Date,
  usrModificacion:string,
  fechaModificacion:Date,
  estado:string
}
