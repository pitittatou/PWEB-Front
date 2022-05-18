import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProfilService } from '../services/Profil.service';
import { NgForm } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';




interface attirance {
  name: string;
  selected: boolean;
}




export class UserForm {
  constructor(
    public gender: string,
    public description: String,
    public rayon: number,
    public trancheAge: number[],
    public attirance: string[]

){}
}

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent  {
  Data!:any
  Gender =["Homme","Femme","Autre"]
  formrControl= new FormControl('', [Validators.required])
  attirances = [
     <attirance> {name: "Homme", selected: false},
     <attirance> {name: "Femme", selected: false},
     <attirance> {name: "Autre", selected: false}
   ]

  model= new UserForm("Femme","Ici mettre une description",1,[18,100], ["Homme"])

  constructor(
    public ProfilService: ProfilService,
    ) {}

  
  

  onChange(id: number, isChecked: boolean) {
   this.attirances[id].selected = isChecked

  }

  Enregistrer(){
    console.log("début fonction enregistrer")
    for (let i=0; i<this.attirances.length-1;i++){
      if(this.attirances[i].selected == true){
        this.model.attirance.push(this.attirances[i].name)
      }
    }
    const postbody= this.model
    
    this.ProfilService.getData(postbody).subscribe(data => {this.Data=data});
     console.log(postbody);
     console.log(this.model.trancheAge[0],this.model.trancheAge[1])
  }
  
 
  value: number = 100;
  options: Options = {
    floor: 1,
    ceil: 200
  };
  minValue: number = 50;
  maxValue: number = 200;
  Options: Options = {
    floor: 18,
    ceil: 100,
  };
  
}
