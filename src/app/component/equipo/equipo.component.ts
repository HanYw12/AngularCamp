import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EquiposService } from 'src/app/service/equipos.service';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html'
})
export class EquipoComponent {
  idEquipo:any;
  jugadores:any;

  constructor(private route:ActivatedRoute,
              private equipo:EquiposService) {
      this.idEquipo=this.route.snapshot.paramMap.get('idEquipo');
      
      equipo.getEquipoUsuario(this.idEquipo).subscribe(
        (usuarios:any)=>{
            this.jugadores=usuarios;
        }
      )
   }

}
