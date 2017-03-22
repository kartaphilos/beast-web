import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnimalListComponent, AnimalDetailComponent } from './components/animal';
import { PlaceListComponent, PlaceDetailComponent } from './components/place';
import { SettingsComponent } from './components/settings/settings/settings.component';

const routes: Routes = [
  //  { path: '', redirectTo: 'animal', pathMatch: 'full' },
  { path: 'animal', component: AnimalListComponent },
  { path: 'animal/detail/:id', component: AnimalDetailComponent },
  { path: 'animal/detail', component: AnimalDetailComponent },
  { path: 'place', component: PlaceListComponent },
  { path: 'place/detail/:id', component: PlaceDetailComponent },
  { path: 'place/detail', component: PlaceDetailComponent },
  { path: 'settings', component: SettingsComponent },
  /*{ path: 'place', component: PlaceListComponent,
    children: [ //Don't make a child route if to render is same outlet as parent
      { path: 'detail/:id', component: PlaceDetailComponent }
    ]
  }*/
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
