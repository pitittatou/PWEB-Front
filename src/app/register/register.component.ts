import { Component } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { ProfilService } from '../services/Profil.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
	registerPage!: boolean;

	constructor( public ProfilService: ProfilService, private router: Router) {}

	knowRegisterOrProfil(): boolean{
		if (this.router.url == '/inscription') {
			this.registerPage = true;
		};
		if (this.router.url == '/profil') {
			this.registerPage = false;
		};
		return this.registerPage;
	}
	

	sliderControl: FormControl = new FormControl(100);
	options: Options = {
		floor: 0,
		ceil: 50,
		getPointerColor: (value: number): string => {
			return '#34c6bb';
		}
	};
	sliderForm: FormGroup = new FormGroup({
		sliderControl2: new FormControl([18, 30])
	});
	options2: Options = {
		floor: 18,
		ceil: 99,
		step: 1,
		showSelectionBar: true,
		getPointerColor: (value: number): string => {
			return '#34c6bb';
		},
		getSelectionBarColor: (value: number): string => {
			return '#34c6bb';
		}
	};
}