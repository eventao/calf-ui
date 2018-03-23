import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as Clusterize from 'clusterize.js';


@IonicPage()
@Component({
  selector: 'page-list-test',
  templateUrl: 'list-test.html',
})
export class ListTestPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    let aRows1 = [];
    for (let  i=1; i<5001; ++i) {
      aRows1.push(
        `<div class="row">
          <div class="column">
            <img class="avatar" src="../assets/imgs/logo.png" />
          </div>
          <div class="column">input</div>
          <div class="column">input</div>
          <div class="column">input</div>
          <div class="column">input</div>
        </div>`
      );
    }
    let clusterize1 = new Clusterize({
      rows: aRows1,
      scrollId: 'scrollArea',
      contentId: 'contentArea'
    });

    console.log('clusterize1',clusterize1);
  }

}
