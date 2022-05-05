import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-matching',
  templateUrl: './matching.component.html',
  styleUrls: ['./matching.component.scss']
})
export class MatchingComponent implements OnInit{
  prenom!: string;
  age!: number;
  imageUrl!: string;
  profession!: string;
  position!: string;
  description!: string;
  ngOnInit() {
    this.prenom = 'Jonas';
    this.age= 36;
    this.imageUrl='https://www.karnaval.fr/wp-content/uploads/2022/02/SoireeDUB_MLutz-9.jpg';
    this.profession='patissier';
    this.position='Lyon'
    this.description='J apprécie particulierement les crepes au caramel';
  }
}
