import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogsComponent } from './components/logs/logs.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { SavedMissionsComponent } from './components/saved-missions/saved-missions.component';

const routes: Routes = [
  { path: 'main-page', component: MainPageComponent },
  { path: 'logs', component: LogsComponent },
  { path: 'saved-missions', component: SavedMissionsComponent },
  { path: '', redirectTo: '/main-page', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
