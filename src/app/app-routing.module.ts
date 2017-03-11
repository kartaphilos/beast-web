import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnimalListComponent } from './components/animal/animal-list/animal-list.component';
import { AnimalDetailComponent } from './components/animal/animal-detail/animal-detail.component';
import { LocationListComponent, LocationDetailComponent } from './components/location';

const routes: Routes = [
//  { path: '', redirectTo: 'animal', pathMatch: 'full' },
  { path: 'animal', component: AnimalListComponent,
    children: [
      { path: 'detail/:id', component: AnimalDetailComponent },
      ]
  },
  { path: 'location', component: LocationListComponent,
    children: [
      { path: 'detail/:id', component: LocationDetailComponent }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: []
})
export class AppRoutingModule { }
