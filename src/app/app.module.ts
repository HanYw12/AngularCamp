import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'; 

import { MatSelectModule } from '@angular/material/select';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule  } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule} from '@angular/material/stepper';
import { MatInputModule} from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatCardModule } from '@angular/material/card';

 
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './component/navbar/navbar.component';
import { LoginComponent } from './component/login/login.component';
import { FormsModule } from '@angular/forms';
import { CampeonatoComponent } from './component/campeonato/campeonato.component';
import { RegistroComponent } from './component/registro/registro.component';
import { EquipoComponent } from './component/equipo/equipo.component';
import { EquiposComponent } from './component/equipos/equipos.component';
import { CategoriasComponent } from './component/categorias/categorias.component';

// NGX Multi Select
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

// Material modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectComponent } from './component/select/select.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { SelectPadreComponent } from './component/select-padre/select-padre.component';
import { RouterModule } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatSortModule } from '@angular/material/sort';
import { CampeonatoeditComponent } from './component/campeonatoedit/campeonatoedit.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    CampeonatoComponent,
    RegistroComponent,
    EquipoComponent,
    EquiposComponent,
    CategoriasComponent,
    SelectComponent,
    SelectPadreComponent,
    CampeonatoeditComponent,
  ],
  imports: [

    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    MatAutocompleteModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSidenavModule,

    ScrollingModule,

    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatSelectModule,


    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
