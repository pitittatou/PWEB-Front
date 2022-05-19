import {Component, OnDestroy, OnInit} from '@angular/core';
import {Options} from '@angular-slider/ngx-slider';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {UserService} from "../services/user.service";
import {AuthenticationService} from "../services/authentication.service";
import {MatSnackBar} from "@angular/material/snack-bar";

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
export class ProfileEditComponent implements OnInit, OnDestroy {
  registerPage!: boolean;
  minValue: number = 18;
  maxValue: number = 30;
  attractions = [
    <Attraction>{display_name: "Hommes", name: "men", checked: false},
    <Attraction>{display_name: "Femmes", name: "women", checked: false},
    <Attraction>{display_name: "Autre", name: "other", checked: false}
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

  constructor(private snackBar: MatSnackBar, private userService: UserService, private router: Router, private authService: AuthenticationService) {}

  ngOnInit() {
    this.registerPage = this.router.url == '/inscription'
  }

  ngOnDestroy() {
    this.snackBar.dismiss()
  }

  onCheck(i: number, checked: boolean) {
    this.attractions[i].checked = checked
  }

  onFormSubmit(userForm: NgForm) {
    let data = userForm.value
    data.attraction = []
    for (let at of this.attractions) {
      if (at.checked) {
        data.attraction.push(at.name)
      }
    }

    if (this.registerPage) {
      this.userService.register(data).subscribe({
        next: () => {
          this.authService.update_registered(true)
          this.router.navigateByUrl('/')
        },
        error: () => {
          this.snackBar.open("Erreur lors de l'inscription", 'Fermer')
        }
      })
    } else {
      this.userService.updateUser(data).subscribe({
        next: () => {
          this.router.navigateByUrl('/profil')
        },
        error: () => {
          this.snackBar.open("Erreur lors de la mise à jour du profil", 'Fermer')
        }
      })
    }
  }
}


