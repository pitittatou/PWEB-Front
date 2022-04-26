import { Component } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent{
  Genre!:{
    type:String,
      required:true
  }
  Attirance!:{
      type:String,
      required:true        
  }
  Rayon!:{
      type: Number,
      required:true
  }
  TrancheAge!:{
      type:Array<number>,
      required:true
  }
  Description!:String
  Enregistrer(){
    
  }
  constructor() { }
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
