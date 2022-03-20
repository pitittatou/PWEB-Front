import { Component, OnInit } from '@angular/core';
import {UsersService} from "../services/users.service";

type Item = {
  position: number
  disabled: boolean
  empty: boolean
  url: string
}

@Component({
  selector: 'app-photo-chooser',
  templateUrl: './photo-chooser.component.html',
  styleUrls: ['./photo-chooser.component.css']
})
export class PhotoChooserComponent implements OnInit {
  urls!: string[]
  items!: Item[]

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.urls = this.usersService.urls
    this.items = []
    for (let i = 0; i < 3; i++) {
      this.items.push({position: i, disabled: false, empty: true, url: ""})
    }
    this.updateItems()
  }

  updateItems(): void {
    for (let i = 0; i < this.urls.length; i++) {
      this.items[i].disabled = false
      this.items[i].empty = false
      this.items[i].url = this.urls[i]
    }

    for (let i = 0; i < 3; i++) {
      if (this.urls[i]) {
        this.items[i].disabled = false
        this.items[i].empty = false
        this.items[i].url = this.urls[i]
      } else {
        this.items[i].empty = true
        this.items[i].url = ""
        this.items[i].disabled = i != 0 && this.items[i - 1].empty;
      }
    }
  }

  onDelete(id: number): void {
    this.urls.splice(id, 1)
    this.updateItems()
  }

  onPositionChange(id: number, target: number): void {
    [this.urls[id], this.urls[target]] = [this.urls[target], this.urls[id]]
    this.updateItems()
    console.log(this.urls)
  }
}
