import { AppRoutingModule } from './app-routing.module';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
<<<<<<< HEAD
import { MatCardModule, MatIconModule, MatToolbarModule, MatButtonModule, MatFormFieldModule,MatAutocompleteModule, MatInputModule, MatSidenavModule } from '@angular/material';
=======
import { MatCardModule, MatIconModule, MatToolbarModule, MatTabsModule,MatButtonModule, MatFormFieldModule,MatAutocompleteModule, MatInputModule, MatExpansionModule } from '@angular/material';
>>>>>>> 04e20e7883167c8850e14216869822592c45cbe6

import { AppComponent } from './app.component';
import { SrHomeComponent } from './sr-home/sr-home.component';
import { SrAvailableServicesComponent } from './sr-available-services/sr-available-services.component';
import { SrSelectedServicesComponent } from './sr-selected-services/sr-selected-services.component';
import { LoginComponent } from './login/login.component';

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
<<<<<<< HEAD
    MatSidenavModule
=======
    MatTabsModule,
    MatExpansionModule
>>>>>>> 04e20e7883167c8850e14216869822592c45cbe6
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

 }