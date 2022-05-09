import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { DuckysComponent } from './duckys/duckys.component';
import { KingEddyComponent } from './kingeddy/kingeddy.component';



const routes: Routes = [
  { path: 'Duckys', component: DuckysComponent},
  { path: 'KingEddy', component: KingEddyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
