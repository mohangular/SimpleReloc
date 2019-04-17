import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule, MatIconModule, MatToolbarModule, MatButtonModule, MatFormFieldModule,MatAutocompleteModule, MatInputModule, MatSidenavModule, MatExpansionModule, MatTabsModule } from '@angular/material';

import { AppComponent } from './app.component';
import { SrHomeComponent } from './Components/sr-home/sr-home.component';
import { SrAvailableServicesComponent } from './Components/sr-available-services/sr-available-services.component';
import { SrSelectedServicesComponent } from './Components/sr-selected-services/sr-selected-services.component';
import { LoginComponent } from './Components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    SrHomeComponent,
    SrAvailableServicesComponent,
    SrSelectedServicesComponent,
    LoginComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSidenavModule,
    MatTabsModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

 }