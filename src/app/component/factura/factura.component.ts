import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/service/session.service';
import { establesimientoI, usuarioI } from '../registro/registro.component';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { ValidacionService } from 'src/app/utils/validacion.service';
import {
  empresaI,
  EmpresaService,
  productosI,
} from 'src/app/service/empresa.service';
import { Observable } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { IngresoclienteComponent } from '../ingresocliente/ingresocliente.component';
import { parametroCabI, parametroDetI } from '../productos/productos.component';
import { DocumentosService } from 'src/app/service/documentos.service';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css'],
  providers: [DatePipe],
})
export class FacturaComponent {
  usuarioS: usuarioI;

  identificacionCli!: string;
  cliente!: string;
  objCliente: usuarioI = {} as usuarioI;
  boolIce: boolean = false;
  intIce: number = 0;
  boolIRBPNR: boolean = false;
  Iva!: parametroDetI;
  parametroDetIva: parametroDetI = {
    descripcion: 'TipoIva',
    estado: 'Activo',
    valor1: '',
    valor2: '',
    valor3: 'IvaEcuador',
    id: 0,
    codigo: '',
    comentarios: '',
    parametroCab: {} as parametroCabI,
    fechaCreacion: new Date(),
    usrModificacion: '',
    fechaModificacion: '',
  };

  objDetalleFactura: descFactI = {
    idDocumentoDet: 0,
    documentoCabId: {} as factI,
    productoId: {} as productosI,
    cantidad: 0,
    codigo: '',
    precio: 0,
    subTotal:0,
    iva: 0,
    ice: 0,
    irbpnr: 0,
    descuento: 0,
    valorTotal: 0,
    observacionDetalle: '',
    fechaCreacion: ''
  };
  objDetallesFactura: descFactI[] = [];
  objFactura: factI = {
    establesimientoId: {} as establesimientoI,
    idDocumento: 0,
    clienteId: {} as usuarioI,
    tipoDocumentoId: {} as documentoI,
    usrCreacion: '',
    numeroSRI: '',
    subTotal: 0,
    iva: 0,
    subTotalIva12: 0,
    subTotalIva0: 0,
    subTotalIce: 0,
    noObjetoIvaTotal: 0,
    descuento: 0,
    valorTotal: 0,
    propina: 0,
    formaPago: {} as parametroDetI,
    fechaCreacion: '',
    fechaEnvio: '',
    observacion: '',
    numeroAutorizacion: '',
    estado: '',
    referenciaId: {} as factI,
  };
  intNewDetalle: number = 0;
  giaRemicion!: string;
  currentDate: Date = new Date();
  // objDetalleFactura : descFactI = {}as descFactI;
  productos = [] as productosI[];
  formaPago!: parametroDetI[];

  constructor(
    private session: SessionService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private userS: UserService,
    private validacionS: ValidacionService,
    private empresaS: EmpresaService,
    private documentoS: DocumentosService,
    private datePipe: DatePipe
  ) {
    this.usuarioS = JSON.parse(this.session.get('usuario'));
    this.empresaS.getParametros('FormaPago').subscribe(
      (parametros: any) => {
        this.formaPago = parametros.data;
      },
      (error: any) => {
        this.userS.Toast.fire({
          icon: 'error',
          title: error.error.mensajeUsuario,
          background: 'linear-gradient(#006992, #2E1760)',
        });
      }
    );

    this.empresaS.postParametrosxCriterios(this.parametroDetIva).subscribe(
      (parametros: any) => {
        this.Iva = parametros.data;
      },
      (error: any) => {
        this.userS.Toast.fire({
          icon: 'error',
          title: error.mensajeUsuario,
          background: 'linear-gradient(#006992, #2E1760)',
        });
      }
    );
  }

  openDialog(): void {
    const htmlCode = this.identificacionCli;
    const dialogRef = this.dialog.open(IngresoclienteComponent, {
      data: htmlCode,
      height: '500px',
      width: '800px',
      panelClass: 'claseDialog',
    });
    dialogRef.afterClosed().subscribe((res) => {
      console.log(res);
    });
  }

  buscarCliente() {
    if (this.identificacionCli != null) {
      return this.userS.getCliente(this.identificacionCli).subscribe(
        (usu: any) => {
          if (usu.data != null) {
            this.validacionS.Toast.fire({
              icon: 'success',
              title: 'Cliente agregado con exito',
              background: 'linear-gradient(#006992, #2E1760)',
            });
            this.objCliente = usu.data;
          } else {
            this.validacionS.Toast.fire({
              icon: 'error',
              title: usu.mensajeUsuario,
              background: 'linear-gradient(#006992, #2E1760)',
            });
            this.objCliente = {} as usuarioI;
            this.openDialog();
          }
        },
        (error: any) => {
          this.validacionS.Toast.fire({
            icon: 'error',
            title: error.error.mensajeUsuario,
            background: 'linear-gradient(#006992, #2E1760)',
          });
          this.openDialog();
        }
      );
    } else {
      return this.validacionS.Toast.fire({
        icon: 'error',
        title: 'Ingrese la identificacion',
        background: 'linear-gradient(#006992, #2E1760)',
      });
    }
  }

  agregarDetalle() {
    const ultimoDet = this.objDetallesFactura.length;
    if (ultimoDet != 0) {
      if (this.objDetallesFactura[ultimoDet - 1].productoId.idProducto == null) {
        this.validacionS.Toast.fire({
          icon: 'error',
          title: 'Ingrese producto',
          background: 'linear-gradient(#006992, #2E1760)',
        });
        return;
      }
    }
    this.objDetalleFactura.idDocumentoDet = this.intNewDetalle;
    this.objDetallesFactura.push(this.objDetalleFactura);
    this.intNewDetalle++;
    this.objDetalleFactura = {
      idDocumentoDet: 0,
      documentoCabId: {} as factI,
      productoId: {} as productosI,
      cantidad: 0,
      codigo: '',
      precio: 0,
      subTotal:0,
      iva: 0,
      ice: 0,
      irbpnr: 0,
      descuento: 0,
      valorTotal: 0,
      observacionDetalle: '',
      fechaCreacion: ''
    };
  }
  eliminarDetalle(id: any) {
    if (this.objDetallesFactura.length == 1) {
      this.objDetallesFactura = [] as descFactI[];
      this.intNewDetalle = 0;
    }
    this.objDetallesFactura = this.objDetallesFactura.filter(
      (detalle) => detalle.idDocumentoDet !== id
    );
    this.calculoTotal();
  }

  agregarProducto(detalleId: any) {
    let objProducto: productosI = {} as productosI;
    const Detalle: any = this.objDetallesFactura.find(
      (detalle) => detalle.idDocumentoDet === detalleId
    );
    objProducto.empresaId = this.usuarioS.establesimientoId.empresaId;
    objProducto.producto = Detalle.productoId.producto;
    //busca el producto
    this.empresaS.postProductoPorDetalle(objProducto).subscribe(
      (res) => {
        if (res.data != null) {
          const prods: productosI[] = Object.values(res.data);
          this.productos = prods;
        } else {
          this.validacionS.Toast.fire({
            icon: 'error',
            title: 'No se econtraron productos',
            background: 'linear-gradient(#006992, #2E1760)',
          });
          this.productos = [] as productosI[];
        }
      },
      (error: any) => {
        console.log(error.mensajeTecnico);
        this.validacionS.Toast.fire({
          icon: 'error',
          title: 'Problemas al buscar los productos',
          background: 'linear-gradient(#006992, #2E1760)',
        });
        this.productos = [] as productosI[];
      }
    );
  }

  seleccionarProd(id: any, producto: productosI) {
    this.objDetalleFactura.productoId = producto;
    this.objDetallesFactura[id].productoId = this.objDetalleFactura.productoId;
    //     const detallesFiltrados = this.objDetallesFactura.filter((detalle) => detalle.producto.codigo === producto.codigo);
    // // const Detalle1 : any =  this.objDetallesFactura.find(detalle => detalle.producto.codigo === (event.target as HTMLInputElement).value);
    // if(detallesFiltrados.length > 0){
    //   this.objDetallesFactura[detallesFiltrados[0].id].cantidad +=1;
    //   this.eliminarDetalle(id);
    //   return;
    // }
    this.objDetalleFactura = {
      idDocumentoDet: 0,
      documentoCabId: {} as factI,
      productoId: {} as productosI,
      cantidad: 0,
      codigo: '',
      precio: 0,
      subTotal:0,
      iva: 0,
      ice: 0,
      irbpnr: 0,
      descuento: 0,
      valorTotal: 0,
      observacionDetalle: '',
      fechaCreacion: ''
    };
    this.productos = [] as productosI[];
  }
  //calcula el valor total de la factura
  calculoTotal() {
    const propina = this.objFactura.propina;
    this.objFactura = {
      idDocumento: 0,
      establesimientoId:{} as establesimientoI,
      clienteId: {} as usuarioI,
      tipoDocumentoId: {} as documentoI,
      usrCreacion: '',
      numeroSRI: '',
      subTotal: 0,
      iva: 0,
      subTotalIva12: 0,
      subTotalIva0: 0,
      subTotalIce: 0,
      noObjetoIvaTotal: 0,
      descuento: 0,
      valorTotal: 0,
      propina: 0,
      formaPago: {} as parametroDetI,
      fechaCreacion: '',
      fechaEnvio: '',
      observacion: '',
      numeroAutorizacion: '',
      estado: '',
      referenciaId: {} as factI,
    };
    this.objDetallesFactura.forEach((obj: descFactI) => {
      if (obj.cantidad != null && obj.productoId.valorUnitario != null) {
        this.objDetallesFactura[obj.idDocumentoDet].precio = obj.productoId.valorUnitario;    
        if (obj.productoId.noObjetoIva) {
          this.objDetallesFactura[obj.idDocumentoDet].subTotal =
            obj.cantidad * obj.productoId.valorUnitario;
          this.objDetallesFactura[obj.idDocumentoDet].valorTotal = obj.subTotal;
          this.objFactura.noObjetoIvaTotal += obj.subTotal;
        } else {
          if (obj.productoId.iva) {
            this.objDetallesFactura[obj.idDocumentoDet].subTotal =
              obj.cantidad * obj.productoId.valorUnitario;
            this.objDetallesFactura[obj.idDocumentoDet].iva =
              obj.subTotal * (parseFloat(this.Iva.valor1) / 100);
            this.objDetallesFactura[obj.idDocumentoDet].valorTotal =
              this.objDetallesFactura[obj.idDocumentoDet].subTotal +
              this.objDetallesFactura[obj.idDocumentoDet].iva;
            this.objFactura.subTotalIva12 +=
              this.objDetallesFactura[obj.idDocumentoDet].subTotal;
          } else {
            this.objDetallesFactura[obj.idDocumentoDet].subTotal =
              obj.cantidad * obj.productoId.valorUnitario;
            this.objDetallesFactura[obj.idDocumentoDet].valorTotal = obj.subTotal;
            this.objFactura.subTotalIva0 +=
              this.objDetallesFactura[obj.idDocumentoDet].subTotal;
          }
          if (obj.productoId.ice) {
            this.intIce = parseFloat(obj.productoId.ice.valor3);
            this.boolIce = true;
            this.objDetallesFactura[obj.idDocumentoDet].ice = obj.subTotal / (1 / (parseFloat(obj.productoId.ice.valor3) / 100));
            this.objFactura.subTotalIce += this.objDetallesFactura[obj.idDocumentoDet].ice;
            this.objDetallesFactura[obj.idDocumentoDet].valorTotal +=
              this.objFactura.subTotalIce;
          } else {
            this.boolIce = false;
          }
        }

        this.objFactura.subTotal += obj.cantidad * obj.productoId.valorUnitario;
      }

      this.objFactura.descuento += obj.descuento;
      this.objFactura.iva += obj.iva;
      this.objFactura.valorTotal += obj.valorTotal;
    });
    this.objFactura.valorTotal += propina;
  }

  agregarProductoCod(event: KeyboardEvent, detalleId: number) {
    if (event.key === 'Tab') {
      const detallesFiltrados = this.objDetallesFactura.filter(
        (detalle) =>
          detalle.productoId.codigo === (event.target as HTMLInputElement).value
      );
      // const Detalle1 : any =  this.objDetallesFactura.find(detalle => detalle.producto.codigo === (event.target as HTMLInputElement).value);
      if (detallesFiltrados.length > 1) {
        this.objDetallesFactura[detallesFiltrados[0].idDocumentoDet].cantidad += 1;
        return;
      }
      let objProducto: productosI = {} as productosI;
      const Detalle: any = this.objDetallesFactura.find(
        (detalle) => detalle.idDocumentoDet === detalleId
      );
      objProducto.empresaId = this.usuarioS.establesimientoId.empresaId;
      objProducto.codigo = Detalle.producto.codigo;
      if (!objProducto.codigo) {
        this.validacionS.Toast.fire({
          icon: 'error',
          title: 'Ingrese codigo o producto',
          background: 'linear-gradient(#006992, #2E1760)',
        });
        return;
      }
      //busca el producto
      this.empresaS.postProductoPorDetalle(objProducto).subscribe(
        (res) => {
          const prods: productosI[] = Object.values(res.data);
          if (res.data != null && prods.length == 1) {
            this.objDetallesFactura[detalleId].productoId = prods[0];
            this.objDetallesFactura[detalleId].cantidad = 1;
            this.calculoTotal();
          } else {
            this.validacionS.Toast.fire({
              icon: 'error',
              title: 'No se econtro el producto con el codigo ingresado',
              background: 'linear-gradient(#006992, #2E1760)',
            });
            this.objDetallesFactura[detalleId].productoId = {} as productosI;
          }
        },
        (error: any) => {
          console.log(error.mensajeTecnico);
          this.validacionS.Toast.fire({
            icon: 'error',
            title: 'Problemas al buscar los productos',
            background: 'linear-gradient(#006992, #2E1760)',
          });
          this.productos = [] as productosI[];
        }
      );
    }
  }

  generarFactura() {
    let strMessage :String ='';
    if(this.objDetallesFactura.length !=0 && this.objFactura.formaPago != null && this.objCliente!=null)
    {
      this.objFactura.fechaCreacion = ''+new Date().toLocaleDateString('es-EC');;
      this.objFactura.fechaEnvio = ''+new Date().toLocaleDateString('es-EC');
      this.objFactura.clienteId = this.objCliente;
      this.objFactura.tipoDocumentoId.codigoTipoDocumento = 'fact';
      this.objFactura.usrCreacion = this.usuarioS.usuario;
      this.objFactura.establesimientoId = this.usuarioS.establesimientoId;
      this.objDetallesFactura[0].documentoCabId = this.objFactura;
      
      this.objDetallesFactura.forEach(element => {
          if(element.cantidad == 0){
            strMessage += 'tiene que agregar cantidad al producto ' + element.productoId.producto ;
          }        
      });
      if(strMessage=='')
      {
        // let data = {
        //   factDets  :this.objDetallesFactura ,
        //   impuestos : null
        // };
        this.documentoS.postDocumentoContable( this.objDetallesFactura).subscribe(
          (parametros: any) => {
            this.userS.Toast.fire({
              icon: 'success',
              title: parametros.mensajeUsuario,
              background: 'linear-gradient(#006992, #2E1760)',
            });
            console.log(parametros.data);
          },
          (error: any) => {
            this.userS.Toast.fire({
              icon: 'error',
              title: error.error.mensajeUsuario,
              background: 'linear-gradient(#006992, #2E1760)',
            });
          }
        );
      }else{
        this.userS.Toast.fire({
          icon: 'error',
          title: strMessage,
          background: 'linear-gradient(#006992, #2E1760)',
        }); 
      }     
    }else{
      if(this.objDetallesFactura.length ==0)
      {
        strMessage += 'Tiene que ingresar los productos<br>';
      }
      if(this.objFactura.formaPago.id == 0  || this.objFactura.formaPago.id == undefined) 
      {
        strMessage += 'Tiene que ingresar la forma de pago<br>';
      }
      if(this.objCliente.idUsuarios== 0|| this.objCliente.idUsuarios==undefined)
      {
        strMessage += 'Tiene que ingresar el cliente<br>';
      }
      this.userS.Toast.fire({
        icon: 'error',
        title: 'Tiene datos Pendientes: <br>'+strMessage,
        background: 'linear-gradient(#006992, #2E1760)',
      }); 
    }
  }

  imprimir() {
    let ventana = window.open('', '', 'height=500,width=500');
    ventana!.document.write(document.getElementById('factura')!.innerHTML);
    ventana!.print();
    ventana!.close();
  }
}

export interface descFactI {
  idDocumentoDet: number;
  documentoCabId: factI;
  productoId: productosI;
  cantidad: number;
  codigo: string;
  precio: number;
  subTotal:number;
  iva: number;
  ice: number;
  irbpnr: number;
  descuento: number;
  valorTotal: number;
  observacionDetalle: string;
  fechaCreacion: string;
}

export interface factI {
  idDocumento: number;
  clienteId: usuarioI;
  tipoDocumentoId: documentoI;
  usrCreacion: string;
  numeroSRI: string;
  subTotal: number;
  iva: number;
  subTotalIva12: number;
  subTotalIva0: number;
  subTotalIce: number;
  noObjetoIvaTotal: number;
  descuento: number;
  valorTotal: number;
  propina: number;
  formaPago: parametroDetI;
  fechaCreacion: string;
  fechaEnvio: string;
  observacion: string;
  numeroAutorizacion: string;
  estado: string;
  establesimientoId: establesimientoI,
  referenciaId: factI;
}

export interface documentoI {
  idDocumento: number;
  nombreTipoDocumeto: string;
  codigoTipoDocumento: string;
  codigoTipoComprobanteSri: string;
}

export interface documentoDetImpI {
  idInfoDocuContImp: number,
  infoDocumentoContableDetId: descFactI,
  infoParameDet: parametroDetI,
  porcentaje: number,
  valorImpuesto: number,
  usrCreacion: string,
  fechaCreacion:string,
  usrUltModificacion: string,
  fechaUltModificacion:string
}

