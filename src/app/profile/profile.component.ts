import {Component, OnDestroy, OnInit} from '@angular/core';
import {Options} from '@angular-slider/ngx-slider';
import {NgForm} from '@angular/forms';
import {UserService} from "../services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UpdateProfileForm} from "../models/update-profile-form.model";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  profile!: UpdateProfileForm;
  attraction!: {name: string, checked: boolean}[]
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

  constructor(private snackBar: MatSnackBar, private userService: UserService, private router: Router, private titleService: Title) {}

  ngOnInit() {
    this.titleService.setTitle("Profil")
    this.userService.get_profile().subscribe((profile) => {
      this.profile = profile
      this.attraction = [
        {name: "man", checked: this.profile.manChecked},
        {name: "woman", checked: this.profile.womanChecked},
        {name: "other", checked: this.profile.otherChecked}
      ]
    },
      (e) => console.log(e))
  }

  ngOnDestroy() {
    this.snackBar.dismiss()
  }

  onCheck(i: number, checked: boolean) {
    this.attraction[i].checked = checked
  }

  onFormSubmit(userForm: NgForm) {
    let data = userForm.value
    data.attraction = []
    for (let gender of this.attraction) {
      if (gender.checked) {
        data.attraction.push(gender.name)
      }
    }
    this.userService.updateUser(data).subscribe({
      next: () => {
        this.snackBar.open("Profil mis à jour", 'Fermer')
      },
      error: () => {
        this.snackBar.open("Erreur lors de la mise à jour du profil", 'Fermer')
      }
    })
  }

  onReturn() {
    this.router.navigateByUrl('/')
  }
}
