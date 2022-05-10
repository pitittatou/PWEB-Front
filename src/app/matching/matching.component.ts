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
  imageUrlCenter!: string;
  imageUrlLeft!: string;
  imageUrlRight!: string;
  profession!: string;
  position!: string;
  description!: string;
  ngOnInit() {
    this.prenom = 'Jonas';
    this.age= 36;
    this.imageUrl='https://www.karnaval.fr/wp-content/uploads/2022/02/SoireeDUB_MLutz-9.jpg';
    this.imageUrlCenter='https://www.karnaval.fr/wp-content/uploads/2022/02/SoireeDUB_MLutz-9.jpg';
    this.imageUrlLeft='https://www.karnaval.fr/wp-content/uploads/2022/02/Karna-Dub-WM-AD-05.jpg';
    this.imageUrlRight='https://www.karnaval.fr/wp-content/uploads/2022/02/Karna-Dub-WM-AD-09.jpg';
    this.profession='patissier';
    this.position='Lyon';
    this.description='J apprécie particulierement les crepes au caramel';
  }

  onClickLeft(){
    if (this.imageUrl == this.imageUrlCenter){
      this.imageUrl=this.imageUrlLeft;
    }else if (this.imageUrl == this.imageUrlRight){
      this.imageUrl=this.imageUrlCenter;
    }else {
      this.imageUrl = this.imageUrlRight;
    }
  }

  onClickRight(){
    if (this.imageUrl == this.imageUrlCenter){
      this.imageUrl=this.imageUrlRight;
    }else if (this.imageUrl == this.imageUrlLeft){
      this.imageUrl=this.imageUrlCenter;
    }else{
      this.imageUrl=this.imageUrlLeft;
    }
  }
}
