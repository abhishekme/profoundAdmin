import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import { ApiService } from '../services/config/api.service';
import { ConstantService } from '../services/config/constant.service';
import { UserModel } from "../models/userModel";
import { Router } from '@angular/router';

import { Subscription,} from 'rxjs';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ApiService, ConstantService, Ng4LoadingSpinnerService]
})
export class LoginComponent implements OnInit {

  private modeluser:  UserModel;
  private validEmail: boolean = false;
  private validPassword: boolean = false;
  private validLogin: any = {};
  private validationErrorShow = true;
  private subscriptionHandler: Subscription[] = [];
  constructor(public _constant: ConstantService, public _apiServ: ApiService, public _notif_service: NotificationsService, 
              public spinnerService: Ng4LoadingSpinnerService, public toastr: ToastrManager, public _router: Router) { }

  ngOnInit() {
    console.log('Login -> Token: ',sessionStorage.getItem('loginToken'));
    this.modeluser  = new UserModel();
    this.validLogin['validEmail'] = false;
    this.validLogin['validPassword'] = false;
    
  }
  ngDestroy(){
    this.subscriptionHandler.forEach(s => s.unsubscribe());
  }
  checkInput(inputParamas: string, modelInput: any){
    var resultValidInput = false;
    switch(inputParamas){
      case 'email':
      var patt = new RegExp("/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/");
      resultValidInput = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(modelInput);
      this.validLogin['validEmail'] = (resultValidInput) ? true : false;
      break;

      case 'password':
      resultValidInput = (modelInput == '') ? false : true;
      this.validLogin['validPassword'] = (resultValidInput) ? true : false;
      break;
    }
    return resultValidInput;
  }

  isValid(){
    if(!this.validLogin['validEmail'] == true || !this.validLogin['validPassword'] == true){
       return false;
    }
    return true;
  }

  submitLogin(){
    this.spinnerService = new Ng4LoadingSpinnerService();
    this.spinnerService.show();
    if(this.isValid()){
       this.subscriptionHandler.push(

        this._apiServ.createLogin(this.modeluser).subscribe(
          data => {
            if(data != undefined && data.record != undefined && data.authToken != undefined){
                this._apiServ.setLoginToken(data.authToken,data.record);
            }
            //let getToken = (window.atob(this._apiServ.getLoginToken())).toString().split('|');
            //let userId= window.atob(getToken[1]);
            this._router.navigate(['/admin/Dashboard']);
            //console.log('Get User Token...', getToken[0], ' :: ', userId);
          },
          err => {
            if(err.record != undefined && !err.status){
              let errorMessage: string    = (err.message != '') ? err.message : '';
              this.validationErrorShow    = false;
              //this.toastr.errorToastr(errorMessage, 'Database Error');
              this._notif_service.error(
                this._constant.database_error_label,
                errorMessage,
                {
                  timeOut: 2000,
                  showProgressBar: true,
                  pauseOnHover: false,
                  clickToClose: true,
                  maxLength: 50
                });
                setTimeout(() =>{
                  this.validationErrorShow = true;
                },2100);
            }
          },
        () => {
            console.log('HTTP request completed.')}
        ));

        // this._apiServ.createLogin(this.modeluser).subscribe(result => {
        //   //Do the needul
        //   console.log('API Response: ', result);
        //   let responseData  = result;
        //   if(responseData != undefined){
        //     if(responseData.error != undefined){
        //       alert('error');
        //     }
        //   }

        //   this.spinnerService.hide();
        // })

        //);
    }
    else{
      console.log('Login needed...');
      this._notif_service.error(
        this._constant.validation_error_label,
        this._constant.required_field_email_password_validation,
        {
          timeOut: 2000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: true,
          maxLength: 50
        });
    }
  }
}
