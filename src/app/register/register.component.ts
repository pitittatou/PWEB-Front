import {Component, OnDestroy, OnInit} from '@angular/core';
import {Options} from '@angular-slider/ngx-slider';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {UserService} from "../services/user.service";
import {AuthenticationService} from "../services/authentication.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RegisterForm} from "../models/register-form.model";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  profile!: RegisterForm;
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

  constructor(private snackBar: MatSnackBar, private userService: UserService, private router: Router, private authService: AuthenticationService, private titleService: Title) {}

  ngOnInit() {
    this.titleService.setTitle("Inscription")
    this.profile = new RegisterForm()
    this.attraction = [
      {name: "man", checked: this.profile.manChecked},
      {name: "woman", checked: this.profile.womanChecked},
      {name: "other", checked: this.profile.otherChecked}
    ]
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
    for (let at of this.attraction) {
      if (at.checked) {
        data.attraction.push(at.name)
      }
    }

    this.userService.register(data).subscribe({
      next: () => {
        this.authService.update_registered(true)
        this.router.navigateByUrl('/')
      },
      error: () => {
        this.snackBar.open("Erreur lors de l'inscription", 'Fermer')
      }
    })
  }

  checkBoxesValid() {
    for (let item of this.attraction) {
      if (item.checked) {
        return true
      }
    }
    return false
  }
}


