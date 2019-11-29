import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/config/api.service';

import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  providers:[ApiService]
})
export class LayoutComponent implements OnInit {
  public userToken: string;
  public loading:boolean = false;
  constructor(private apiServ: ApiService, public router: Router) {


    

    // this.router.events.subscribe((event: Event) => {
    //   switch (true) {
    //     case event instanceof NavigationStart: {
    //       this.loading = true;
    //       break;
    //     }

    //     case event instanceof NavigationEnd:
    //     case event instanceof NavigationCancel:
    //     case event instanceof NavigationError: {
    //       this.loading = false;
    //       break;
    //     }
    //     default: {
    //       break;
    //     }
    //   }
    // });

   }

  ngOnInit() {

     this.userToken   = (this.apiServ.getLoginToken()) != null ? this.apiServ.getLoginToken() : null;
     console.log('Layout -> Token: ',this.userToken);
  }

}
