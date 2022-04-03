import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApercuComponentComponent } from './apercu-component/apercu-component.component';
import { ProfilComponent } from './profil/profil.component';

const routes: Routes = [
  { path: 'pageApercu', component: ApercuComponentComponent },
  { path: 'Profil', component: ProfilComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }