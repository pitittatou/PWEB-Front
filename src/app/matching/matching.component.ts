import {Component, OnInit} from '@angular/core';
import {user} from "../models/model_user";


@Component({
  selector: 'app-matching',
  templateUrl: './matching.component.html',
  styleUrls: ['./matching.component.scss']
})

export class MatchingComponent implements OnInit{
  monUser!: user[];
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
    ]
  }

  onClickLeft(){
    if (this.monUser[0].imageUrl == this.monUser[0].imageUrlCenter){
      this.monUser[0].imageUrl=this.monUser[0].imageUrlLeft;
    }else if (this.monUser[0].imageUrl == this.monUser[0].imageUrlRight){
      this.monUser[0].imageUrl=this.monUser[0].imageUrlCenter;
    }else {
      this.monUser[0].imageUrl = this.monUser[0].imageUrlRight;
    }
  }

  onClickRight(){
    if (this.monUser[0].imageUrl == this.monUser[0].imageUrlCenter){
      this.monUser[0].imageUrl=this.monUser[0].imageUrlRight;
    }else if (this.monUser[0].imageUrl == this.monUser[0].imageUrlLeft){
      this.monUser[0].imageUrl=this.monUser[0].imageUrlCenter;
    }else{
      this.monUser[0].imageUrl=this.monUser[0].imageUrlLeft;
    }
  }
}
