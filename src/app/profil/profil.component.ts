import { Component } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent{

  constructor() { }
  title = 'PWEB-Front';
  value: number = 100;
  options: Options = {
    floor: 0,
    ceil: 200
  };
  minValue: number = 50;
  maxValue: number = 200;
  Options: Options = {
    floor: 0,
    ceil: 100,
  };
  

}
