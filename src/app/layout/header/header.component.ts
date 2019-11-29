import { Component, OnInit } from '@angular/core';
import { ConstantService } from '../../services/config/constant.service'
import { ApiService } from '../../services/config/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers:  [ConstantService, ApiService]
})
export class HeaderComponent implements OnInit {

  constructor(public _constant:ConstantService, public _apiServ: ApiService, public _router: Router) { }

  ngOnInit() {
  }

  logoutSystem(){
    let getToken = (window.atob(this._apiServ.getLoginToken())).toString();
    if(getToken != ''){
      this._apiServ.clearLoginToken();
      this._router.navigate(['/admin/Login']);
    }
  }
}
