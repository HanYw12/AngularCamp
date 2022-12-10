import { Component, OnInit } from '@angular/core';
import { CampeonatoService } from 'src/app/service/campeonato.service';
import { CampeonatoCategoria } from '../campeonato/campeonato.component';

@Component({
  selector: 'app-campeonatoedit',
  templateUrl: './campeonatoedit.component.html',
  styleUrls: ['./campeonatoedit.component.css']
})
export class CampeonatoeditComponent {

  usuarioSe:any;
  campeonatoCat:CampeonatoCategoria= {
    id :0,
    campeonato:null,
    categorias:null,
  };
  selectData: Array<ItemData> = [];
  arrayCampeonatoCat:Array<CampeonatoCategoria>=[];
  rolesB:boolean=false;


  constructor(    private campeonato:CampeonatoService) {}
  guardar(campeonato: any) {
    const usu= JSON.parse(this.usuarioSe);
    let organizador = usu.find(
      (obj:any)=>{
        return obj.roles.rol='Organizador';  
      }
    );
    if (organizador.length != 0){
      campeonato.value.usuarios=organizador.usuarios;
      this.campeonatoCat.campeonato=campeonato.value;

      if(this.selectData.length != 0)
      {
        this.selectData.forEach(element => {
          this.campeonatoCat.categorias=element;
          this.arrayCampeonatoCat.push(this.campeonatoCat);        
        });  
      }
      else
      {
        this.arrayCampeonatoCat.push(this.campeonatoCat);
      }     
      this.campeonato.postGuardarCampeonato(this.arrayCampeonatoCat).subscribe(
        (campeonatoS:any)=>{
          alert ("Campenato ingresado ");
        }
      );
    }  
    else
    {
      alert ("No tiene roles para realizar la funcion");  
    }
  }

}

export interface ItemData {
  id: number;
  descripcion: string;
  genero: string;
  nombre: string;
  selected:boolean;
}
