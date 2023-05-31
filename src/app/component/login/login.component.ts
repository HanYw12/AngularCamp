import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/service/session.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';
// import { usuarioI } from '../registro/registro.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    constructor(
    private Usuario: UserService,
    private router: Router,
    private session: SessionService) {
    if (JSON.parse(session.get('usuario')) === null) {
      router.navigate(['/login']);
    } else {
      router.navigate(['/menu/factura']);
    }
  }

  ingresar(usuario: NgForm) {
    this.Usuario.postVerificar(usuario).subscribe((usuarioS: any) => {
      console.log(usuarioS);
      if (usuarioS.data.length == 0) {
        this.Usuario.Toast.fire({
          icon: 'error',
          title: usuarioS.mensajeUsuario ,
          background: 'linear-gradient(#006992, #2E1760)' ,
        });
      } else {
        this.session.login('usuario', usuarioS.data[0].usuarios);
        this.Usuario.Toast.fire({
          icon: 'success',
          title: 'Bienvenido '+usuarioS.data[0].usuarios.usuario,
          background: 'linear-gradient(#006992, #2E1760)' ,
        });
        this.router.navigate(['/menu']);
      }
    });
  }
}
