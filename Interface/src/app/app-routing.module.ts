import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogPageComponent } from './components/log-page/log-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';

const routes: Routes = [
  { path: 'main-page', component: MainPageComponent },
  { path: '', redirectTo: '/main-page', pathMatch: 'full' },
  { path: 'log-page', component: LogPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
