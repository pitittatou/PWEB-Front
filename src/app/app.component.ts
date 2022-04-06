import {Component, OnInit} from '@angular/core';
import {Maching} from "./models/maching.models";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'PWEB-Front';
  matchs!: Maching[];
  ngOnInit() {
    this.matchs = [
      {
        prenom: 'Julie',
        nom: 'Breuil',
        imageUrl: 'https://www.karnaval.fr/wp-content/uploads/2022/02/SoireeDUB_MLutz-9.jpg',
        profession: 'choooooomage',
        position: 'quelque part dans Villeurbanne',
        description: 'J apprécie particulierement les crepes au caramel',
      },
      {
        prenom: 'Alex',
        nom: 'Duroy',
        imageUrl: 'https://www.karnaval.fr/wp-content/uploads/2022/02/Karna-Marmite-WM-AD-28.jpg',
        profession: 'jongleur',
        position: 'Dieulefit',
        description: 'Il y a eu un kouak organisationnel de type majeur',
      },
      {
        prenom: 'Sapristi',
        nom: 'Nolala',
        imageUrl: 'https://www.karnaval.fr/wp-content/uploads/2022/02/Karna-BalFolk-WM-AD-03.jpg',
        profession: 'Monteur de chapchapchap',
        position: 'Sur la pelouse des Humanités',
        description: 'Ceci dit, je ne suis pas sûr que cela soit important',
      },

    ]
  }
}

/*export class AppComponent implements OnInit{
  faceSnaps!: FaceSnap[];
  ngOnInit() {
    this.faceSnaps = [
      {
        title: 'Archibald',
        description: 'Mon meilleur ami depuis tout petit !',
        imageUrl: 'https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg',
        createdDate: new Date(),
        snaps: 0,
        location: 'Paris'
      },
      {
        title: 'Karnakorale',
        description: 'Je vous le dis',
        imageUrl: 'https://www.karnaval.fr/wp-content/uploads/2022/02/DSC_8683-scaled.jpg',
        createdDate: new Date(),
        snaps: 6,
        location: 'chapiteau du Karna'
      },
      {
        title: 'Karnadahl',
        description: 'Miam',
        imageUrl: 'https://www.karnaval.fr/wp-content/uploads/2022/03/karnadahl.jpg',
        createdDate: new Date(),
        snaps: 160
      },
    ]
  }
}*/
