import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as zrender from 'zrender';

@IonicPage()
@Component({
  selector: 'page-list-test',
  templateUrl: 'list-test.html',
})
export class ListTestPage {
  indexes:Array<any>;
  clientItemList = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.mockData();
    setTimeout(() => {
      this.draw();
    },400)
  }

  mockData(){
    let takeIndex = -1;
    this.indexes = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'.split('');
    const b = Math.ceil(1000 / 27);
    for(let i = 0; i < 1000; i++){
      let item = {};
      if(i % b === 0){
        takeIndex++;
        item['groupName'] = this.indexes[takeIndex];
      }else{
        item['name'] = `${this.indexes[takeIndex]}--${i}`;
      }
      this.clientItemList.push(item);
    }
  }

  vw(v:number){
    return window.innerWidth * v / 100;
  }

  drawIndex(zr){
    let cy = this.vw(3);
    let alphaGraphics = this.indexes.map((index) => {
      const circle = new zrender.Circle({
        shape: {
          cx: this.vw(97),
          cy: cy,
          r: this.vw(2)
        },
        style: {
          fill: 'none',
          stroke: 'none',
          text:index,
          textFill:'#000',
        }
      });
      zr.add(circle);
      cy += this.vw(5);

      return circle;
    });
  }

  draw(){
    const zr = zrender.init(document.querySelector('.render-wrapper'));
    zr.on('mousedown',e => {
      console.log('mousedown');
    });
    zr.on('touchstart',e => {
      console.log('touchstart');
    });
    this.drawIndex(zr);
  }

}
