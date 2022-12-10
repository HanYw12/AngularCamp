import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampeonatoComponent } from './component/campeonato/campeonato.component';
import { CategoriasComponent } from './component/categorias/categorias.component';
import { EquipoComponent } from './component/equipo/equipo.component';
import { EquiposComponent } from './component/equipos/equipos.component';
import { LoginComponent } from './component/login/login.component';
import { RegistroComponent } from './component/registro/registro.component';
import { SelectPadreComponent } from './component/select-padre/select-padre.component';
import { SelectComponent } from './component/select/select.component';
import { UserService } from './service/user.service';

const routes: Routes = [
  { path: 'login', component:LoginComponent },
  { path: 'usuario', component:UserService },
  { path: 'registro', component:RegistroComponent },
  { path: 'equipo/:idEquipo', component:EquipoComponent },
  { path: 'equipos/:idCampeonato', component:EquiposComponent },
  { path: 'campeonato', component:CampeonatoComponent },
  { path: 'inscripciones', component:CampeonatoComponent },
  { path: 'categorias', component:CategoriasComponent},
  { path: 'select', component:SelectComponent},
  { path: 'selectPa', component:SelectPadreComponent},
  // {path: 'inscripcion/:idCampeonato', component:InscripcionComponent },
  {path:'**',pathMatch:'full',redirectTo:'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
