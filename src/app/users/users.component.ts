import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/config/api.service';
import { ConstantService } from '../services/config/constant.service';
import { PagerService } from '../services/paging/pager.service';
import { Subscription} from 'rxjs';
import { NotificationsService } from 'angular2-notifications';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { UserModel } from "../models/userModel";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers:[ApiService, ConstantService, NotificationsService, PagerService, Ng4LoadingSpinnerService]
})
export class UsersComponent implements OnInit {
  private subscriptionHandler: Subscription[] = [];
  private modelUser:  UserModel;
  private userRecord:any  = [];
  public searchUser:any = [];

  private totalPerson     = 0;
  private totalPages      = 0;
  private limitAdmin      = 0;
  private skipLimit       = 0;
  private pageNum         = 1;
  private postBody        = {};

  public pagedItems: any;
  public pagedGItems: any;

  constructor(public _constant: ConstantService, public _apiServ: ApiService, public spinnerService: Ng4LoadingSpinnerService,
              public _notif_service: NotificationsService, private objPager: PagerService) {  }

  ngDestroy(){
    this.subscriptionHandler.forEach(s => s.unsubscribe());
  }
  createPages(totalPages){
    let items = [];
    for (var i = 0; i <= totalPages; i++) {
       this.pagedItems.push({val:i});
    }
  }

  clearSearchPerson(){
    this.searchUser.key = '';
    this.loadUserList();
  }

  searchPerson(modelInput){
    var searchValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(modelInput);
    if(!searchValidEmail){
      this._notif_service.error(
        this._constant.validation_error_label,
        this._constant.valid_email,
        {
          timeOut: 2000,
          showProgressBar: false,
          pauseOnHover: false,
          clickToClose: true,
          maxLength: 50
        });
    }else{
      //Call list with Search String
      this.getListData(this.skipLimit, this.limitAdmin,modelInput);
    }
  }

  getListData(pageNum:number=0, limitNum:number=this.limitAdmin, srchKey?:string){
    this.pageNum            = (parseInt(pageNum.toString()) == 0 ? 1 : parseInt(pageNum.toString()));
    this.postBody['skip']   = (this.pageNum == 1) ? 0 : this.pageNum;
    this.postBody['limit']  = this.limitAdmin;
    if(srchKey != undefined && srchKey != ''){
      this.postBody['srchKey']  = srchKey;
    }

    console.log('Get list -> pageNum: ', this.pageNum);

    this.subscriptionHandler.push(
      this._apiServ.getPersonList(this.postBody)
    .subscribe(
        data => {
          this.userRecord = data.record;                      
          //Get Pager services
          if(srchKey != undefined && srchKey != ''){
            this.totalPages   = Math.ceil(data.totalRecord/this.limitAdmin);;
          }
          let pagesItems      = this.objPager.getPagesArray(this.totalPages, 2, pageNum);
          this.pagedGItems    = pagesItems;

          console.log('Get list -> pageNum: 1', this.pageNum);

          console.log('Pagination records: ', this.pagedGItems);
          this.spinnerService.hide();
        }))
        
  }

  ngOnInit() {
    this.modelUser = new UserModel();
    this.loadUserList();
  }

  loadUserList(){
    this.limitAdmin         = this._constant.LIMIT_ADMIN; 
    this.pagedItems         = [];
    this.pagedGItems        = [];
    this.postBody           = {};
    this.postBody['skip']   = this.skipLimit;
    this.postBody['limit']  = this.limitAdmin;
    this.spinnerService.show();
    this.subscriptionHandler.push(
        this._apiServ.getPersonTotal()
      .subscribe(
          data => {
            let result: any;
            this.totalPerson  = data.record.COUNT_RECORD;
            this.totalPages   = Math.ceil(this.totalPerson/this.limitAdmin);
            this.createPages(this.totalPages);
            //Get Pager services
            // let pagesItems      = this.objPager.getPagesArray(this.totalPages, 2, 1);
            // this.pagedGItems    = pagesItems;
            console.log('Total Person: ', this.totalPerson, " :: ",this.totalPages);
            if(this.totalPerson){
              this.subscriptionHandler.push(
                this._apiServ.getPersonList(this.postBody)
              .subscribe(
                  data => {
                    this.userRecord = data.record;
                    console.log('Total Record: ',this.userRecord);
                    if(this.totalPerson > this._constant.LIMIT_ADMIN){
                      //Get Pager services
                      let pagesItems      = this.objPager.getPagesArray(this.totalPages, 2, 1);
                      this.pagedGItems    = pagesItems;
                    }                   

                    this.getListData(this.skipLimit, this.limitAdmin);
                  }))
            }
          })
    );
    console.log('Total Get Person: ', this.totalPerson, " :: ",this.totalPages);
  }

}
