import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { DroneCardComponent } from './components/drone-card/drone-card.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DronesService } from './services/drones/drones.service';
import { LogsComponent } from './components/logs/logs.component';
import { MissionComponent } from './components/mission/mission.component';
import { SavedMissionsComponent } from './components/saved-missions/saved-missions.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    DroneCardComponent,
    LogsComponent,
    MissionComponent,
    SavedMissionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,

  ],
  providers: [DronesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
