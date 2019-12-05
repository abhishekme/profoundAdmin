import { Component, OnInit } from '@angular/core';
import { ConstantService } from '../../services/config/constant.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  providers: [ConstantService]
})
export class FooterComponent implements OnInit {

  constructor(public _constant: ConstantService) { }

  ngOnInit() {
  }

}
