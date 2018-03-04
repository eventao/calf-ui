import { Component } from '@angular/core';

/**
 * Generated class for the CalfListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'calf-list',
  templateUrl: 'calf-list.html'
})
export class CalfListComponent {

  text: string;

  constructor() {
    console.log('Hello CalfListComponent Component');
    this.text = 'Hello World';
  }

}
