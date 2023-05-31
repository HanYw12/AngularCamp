import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  usuario : any;
  ocultar : boolean= false;
  constructor(private session : SessionService) { 
    this.usuario=JSON.parse(session.get("usuario"));
    if(this.usuario==null){
      this.ocultar=false
    }else{
      this.ocultar=true

    }

  }
  logout(){
    this.session.logout("usuario");
   }
  ngOnInit(): void {
  }

}
