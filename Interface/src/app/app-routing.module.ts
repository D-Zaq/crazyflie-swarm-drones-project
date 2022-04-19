import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogsComponent } from './components/logs/logs.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { SavedMissionsPageComponent } from './components/saved-missions-page/saved-missions-page.component';

const routes: Routes = [
  { path: 'main-page', component: MainPageComponent },
  { path: 'logs', component: LogsComponent },
  { path: 'saved-missions', component: SavedMissionsPageComponent },
  { path: '', redirectTo: '/main-page', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
