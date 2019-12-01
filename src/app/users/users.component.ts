import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/config/api.service';
import { ConstantService } from '../services/config/constant.service';
import { Subscription} from 'rxjs';
import { NotificationsService } from 'angular2-notifications';
import { UserModel } from "../models/userModel";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers:[ApiService, ConstantService, NotificationsService]
})
export class UsersComponent implements OnInit {
  private subscriptionHandler: Subscription[] = [];
  private modelUser:  UserModel;
  private userRecord:any = []
  constructor(public _constant: ConstantService, public _apiServ: ApiService, public _notif_service: NotificationsService,) {  }

  ngDestroy(){
    this.subscriptionHandler.forEach(s => s.unsubscribe());
  }
  ngOnInit() {
    this.modelUser = new UserModel();
    this._apiServ.getUser();
    this.subscriptionHandler.push(
      this._apiServ.getUser()
      .subscribe(
          data => {
            let result: any;
            this.userRecord = data.record;
            
             console.log('User List: ', this.userRecord);
          })
    );
  }
  loadUser(){
    
  }

}
