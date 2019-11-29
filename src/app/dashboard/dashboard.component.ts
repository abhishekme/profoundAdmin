import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ApiService } from '../services/config/api.service';
import { ConstantService } from '../services/config/constant.service';
import { Subscription,forkJoin} from 'rxjs';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [ApiService, ConstantService]
})
export class DashboardComponent implements OnInit {
  private subscriptionHandler: Subscription[] = [];
  private userTotal: number = 0;
  private awardTotal: number = 0;
  private employmentTotal: number = 0;
  private personTotal: number = 0;
  private dashboardCountCalls: any = [];
  constructor(public _constant: ConstantService, public _apiServ: ApiService, public _notif_service: NotificationsService,) { }

  ngDestroy(){
    this.subscriptionHandler.forEach(s => s.unsubscribe());
  }
  ngOnInit() {

    this.dashboardCountCalls  = [
      this._apiServ.getDashboardCount('user'),
      this._apiServ.getDashboardCount('award'),
      this._apiServ.getDashboardCount('employ'),
      this._apiServ.getDashboardCount('person')
    ];
    this._notif_service.info(
      this._constant.database_notification_label,
      'Loading Data...',
      {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        maxLength: 50
      });
    this.subscriptionHandler.push(
      forkJoin(this.dashboardCountCalls)
      .subscribe(
          data => {
            let result: any;
            result = data;
            if(result != undefined && result.length > 0){
                this.userTotal        = result[0].record.COUNT_RECORD;
                this.awardTotal       = result[1].record.COUNT_RECORD;
                this.employmentTotal  = result[2].record.COUNT_RECORD;
                this.personTotal      = result[3].record.COUNT_RECORD;
            }
             console.log('Dashboard Count: ', data);
          })
    );

    /*this._apiServ.getUserCount().subscribe(
      data => {
        console.log('Record: ', data.record);
        if(data != undefined && data.record != undefined ){
            this.userTotalCount = data.record.COUNT_USER;
        }
      },
      err => {
        if(err.record != undefined && !err.status){
          let errorMessage: string    = (err.message != '') ? err.message : '';
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
        }
      },
      () => {
        console.log('HTTP request completed.')
      }
    );*/
  }


}
