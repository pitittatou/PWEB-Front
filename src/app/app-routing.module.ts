import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApercuComponentComponent } from './apercu-component/apercu-component.component';
import { ProfilComponent } from './profil/profil.component';
import {MatchingComponent} from "./matching/matching.component";
import {LoginComponent} from "./login/login.component";
import {PhotoChooserComponent} from "./photo-chooser/photo-chooser.component";
import {AuthGuard} from "./guards/auth.guard";
import {NotLoggedGuard} from "./guards/not-logged.guard";

const routes: Routes = [
  { path: '', component: MatchingComponent, canActivate: [AuthGuard] },
  { path: 'connexion', component: LoginComponent, canActivate: [NotLoggedGuard] },
  { path: 'profil', component: ProfilComponent, canActivate: [AuthGuard] },
  { path: 'photos', component: PhotoChooserComponent, canActivate: [AuthGuard] }, // temporaire
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
