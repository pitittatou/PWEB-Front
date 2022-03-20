import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  urls: string[] = [
    "https://resize.prod.docfr.doc-media.fr/s/1200/img/var/doctissimo/storage/images/fr/www/beaute/diaporamas/carre-ondule/2843585-1-fre-FR/25-carres-ondules-a-adopter.jpg",
    "https://www.anthropics.com/portraitpro/img/page-images/homepage/v22/what-can-it-do-2A.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/f/fb/Large_cloud_over_Mexican_landscape.jpg"
  ]
}
