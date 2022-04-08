import {Component, OnInit} from '@angular/core';
import {UsersService} from "../services/users.service";
import {ImageUploadService} from "../services/image-upload.service";
import {GlobalConstants} from "../common/global-constants";
import {MatSnackBar} from "@angular/material/snack-bar";

type Item = {
  position: number
  disabled: boolean
  empty: boolean
  url: string
}

@Component({
  selector: 'app-photo-chooser',
  templateUrl: './photo-chooser.component.html',
  styleUrls: ['./photo-chooser.component.scss']
})
export class PhotoChooserComponent implements OnInit {
  photos!: string[]
  items!: Item[]

  constructor(private usersService: UsersService, private fileUploadService: ImageUploadService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.photos = this.usersService.photos
    this.items = []
    for (let i = 0; i < 3; i++) {
      this.items.push({position: i, disabled: false, empty: true, url: ""})
    }
    this.updateItems()
  }

  updateItems(): void {
    for (let i = 0; i < 3; i++) {
      if (this.photos[i]) {
        this.items[i].disabled = false
        this.items[i].empty = false
        this.items[i].url = GlobalConstants.apiURL + 'images/' + this.photos[i]
      } else {
        this.items[i].empty = true
        this.items[i].url = ""
        this.items[i].disabled = i != 0 && this.items[i - 1].empty;
      }
    }
  }

  onDelete(id: number): void {
    let fileName = this.photos.splice(id, 1)[0]
    this.updateItems()
    this.fileUploadService.delete(fileName).subscribe({
        next: (v) => {
          console.log(v)
        },
        error: () => {
          console.log("Error trying to delete the file")
        }
      }
    )
  }

  onPositionChange(id: number, target: number): void {
    [this.photos[id], this.photos[target]] = [this.photos[target], this.photos[id]]
    this.updateItems()
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileUploadService.upload(file).subscribe({
          next: (v) => {
            this.photos.push(v.filename)
            this.updateItems()
          },
          error: () => {
            this.snackBar.open("Erreur lors de l'envoi du fichier", 'Fermer')
          }
        }
      )
    }
  }
}
