import { MaterialModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LOG_LOGGER_PROVIDERS } from 'angular2-logger/core';
import { AgmCoreModule } from 'angular2-google-maps/core';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './core/services';

// Imports for app services
import { GlobalEventsService }    from './core/services';
import { AnimalService, ConstantsService, PlaceService } from './core/services';

// Import teh components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnimalListComponent, AnimalDetailComponent } from './components/animal/';
import { PlaceListComponent, PlaceDetailComponent } from './components/place/';
import { HeaderComponent, FooterComponent, NavBarComponent } from './components/page-elements/';
import { SettingsComponent } from './components/settings/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    AnimalListComponent,
    AnimalDetailComponent,
    PlaceListComponent,
    PlaceDetailComponent,
    HeaderComponent,
    FooterComponent,
    NavBarComponent,
    SettingsComponent
  ],
  imports: [
    MaterialModule.forRoot(),
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyCVW-AvkNcqGNcLaavfN0UNCST96fEe86Q' }),
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [LOG_LOGGER_PROVIDERS, GlobalEventsService,  AnimalService, ConstantsService, PlaceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
