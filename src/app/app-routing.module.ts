import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilComponent } from './profil/profil.component';
import {MatchingComponent} from "./matching/matching.component";
import {LoginComponent} from "./login/login.component";
import {PhotoChooserComponent} from "./photo-chooser/photo-chooser.component";
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: MatchingComponent },
  { path: 'connexion', component: LoginComponent },
  { path: 'inscription', component: RegisterComponent},
  { path: 'profil', component: RegisterComponent },
  { path: 'photos', component: PhotoChooserComponent }, // temporaire
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
