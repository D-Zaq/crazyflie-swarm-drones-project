import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { DroneCardComponent } from './components/drone-card/drone-card.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DronesService } from './services/drones/drones.service';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    DroneCardComponent,
    SideBarComponent,
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
