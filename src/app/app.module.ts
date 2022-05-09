import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { DuckysComponent } from './duckys/duckys.component';
import { KingEddyComponent } from './kingeddy/kingeddy.component';

import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
// import { FilterPipe } from './filter.pipe'; // -> imported filter pipe
// import { HotTableModule } from '@handsontable/angular';
// import { registerAllModules } from 'handsontable/registry';

// // register Handsontable's modules
// registerAllModules();

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    DuckysComponent,
    KingEddyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{provide: LocationStrategy, useClass: PathLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
