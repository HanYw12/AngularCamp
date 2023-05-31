import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { empresaI } from 'src/app/service/empresa.service';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-ingresocliente',
  templateUrl: './ingresocliente.component.html',
  styleUrls: ['./ingresocliente.component.css']
})
export class IngresoclienteComponent {

  myFormRegistro: FormGroup;
  identificacion!:string;
  constructor(private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private usuarioS: UserService) {
    //Validaciones de Campos
    this.identificacion = data;
    this.myFormRegistro = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      documento: [this.identificacion, [Validators.required]],
      correo: ['', [Validators.required]],
      direccion: ['', [Validators.required]]
    });
  }

  guardar(usuario: any) {
    return this.usuarioS.postClienteguardar(usuario).subscribe(
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
