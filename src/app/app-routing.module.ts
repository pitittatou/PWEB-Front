import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MatchingComponent} from "./matching/matching.component";
import {LoginComponent} from "./login/login.component";
import {PhotoChooserComponent} from "./photo-chooser/photo-chooser.component";
import { ProfileEditComponent } from './profile-edit/profile-edit.component';

const routes: Routes = [
  { path: '', component: MatchingComponent },
  { path: 'connexion', component: LoginComponent },
  { path: 'inscription', component: ProfileEditComponent},
  { path: 'profil', component: ProfileEditComponent },
  { path: 'photos', component: PhotoChooserComponent }, // temporaire
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
