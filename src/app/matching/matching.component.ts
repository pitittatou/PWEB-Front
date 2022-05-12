import {Component, OnInit} from '@angular/core';
import {user} from "../models/model_user";


@Component({
  selector: 'app-matching',
  templateUrl: './matching.component.html',
  styleUrls: ['./matching.component.scss']
})

export class MatchingComponent implements OnInit{
  monUser!: user[];
  i!:number;
  ngOnInit() {
    this.monUser=[
      {
        prenom : 'Jonas',
        age: 36,
        imageUrl:'https://www.karnaval.fr/wp-content/uploads/2022/02/SoireeDUB_MLutz-9.jpg',
        imageUrlCenter:'https://www.karnaval.fr/wp-content/uploads/2022/02/SoireeDUB_MLutz-9.jpg',
        imageUrlLeft:'https://www.karnaval.fr/wp-content/uploads/2022/02/Karna-Dub-WM-AD-05.jpg',
        imageUrlRight:'https://www.karnaval.fr/wp-content/uploads/2022/02/Karna-Dub-WM-AD-09.jpg',
        profession:'patissier',
        position:'Lyon',
        description:'J apprécie particulierement les crepes au caramel'
      },
      {
        prenom : 'Elektruka',
        age: 32,
        imageUrl:'https://www.karnaval.fr/wp-content/uploads/2022/04/Karna_Bal_Folk_PLeCorre-69.jpg',
        imageUrlCenter:'https://www.karnaval.fr/wp-content/uploads/2022/04/Karna_Bal_Folk_PLeCorre-69.jpg',
        imageUrlLeft:'https://www.karnaval.fr/wp-content/uploads/2022/04/Karna_Bal_Folk_PLeCorre-64.jpg',
        imageUrlRight:'https://www.karnaval.fr/wp-content/uploads/2022/04/Karna_Bal_Folk_PLeCorre-62.jpg',
        profession:'accordeoniste',
        position:'Pelouse des Humas',
        description:'J accompagne le public à la sortie'
      }
    ];
    this.i=0;
  }

  onClickLeft(){
    console.log("J'ai cliqué sur le bouton de gauche");
    if (this.monUser[this.i].imageUrl == this.monUser[this.i].imageUrlCenter){
      this.monUser[this.i].imageUrl=this.monUser[this.i].imageUrlLeft;
    }else if (this.monUser[this.i].imageUrl == this.monUser[this.i].imageUrlRight){
      this.monUser[this.i].imageUrl=this.monUser[this.i].imageUrlCenter;
    }else {
      this.monUser[this.i].imageUrl = this.monUser[this.i].imageUrlRight;
    }
  }

  onClickRight(){
    console.log("J'ai cliqué sur le bouton de droite");
    if (this.monUser[this.i].imageUrl == this.monUser[this.i].imageUrlCenter){
      this.monUser[this.i].imageUrl=this.monUser[this.i].imageUrlRight;
    }else if (this.monUser[this.i].imageUrl == this.monUser[this.i].imageUrlLeft){
      this.monUser[this.i].imageUrl=this.monUser[this.i].imageUrlCenter;
    }else{
      this.monUser[this.i].imageUrl=this.monUser[this.i].imageUrlLeft;
    }
  }

  onClickNext(){
    console.log("J'ai cliqué sur le bouton pour voir le prochain profil");
    if (this.monUser.length-1 <= this.i+1){
      this.i=this.i+1;
    }
  }

  onClickBefore(){
    if (this.i - 1 >= 0) {
      this.i = this.i - 1;
    }
  }
}
