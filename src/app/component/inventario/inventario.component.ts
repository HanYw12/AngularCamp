import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EmpresaService, productosI } from 'src/app/service/empresa.service';
import { SessionService } from 'src/app/service/session.service';
import { UserService } from 'src/app/service/user.service';
import { usuarioI } from '../registro/registro.component';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  dataSource!:MatTableDataSource<any>;
  usuarioSe:usuarioI;

  displayedColumns: string[] = ['codigo','descripcionProducto', 'costo',  'precio', 'unidadAlmacen', 'cantidadMinima', 'utilidad', 'facturarSinExistencia', 'impuestos', 'categoria', 'nombreBodega', 'codigoFabricante', 'impuestoVentas', 'impuestoCompras', 'nroSeries', 'unidadVenta', 'unidadCompra', 'equivalenciaCompra', 'ubicacion'];
  
  prod:any[] =[];// [{codigo: 1231321201321, descripcionProducto: 'Producto 1', precio: 20000, costo: 5, unidadAlmacen: 'unidad', cantidadMinima: 5, utilidad: 50, facturarSinExistencia: false, impuestos: 'IVA', categoria: 'Electrónica', nombreBodega: 'Bodega 1', codigoFabricante: 'FAB-001', impuestoVentas: 0.19, impuestoCompras: 0.10, nroSeries: 0, unidadVenta: 'unidad', unidadCompra: 'unidad', equivalenciaCompra: 1, ubicacion: 'A1-01'}];

  constructor(
    private session:SessionService,
    private usuarioS: UserService,
    private empresaS:EmpresaService,
  ) 
  {  
    this.usuarioSe = JSON.parse(this.session.get('usuario'));
    console.log(this.usuarioSe);

    this.empresaS.postInventario(this.usuarioSe.establesimientoId.empresaId).subscribe(
      async (parametros: any) => {
        console.log(await parametros);
        // this.prod = parametros.data;
        let newProd = parametros.data.map(
          (element : productosI) => 
          {
            return {
            codigo :             element.codigo,
            descripcionProducto : element.producto, 
            precio:               element.valorUnitario, 
            costo: 5, 
            unidadAlmacen: 'unidad', 
            cantidadMinima: 5, 
            utilidad: 50, 
            facturarSinExistencia: false, 
            impuestos: 'IVA', 
            categoria: 'Electrónica',
            nombreBodega: 'Bodega 1', 
            codigoFabricante: 'FAB-001', 
            impuestoVentas: 0.19, 
            impuestoCompras: 0.10, 
            nroSeries: 0, 
            unidadVenta: 'unidad', 
            unidadCompra: 'unidad', 
            equivalenciaCompra: 1, 
            ubicacion: 'A1-01'
          }})
          this.dataSource = new MatTableDataSource(newProd);
          // this.prod.push(newProd);

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

}
