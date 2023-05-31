import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { empresaI, EmpresaService } from 'src/app/service/empresa.service';
import { SessionService } from 'src/app/service/session.service';
import { ValidacionService } from 'src/app/utils/validacion.service';
import { usuarioI } from '../registro/registro.component';


@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent {

  myFormRegistro: FormGroup;
  usuarioS: usuarioI;
  representante!: usuarioI;

  constructor(private fb: FormBuilder,
    private empresaS: EmpresaService,   
    private session: SessionService,
    private validacionS : ValidacionService) {
    //Validaciones de Campos
    this.usuarioS = this.session.get('usuario');
    this.myFormRegistro = this.fb.group({
      nombre: ['', [Validators.required]],
      usuario: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      cedula: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      contrasena: ['', [Validators.required]],
      //roles: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required]]
    });
  }
  guardar(empresa: empresaI) {
    return this.empresaS.postGuardarEmpresa(empresa).subscribe(
      (usu: any) => {
        if (usu != null) {
          this.validacionS.Toast.fire({
            icon: 'success',
            title: "Empresa creada con exito",
            background: 'linear-gradient(#006992, #2E1760)' ,
          });                    
        }
      },
      (error: any) => {
        this.validacionS.Toast.fire({
          icon: 'error',
          title: error.error.mensajeUsuario,
          background: 'linear-gradient(#006992, #2E1760)' ,
        });

      }
    );
  }

}
