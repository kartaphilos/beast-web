import { MaterialModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LOG_LOGGER_PROVIDERS } from 'angular2-logger/core';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './core/services';

// Imports for app services
import { AnimalService, ConstantsService, PlaceService } from './core/services';

// Import teh components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnimalListComponent, AnimalDetailComponent } from './components/animal/';
import { PlaceListComponent, PlaceDetailComponent } from './components/place/';
import { HeaderComponent, FooterComponent, NavBarComponent } from './components/page-elements/';

@NgModule({
  declarations: [
    AppComponent,
    AnimalListComponent,
    AnimalDetailComponent,
    PlaceListComponent,
    PlaceDetailComponent,
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
  providers: [LOG_LOGGER_PROVIDERS, AnimalService, ConstantsService, PlaceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
