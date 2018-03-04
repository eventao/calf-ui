import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListTestPage } from './list-test';

@NgModule({
  declarations: [
    ListTestPage,
  ],
  imports: [
    IonicPageModule.forChild(ListTestPage),
  ],
})
export class ListTestPageModule {}
