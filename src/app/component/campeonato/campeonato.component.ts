import { Component, EventEmitter, Input, OnInit, Output,ViewChild } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CampeonatoService } from 'src/app/service/campeonato.service';
import { CategoriaService } from 'src/app/service/categoria.service';
import { UserService } from 'src/app/service/user.service';
import { RolesService } from 'src/app/service/roles.service';
import { SessionService } from 'src/app/service/session.service';
import { ValidacionService } from 'src/app/utils/validacion.service';

import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSelectChange } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';


export interface User {
  name: string;
}


@Component({
  selector: 'app-campeonato',
  templateUrl: './campeonato.component.html',
  styleUrls: ['./campeonato.component.css']
})
export class CampeonatoComponent implements OnInit {

  
  campeonatoT:Array<any>=[];
  lengt:number=0;

  
  campeonatoCat:CampeonatoCategoria= {
    id :0,
    campeonato:null,
    categorias:null,
  };
    //filter
  campFilter:CampeonatoFilter[]=[];
  //filterDictionary= new Map<string,string>();
  //defaultValue = "All";
  //camp: string[]=['All'];


  categoriaSe:any;
  usuarioSe:any;
  usuarioA:any;
  mostrar = false;
  rolesB:boolean=false;
  boolCategorias: boolean= false;


  //datable
  dataSource!:MatTableDataSource<CampeonatoTable>;
  // dataSourceFilters = new MatTableDataSource(this.campeonatoT);
  displayedColumns: string[] = ['id','nombre','lugar','logo','usuarios','fecha','acciones'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  
  //endDatatable


  constructor(private router: Router,
    private validadores: ValidacionService,
    private usuarioS: UserService,
    private rolesS: RolesService,
    private session:SessionService,
    private campeonato:CampeonatoService,
    private categorias:CategoriaService) {
        
      this.usuarioSe = this.session.get('usuario');
                
      this.campeonato.getVerCampeonato().subscribe((campeonatos:any)=>{
        this.campeonatoT=campeonatos;
        this.lengt=this.campeonatoT.length;
        for (let index = 0; index < this.campeonatoT.length; index++) {
          const campeonatoCat = this.campeonatoT[index];
          const arrayCategorias:Array<any> =[] ;
          campeonato.getCategoriaxEquipo(campeonatoCat).subscribe((
            (Campcategorias:any)=>{
              if(Campcategorias.length!=0)
              {
                this.boolCategorias = true;
                Campcategorias.forEach((campCat:any)=>{
                  arrayCategorias.push(campCat.categorias);
                })
                this.campeonatoT[index].categorias=arrayCategorias;
                this.campeonatoT[index].boolCategoria=this.boolCategorias;
              }
              else
              {
                this.boolCategorias = false;
                this.campeonatoT[index].boolCategoria=this.boolCategorias
              }
            }
          ));
        }

        //DataTable
        this.dataSource = new MatTableDataSource<CampeonatoTable>(this.campeonatoT);
        //DataTableEnd
      });
      this.usuarioA=JSON.parse(this.session.get('usuario'));
      this.rolesB=true;
      categorias.getVerCategoria().subscribe(
        (categoria:any)=>{
          this.categoriaSe=categoria;
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    //filterDataTable
    this.dataSource.filterPredicate = function (record:CampeonatoTable ,filter:string) {
      return record.nombre.toLocaleLowerCase() == filter.toLocaleLowerCase();
    }
  }

  //FilterTable
  applyFilter(event: Event) {
    
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }     
  
  eliminarCampeonato(id:any){

  }

  editarCampeonato(id:any){
    
  }

  verCampeonato(Campeonato:number){
    this.router.navigate(['/inscripcion/'+Campeonato]);
  }

  ingresoEquipos(Campeonato:number)
  {
    this.router.navigate(['/equipos/'+Campeonato]);
  }
  
  ingresoCategorias(campeonato:any){
    this.mostrar=true;
    this.campeonatoCat=campeonato;
  }
}

//Datatable
export interface CampeonatoTable {
  id:number;
  nombre:string;
  lugar:string;
  fechaInicio:Date;
  usuarios:usuario;
  categorias:Array<any>;
  logo:string;

}
//endDataTable
export interface usuario{
  apellido:String;
  cedula:String;
  correo:String;
  fechaNacimiento:Date;
  genero:String;
  nombre:String;
  usuario:String;
}


export interface CampeonatoCategoria{
  id:number;
  campeonato:any;
  categorias:any;
}


export interface CampeonatoFilter {
  nombre:string;
  options:string[];
  defaultValue:string;
}


//dataTable

