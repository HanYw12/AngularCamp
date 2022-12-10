import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/app/service/categoria.service';
import { EquiposService } from 'src/app/service/equipos.service';
import { SessionService } from 'src/app/service/session.service';
import { ValidacionService } from 'src/app/utils/validacion.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
})
export class CategoriasComponent{
  usuarioA:any;
  usuarioE: any;
  usuarioT:any;
  mostrar = false;
  categoriaT:any;


  constructor(private fb: UntypedFormBuilder,
    private router: Router,
    private validadores: ValidacionService,
    private categoriaS:CategoriaService,
    private equipo:EquiposService,
    private session:SessionService) {
      this.categoriaS.getVerCategoria().subscribe(
        (categoria:any)=> {
          this.categoriaT=categoria
        }
        )

        this.usuarioA=JSON.parse(this.session.get('usuario'));
     }
    
    
    guardar(categoria: any) {
      this.categoriaS.postGuardarCategoria(categoria.value).subscribe(
        (categoria:any)=>{
          alert ("cateogira "+ categoria.nombre +" ingresada")
        }
      )      
    }
    verCategoria(categoria:number){
      console.log(categoria)
      this.router.navigate(['/inscripcion/'+categoria]);
    }
  
}
