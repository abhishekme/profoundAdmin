import { Component, OnInit } from '@angular/core';
import { ConstantService } from '../../services/config/constant.service';
import { Router} from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers:  [ConstantService]
})
export class SidebarComponent implements OnInit {
  public _activeRoute: string = '';
  constructor(public _constant:ConstantService, public _router: Router) { 
  }

  ngOnInit() {
  }

}
