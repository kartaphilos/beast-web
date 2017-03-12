import { MaterialModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './core/services';

// Imports for app services
import { AnimalService } from './core/services';

// Import teh components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnimalListComponent } from './components/animal/animal-list/animal-list.component';
import { AnimalDetailComponent } from './components/animal/animal-detail/animal-detail.component';
import { LocationDetailComponent } from './components/location/location-detail/location-detail.component';
import { LocationListComponent } from './components/location/location-list/location-list.component';
import { HeaderComponent } from './components/page-elements/header/header.component';
import { FooterComponent } from './components/page-elements/footer/footer.component';
import { NavBarComponent } from './components/page-elements/nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    AnimalListComponent,
    AnimalDetailComponent,
    LocationDetailComponent,
    LocationListComponent,
    HeaderComponent,
    FooterComponent,
    NavBarComponent
  ],
  imports: [
    MaterialModule.forRoot(),
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [ AnimalService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
