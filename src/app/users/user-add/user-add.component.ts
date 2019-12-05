import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NotificationsService } from 'angular2-notifications';
import { ApiService } from '../../services/config/api.service';
import { ConstantService } from '../../services/config/constant.service';
import { UserModel } from "../../models/userModel";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss'],
  providers: [NotificationsService, ApiService, ConstantService, Ng4LoadingSpinnerService ]
})
export class UserAddComponent implements OnInit {

  private userModel:  UserModel;
  public validationErrorShow: boolean = true;
  constructor(public _constant: ConstantService, public _apiServ: ApiService, public _spinnerLoader: Ng4LoadingSpinnerService, 
              public _notif_service: NotificationsService, public _toaster: ToastrManager) {  }

  ngOnInit() {     
  //this._toaster.errorToastr('Records Modified', 'Success!');
  // Reset All toaster currently showing
  //this._toaster.dismissAllToastr();
  this.userModel  = new UserModel();
  }

  isValid(){
    if(!this._constant.checkInput('email',this.userModel.email) || !this._constant.checkInput('onlyName',this.userModel.firstName) 
        || !this._constant.checkInput('onlyName',this.userModel.lastName) || !this._constant.checkInput('blank',this.userModel.speciality)
        || !this._constant.checkInput('blank',this.userModel.bio) || !this._constant.checkInput('blank',this.userModel.cognitoUserName)
        || !this._constant.checkInput('password',this.userModel.password)){
       return false;
    }
    return true;
  }

  submitUser(){
    this._spinnerLoader = new Ng4LoadingSpinnerService();
    this._spinnerLoader.show();
    if(this.isValid()){
      console.log('submitting form...');
      
    }else{
      console.log('Validation error...');
      this.validationErrorShow  = false;
      this._notif_service.error(
        this._constant.validation_error_label,
        this._constant.enterRequiredField,
        {
          timeOut: 1500,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: true,
          maxLength: 50
        });
        setTimeout(() =>{
          this.validationErrorShow = true;
        },1600);
    }
  }


}
