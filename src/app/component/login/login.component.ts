import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/service/session.service';
import { UserService } from 'src/app/service/user.service';
// import { usuarioI } from '../registro/registro.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private persona: UserService,
    private router: Router,
    private session: SessionService) {
    // if (JSON.parse(session.get('usuario')) === null) {
    //   router.navigate(['/login']);
    // } else {
    //   router.navigate(['/equipos']);
    // }
  }

    ingresar(usuario: NgForm) {
      this.persona.postVerificar(usuario).subscribe((usuarioS: any ) => {
        // this.persona.postOrganizador(usuarioS).subscribe((rolesS:any)=>{
        // console.log(rolesS);
          if(usuarioS==null){
            this.router.navigate(['/login']);
            alert("usuario o contraseña Incorrecto")
          }else{
            this.session.login('usuario',usuarioS);
            alert("Bienvenido")
            this.router.navigate(['/campeonato']);
          }
        // });
      });
    }

    registro(){
      this.router.navigate(['/registro']);
    }

  
}
