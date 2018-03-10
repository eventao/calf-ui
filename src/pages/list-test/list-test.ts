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
  indexGraphics:Array<any>;
  currentIndexGraphic:any;
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
    this.indexGraphics = this.indexes.map((index) => {
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
    this.calculateAlphaIndex({x:0,y:0});
  }

  calculateAlphaIndex(p:{x:number,y:number}){
    const itemHeight = this.vw(5);
    const index = Math.floor(p.y / itemHeight);
    if(index < 0 || index > this.indexGraphics.length - 1)return;
    if(this.currentIndexGraphic){
      this.currentIndexGraphic.attr('style', {
        fill:'none',
        textFill:'#000'
      });
    }
    this.currentIndexGraphic = this.indexGraphics[index];
    this.currentIndexGraphic.attr('style', {
      fill:'#f00',
      textFill:'#fff'
    });

  }

  draw(){
    const zr = zrender.init(document.querySelector('.render-wrapper'));
    const startData = {
      isIndexDown:false,
      point:{
        x:0,
        y:0
      }
    };
    zr.on('mousedown',e => {
      if(e.offsetX > this.vw(95)){
        startData.isIndexDown = true;
        startData.point.x = e.offsetX;
        startData.point.y = e.offsetY;
        this.calculateAlphaIndex(startData.point);
      }
    });
    zr.on('mousemove',e => {
      if(startData.isIndexDown){
        startData.point.x = e.offsetX;
        startData.point.y = e.offsetY;
        this.calculateAlphaIndex(startData.point);
      }
    });
    zr.on('mouseup',e => {
      startData.isIndexDown = false;
    });
    this.drawIndex(zr);
  }

}
