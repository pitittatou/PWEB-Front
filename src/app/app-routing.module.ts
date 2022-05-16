import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilComponent } from './profil/profil.component';
import { MatchingComponent } from "./matching/matching.component";
import { LoginComponent } from "./login/login.component";
import { PhotoChooserComponent } from "./photo-chooser/photo-chooser.component";
import { AuthGuard } from "./guards/auth.guard";
import { NotLoggedGuard } from "./guards/not-logged.guard";
import { RegisteredGuard } from "./guards/registered.guard";
import { NotRegisteredGuard } from "./guards/not-registered.guard";
import { RegisterComponent } from "./register/register.component";

const routes: Routes = [
  { path: '', component: MatchingComponent, canActivate: [AuthGuard, RegisteredGuard] },
  { path: 'connexion', component: LoginComponent, canActivate: [NotLoggedGuard] },
  { path: 'profil', component: ProfilComponent, canActivate: [AuthGuard, RegisteredGuard] },
  { path: 'photos', component: PhotoChooserComponent, canActivate: [AuthGuard, RegisteredGuard] }, // temporaire
  { path: 'inscription', component: RegisterComponent, canActivate: [AuthGuard, NotRegisteredGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
