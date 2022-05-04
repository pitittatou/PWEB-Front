import { Component } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProfilService } from '../services/Profil.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent{
  Description!:any 

  constructor(public ProfilService: ProfilService) { }

  Enregistrer(descriptionForm:NgForm){
    document.getElementById('add-Profil-form')?.click();
    const postbody={
      description:descriptionForm.value.Description, 
    }; 
    this.ProfilService.getData(postbody).subscribe(data => {this.Description=data});
     console.log(postbody);
  }
  
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
