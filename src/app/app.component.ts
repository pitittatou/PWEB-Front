import {Component, OnInit} from '@angular/core';
import {Matching} from "./models/matching.models";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  //title = 'PWEB-Front';
  matchs!: Matching[];
  ngOnInit() {
    this.matchs = [
      {
        prenom: 'Soiree',
        nom: 'DUB',
        imageUrl: 'https://www.karnaval.fr/wp-content/uploads/2022/02/SoireeDUB_MLutz-9.jpg',
        profession: 'choooooomage',
        position: 'quelque part dans Villeurbanne',
        description: 'J apprécie particulierement les crepes au caramel',
      },
      {
        prenom: 'Marmite',
        nom: 'La foliiiie',
        imageUrl: 'https://www.karnaval.fr/wp-content/uploads/2022/02/Karna-Marmite-WM-AD-28.jpg',
        profession: 'jongleur',
        position: 'Dieulefit',
        description: 'Il y a eu un kouak organisationnel de type majeur',
      },
      {
        prenom: 'RLK',
        nom: 'chapiteaui',
        imageUrl: 'https://www.karnaval.fr/wp-content/uploads/2022/02/Karna-BalFolk-WM-AD-03.jpg',
        profession: 'Monteur de chapchapchap',
        position: 'Sur la pelouse des Humanités',
        description: 'Ceci dit, je ne suis pas sûr que cela soit important',
      },
    ]
  }
}
