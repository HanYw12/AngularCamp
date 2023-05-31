import { Component, OnInit } from '@angular/core';
import { animateText, onSideNavChange } from 'src/app/animations/animations';
import { SessionService } from 'src/app/service/session.service';
import { SidenavService } from 'src/app/service/sidenav.service';
import { UserService } from 'src/app/service/user.service';

interface Page {
  link: string;
  name: string;
  icon: string;
}

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css'],
  animations: [onSideNavChange, animateText]
})
export class LeftMenuComponent implements OnInit {

  public sideNavState: boolean = false;
  public linkText: boolean = false;
  public pages!: Page[] ;

  // public pages: Page[] = [
  //   {name: 'Inbox', link:'/menu/campeonato', icon: 'inbox'},
  //   {name: 'Starred', link:'some-link', icon: 'star'},
  //   {name: 'Send email', link:'some-link', icon: 'send'},
  // ]

  constructor(
      private _sidenavService: SidenavService,
      private userS : UserService,) {
        userS.getFuncionalidades().subscribe(
          (funcionalidades:any)=>{
            this.pages=funcionalidades;
          }
        );

  }

  ngOnInit() {
  }

  onSinenavToggle() {
    this.sideNavState = !this.sideNavState
    
    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 200)
    this._sidenavService.sideNavState$.next(this.sideNavState)
  }

}
