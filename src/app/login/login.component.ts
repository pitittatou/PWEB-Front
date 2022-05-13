import {Component} from '@angular/core';
import {Options} from '@angular-slider/ngx-slider';
import {FormControl, FormGroup} from '@angular/forms';
import {GoogleLoginProvider, SocialAuthService} from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
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

  constructor(
    private socialAuthService: SocialAuthService) {
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((user) => console.log(user))
  }
}
