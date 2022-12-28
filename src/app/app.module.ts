import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTabsModule} from "@angular/material/tabs";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ButtonComponent} from './components/button/button.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatRadioModule} from "@angular/material/radio";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatListModule} from "@angular/material/list";

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule,
    FontAwesomeModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatRadioModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
