import {Component, OnInit} from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { NgForm } from '@angular/forms';
import {UserService} from "../services/user.service";

interface Attraction {
  display_name: string,
  name: string,
  checked: boolean
}

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
	registerPage!: boolean;
  minValue: number = 18;
  maxValue: number = 30;
	attractions = [
		<Attraction> {display_name: "Hommes", name: "men", checked: false},
		<Attraction> {display_name: "Femmes", name: "women", checked: false},
		<Attraction> {display_name: "Autre", name: "other", checked: false}
	]
  Options: Options = {
    floor: 18,
    ceil: 99,
    getPointerColor: (value: number): string => {
      return '#34c6bb';
    },
    getSelectionBarColor: (value: number): string => {
      return '#34c6bb';
    }
  };

	constructor( public userService: UserService, private router: Router) {}

  ngOnInit() {
    this.registerPage = this.router.url == '/inscription'
  }

  onCheck(i: number, checked: boolean) {
    this.attractions[i].checked = checked
  }

	onFormSubmit(userForm: NgForm){
    let data = userForm.value
    data.attraction = []
    for (let at of this.attractions) {
      if (at.checked) {
        data.attraction.push(at.name)
      }
    }

    this.userService.updateUser(data).subscribe({
      next: (v) => {
        if (this.registerPage) {
          this.router.navigateByUrl('/')
        }
      },
      error: (e) => {

      }
  })
	}

}


