import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  public EditID: number;
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
      console.log('Calling Edit...');
      //Get Route Param ID
      this.route.params.subscribe(params => {

        if(params['id'] == undefined || isNaN(params['id']))
            this.router.navigate(['/admin/Users']);

        this.EditID = +params['id']; // (+) converts string 'id' to a number
        console.log('Edit ID: ',this.EditID);
        //pageNum = +params['page'];
        //srchkey = this.route.snapshot.params['srchkey'];      
        //this.thisPageNum = pageNum;
        //this.editPage  = pageNum;
        //this.srchKey   = srchkey;
        // this.objUserServ.adminUserEdit(editId).subscribe(
        //       data => {
        //         this.editData = data;
        //         this.userModel = data.record[0];
        //       });
        // });
    })
}

}
