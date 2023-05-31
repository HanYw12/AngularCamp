import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { empresaI } from 'src/app/service/empresa.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  myFormRegistro: FormGroup;

  constructor(private fb: FormBuilder,
    private router: Router,
    private usuarioS: UserService) {
    //Validaciones de Campos
    this.myFormRegistro = this.fb.group({
      nombre: ['', [Validators.required]],
      usuario: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      documento: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      contrasena: ['', [Validators.required]],
      //roles: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required]]
    });
  }

  guardar(usuario: any) {
    return this.usuarioS.postPersonaguardar(usuario).subscribe(
      (usu: any) => {
        if (usu != null) {
          this.usuarioS.Toast.fire({
            icon: 'success',
            title: "usuario creado",
            background: 'linear-gradient(#006992, #2E1760)' ,
          });                    
          this.router.navigate(['/login']);
        }
      },
      (error: any) => {
        this.usuarioS.Toast.fire({
          icon: 'error',
          title: error.error.mensajeTecnico,
          background: 'linear-gradient(#006992, #2E1760)' ,
        });

      }
    );
  }
}


export interface usuarioI {
  idUsuarios?: number,
  nombre: string,
  apellido: string,
  usuario:string,
  documento: string,
  contrasena: string,
  correo: string,
  fechaNacimiento: Date,
  establesimientoId:establesimientoI,
  direccion:string,
  telefono:string,
  celular:string,

}

export interface rolI {
  id: number,
  rol: string
}

export interface establesimientoI {
  id: number,
  nombre:string,
  empresaId: empresaI,
  codigo: string,
  direccion: string,
  estado: string,
}

export interface equipoI {
  id: number,
  nombre: string
}