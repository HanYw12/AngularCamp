import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild  } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs';
import { onMainContentChange } from 'src/app/animations/animations';
import { SessionService } from 'src/app/service/session.service';
import { SidenavService } from 'src/app/service/sidenav.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations: [ onMainContentChange ]
})
export class MenuComponent {
  
  name = 'Angular';
  public onSideNavChange!: boolean;

  constructor(private _sidenavService: SidenavService,      
    private router: Router,
    private session: SessionService) {
      if (JSON.parse(session.get('usuario')) === null) {
        router.navigate(['/login']);
      } else {
        router.navigate(['/menu/factura']);
      }
    this._sidenavService.sideNavState$.subscribe( res => {
      console.log(res)
      this.onSideNavChange = res;
    })
  }

}


