import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AngularFireModule} from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
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
import { SavedMissionsPageComponent } from './components/saved-missions-page/saved-missions-page.component';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    DroneCardComponent,
    LogsComponent,
    MissionComponent,
    SavedMissionsComponent,
    SavedMissionsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule

  ],
  providers: [DronesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
