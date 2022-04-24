import { Component } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  value: number = 100;
  options: Options = {
    floor: 0,
    ceil: 200
  };
  minValue: number = 50;
  maxValue: number = 200;
  Options: Options = {
    floor: 18,
    ceil: 100,
  };
}
