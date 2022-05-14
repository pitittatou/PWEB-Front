import {Component, OnDestroy, OnInit} from '@angular/core';
import {Options} from '@angular-slider/ngx-slider';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthenticationService} from "../services/authentication.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {
  hide = true
  isActive = true
  sliderControl: FormControl = new FormControl(100)
  options: Options = {
    floor: 0,
    ceil: 50,
  }
  sliderForm: FormGroup = new FormGroup({
    sliderControl2: new FormControl([18, 30])
  })
  options2: Options = {
    floor: 18,
    ceil: 100,
    step: 1
  }
  error!: String

  constructor(private authService: AuthenticationService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.error = ''
  }

  ngOnDestroy() {
    this.snackBar.dismiss()
  }

  loginWithGoogle(): void {
    this.authService.login().catch(() => this.snackBar.open("Erreur lors de la connexion", 'Fermer'))
  }

  logout() {
    this.authService.logout()
  }
}
