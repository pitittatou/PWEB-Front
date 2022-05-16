import { Component } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
	hide = true;
	isActive = true;
	sliderControl: FormControl = new FormControl(100);
	options: Options = {
		floor: 0,
		ceil: 50,
	};
	sliderForm: FormGroup = new FormGroup({
		sliderControl2: new FormControl([18, 30])
	});
	options2: Options = {
		floor: 18,
		ceil: 100,
		step: 1
	};
}
