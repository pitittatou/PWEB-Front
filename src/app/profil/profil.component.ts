import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  Data!:any
  gender!: String[]
  genderControl!: FormControl 
  attirances!: attirance[]
  constructor(public ProfilService: ProfilService) {}

  ngOnInit(): void {
    this.gender =["Homme","Femme","Autre"]
    this.genderControl= new FormControl('', [Validators.required])
    this.attirances = [
        <attirance> {name: 'Homme', selected: false},
        <attirance> {name: 'Femme', selected: false},
        <attirance> {name: 'Autre', selected: false}
      ]
  }

  onChange(id: number, isChecked: boolean) {
   this.attirances[id].selected = isChecked

  }

  Enregistrer(descriptionForm:NgForm){
    //document.getElementById('add-Profil-form')?.click();
    console.log("début fonction enregistrer")
    let drive:string[]=[]
    for (let i=0; i<this.attirances.length-1;i++){
      if(this.attirances[i].selected == true){
        drive.push(this.attirances[i].name)
      }
    }
    const postbody={
      Description:descriptionForm.value.Description, 
      Genre: this.genderControl.value,
      Attirance: drive
      
      //homme:descriptionForm.value.Homme
    }; 
    this.ProfilService.getData(postbody).subscribe(data => {this.Data=data});
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
