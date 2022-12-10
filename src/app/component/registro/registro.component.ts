import { JsonPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form, UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RolesService } from 'src/app/service/roles.service';
import { UserService } from 'src/app/service/user.service';
import { ValidacionService } from 'src/app/utils/validacion.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  usuarioE: any;
  rolesSe: any;
  usuarioT:any;
  usu:any;
  mostrar = false;

  constructor(private fb: UntypedFormBuilder,
    private router: Router,
    private validadores: ValidacionService,
    private usuarioS: UserService,
    private rolesS: RolesService) {

    this.rolesS.getRoles().subscribe(
      (roles: any) => {
        this.rolesSe = roles;
      }
    )

  }

  guardar(usuario: any) {
    this.usu={
      usuarios : usuario.value,
      roles : usuario.value.roles
    }
    console.log(this.usu);
      return this.usuarioS.postPersonaguardar(this.usu).subscribe(
         (usu:any)=>{
           if(usu!=null){
             alert("usuario creado");
             this.router.navigate(['/login']);
           }
        },
        (error:any)=>{
          alert(error.error.mensajeTecnico);
        }
        );
    
  }





}


export interface usuarioI {
  id?: number,
  nombre: string,
  apellido: string,
  cedula: string,
  contrasena: string,
  correo: string,
  fechaNacimiento: Date,
  rol: rolI,
  equipo?: equipoI
}

export interface rolI {
  id: number,
  rol: string
}

export interface equipoI {
  id: number,
  nombre: string
}