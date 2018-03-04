import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { zrender} from 'zrender';

@IonicPage()
@Component({
  selector: 'page-list-test',
  templateUrl: 'list-test.html',
})
export class ListTestPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
