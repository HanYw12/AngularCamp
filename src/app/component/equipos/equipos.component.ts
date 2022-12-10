import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CampeonatoequipoService } from 'src/app/service/campeonatoequipo.service';
import { EquiposService } from 'src/app/service/equipos.service';
import { RolesService } from 'src/app/service/roles.service';
import { SessionService } from 'src/app/service/session.service';
import { UserService } from 'src/app/service/user.service';
import { ValidacionService } from 'src/app/utils/validacion.service';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html'
})
export class EquiposComponent {
  usuarioA: any;
  usuarioSe:any;
  usuarioE: any;
  categoriaS: any;
  usuarioT: any;
  mostrar = false;
  equiposT: any;
  equipoSe:any;
  equipojugador:any;
  equipoGrid:any=[];
  equipoGrid2:any=[];
  num:number=1;
  equipo2:any = {};
  idCampeonato:any;
  equipoCampeonato:any=[];

  constructor(private fb: UntypedFormBuilder,
    private router: Router,
    private validadores: ValidacionService,
    private usuarioS: UserService,
    private equipo: EquiposService,
    private campeonatoEquipoS: CampeonatoequipoService,
    private session: SessionService,
    private route:ActivatedRoute) 
    {
    this.idCampeonato=this.route.snapshot.paramMap.get('idCamponato'); 
    this.usuarioA = this.session.get('usuario');

    this.equipo.getEquipos().subscribe(
      (equipo: any) => {
        this.equiposT = equipo;
      }
    )

    this.usuarioS.getPersonas().subscribe(
      (usuario:any)=>{
        this.usuarioSe=usuario
      }
    )

    this.equipo.getCategoria().subscribe(
      (categoria: any) => {
        this.categoriaS = categoria;
      }
    )

  }

  agregarEquipo($event:any,equipo:number)
  {
    if($event.target.checked)
    {
      this.equipoCampeonato.push(equipo);
    }else
    {
      this.equipoCampeonato = this.equipoCampeonato.filter( (e:any) => e !=equipo);
    }   
  }

  agregarEquiposaCampeonato()
  {
    console.log(this.equipoCampeonato);
    this.campeonatoEquipoS.postGuardarCampeonato(this.equipoCampeonato,this.idCampeonato).subscribe(
      ()=>
      {
        alert("Equipos Ingresados");
      }
    )
        
  }


  guardarGrid() {
    
    this.equipo2.id=this.num;
    this.equipoGrid.push(this.equipo2);
    this.num++;
    this.equipo2={};
    // return this.equipo.postGuardarEquipo(equipo.value).subscribe(
    //   (equipo:any)=>{
    //       alert("Equipo Ingresado")
    //   }
    // );
  }

  eliminarEquipo(equipo: number)
  {
    if(this.equipoGrid.length==1)
    {
      this.equipoGrid = this.equipoGrid.filter( (e:any) => e.id !=equipo);
      this.num=1;
    }else
    {
      this.equipoGrid = this.equipoGrid.filter( (e:any) => e.id !=equipo);
    }
  }

  
  guardar(equipo: any) {
    return this.equipo.postGuardarEquipo(equipo.value).subscribe(
      (equipo:any)=>{
          alert("Equipo Ingresado")
      }
    );
  }

  verEquipo(equipo: number) {
    this.router.navigate(['/equipo/'+equipo]);
  }

  verIngresarJugador(equipo:any){
    this.mostrar=true;
    this.equipoSe=equipo;
  }

  guardarJugador(jugador:any){
    this.equipojugador=jugador.value
    this.equipojugador.usuarios=jugador.value.usuario;
    this.equipojugador.equipo=this.equipoSe;
    console.log(this.equipojugador)
    this.equipo.postGuardarEquipoUsuario(this.equipojugador).subscribe(
      (equipousu:any)=>{
        console.log(equipousu.data)
        alert("el jugador"+equipousu.data.usuario.nombre+" "+ equipousu.data.usuario.apellido+" a sido ingresado al equipo "+equipousu.data.equipo.nombre);
        
      },
      (error:any)=>{
        alert(error.error.mensajeTecnico);
      }
    )

  }

}

