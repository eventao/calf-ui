import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import * as zrender from 'zrender';

@IonicPage()
@Component({
  selector: 'page-list-test',
  templateUrl: 'list-test.html',
})
export class ListTestPage {
  indexes: Array<any>;
  indexGraphics: Array<any>;
  currentIndexGraphic: any;
  clientItemList = [];
  clientItemsGroup:any;
  draggingContentData = {
    point:{x:0,y:0},
    isDragging:false
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.mockData();
    setTimeout(() => {
      this.draw();
    }, 400)
  }

  mockData() {
    let takeIndex = -1;
    this.indexes = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'.split('');
    const b = Math.ceil(1000 / 27);
    for (let i = 0; i < 1000; i++) {
      let item = {
        groupName:"",
        name:""
      };
      if (i % b === 0) {
        takeIndex++;
        item.groupName = this.indexes[takeIndex];
      } else {
        if (i % 12 === 0){
          item.name = `${this.indexes[takeIndex]}--${i}`;
        }
      }
      if(item.groupName || item.name){
        this.clientItemList.push(item);
      }
    }
  }

  vw(v: number) {
    return window.innerWidth * v / 100;
  }

  drawIndex(zr) {
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
          text: index,
          textFill: '#000',
        }
      });
      zr.add(circle);
      cy += this.vw(5);
      return circle;
    });
    this.calculateAlphaIndex({x: 0, y: 0});
  }

  drawContact(zr) {
    let maxX = this.vw(95);
    let y = this.vw(15);
    let yGroup = this.vw(13);
    this.clientItemsGroup = new zrender.Group();
    this.clientItemsGroup.position[0] = 0;
    this.clientItemsGroup.position[1] = 0;
    this.clientItemList.forEach((item,i) => {
      let renderG = new zrender.Group();
      renderG.position[0] = 0;
      renderG.position[1] = y * i;
      let drawY,graphText;
      if(item.groupName){
        drawY = yGroup;
        graphText = item.groupName;
      }else{
        drawY = y;
        graphText = item.name;
      }
      let rect = new zrender.Rect({
        shape: {
          x: this.vw(0),
          y: this.vw(0),
          width:maxX,
          height:drawY
        },
        style:{
          fill:"#fff",
          text:graphText,
          textFill:"#333"
        }
      });
      let bottomBorder = new zrender.Line({
        shape:{
          x1:this.vw(0),
          y1:this.vw(14),
          x2:maxX,
          y2:this.vw(14)
        },
        style:{
          lineWidth:0.2
        }
      });
      renderG.add(rect);
      renderG.add(bottomBorder);
      this.clientItemsGroup.add(renderG);

    });
    zr.add(this.clientItemsGroup);
  }

  calculateAlphaIndex(p: { x: number, y: number }) {
    const itemHeight = this.vw(5);
    const index = Math.floor(p.y / itemHeight);
    if (index < 0 || index > this.indexGraphics.length - 1) return;
    if (this.currentIndexGraphic) {
      this.currentIndexGraphic.attr('style', {
        fill: 'none',
        textFill: '#000'
      });
    }
    this.currentIndexGraphic = this.indexGraphics[index];
    this.currentIndexGraphic.attr('style', {
      fill: '#f00',
      textFill: '#fff'
    });
  }

  draw() {
    const zr = zrender.init(document.querySelector('.render-wrapper'));
    const startData = {
      isIndexDown: false,
      point: {
        x: 0,
        y: 0
      }
    };
    zr.on('mousedown', e => {
      if (e.offsetX > this.vw(95)) {
        startData.isIndexDown = true;
        startData.point.x = e.offsetX;
        startData.point.y = e.offsetY;
        this.calculateAlphaIndex(startData.point);
      }else{
        this.draggingContentData.isDragging = true;
        this.draggingContentData.point = {x:e.offsetX,y:e.offsetY};
      }
    });
    zr.on('mousemove', e => {
      if (startData.isIndexDown) {
        startData.point.x = e.offsetX;
        startData.point.y = e.offsetY;
        this.calculateAlphaIndex(startData.point);
      }
      this.draggingContent(e);
    });
    zr.on('mouseup', e => {
      startData.isIndexDown = false;
      this.draggingContentData.isDragging = false;
    });

    setTimeout(() => {
      const canvas = document.querySelector('.render-wrapper canvas');
      canvas.addEventListener('swipe', e => {
        console.log('swipe');
      });
    },300);

    this.drawIndex(zr);
    this.drawContact(zr);
  }

  draggingContent(e){
    if(this.draggingContentData.isDragging){
      const subx = e.offsetY - this.draggingContentData.point.y;
      let sourceY = this.clientItemsGroup.position[1];
      let targetY = sourceY + subx;
      if(subx > 0 && targetY < 0){
        this.clientItemsGroup.attr('position',[0,sourceY + subx]);
      }
      if(subx < 0){
        this.clientItemsGroup.attr('position',[0,sourceY + subx]);
      }
      this.draggingContentData.point.x = e.offsetX;
      this.draggingContentData.point.y = e.offsetY;
    }

  }
}
