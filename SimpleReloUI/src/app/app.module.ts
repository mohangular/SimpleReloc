import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule, MatIconModule, MatToolbarModule, MatButtonModule, MatFormFieldModule,MatAutocompleteModule, MatInputModule, MatSidenavModule, MatExpansionModule, MatTabsModule, MatProgressSpinnerModule, MatDialogModule } from '@angular/material';
import { AppComponent } from './app.component';
import { SrHomeComponent } from './Components/sr-home/sr-home.component';
import { SrAvailableServicesComponent } from './Components/sr-available-services/sr-available-services.component';
import { SrSelectedServicesComponent } from './Components/sr-selected-services/sr-selected-services.component';
import { LoginComponent } from './Components/login/login.component';
import { SrServicesPopupComponent } from './Components/sr-services-popup/sr-services-popup.component';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

@NgModule({
  declarations: [
    AppComponent,
    SrHomeComponent,
    SrAvailableServicesComponent,
    SrSelectedServicesComponent,
    LoginComponent,
    SrServicesPopupComponent
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
    MatProgressSpinnerModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    LoggerModule.forRoot({
      serverLoggingUrl: '/api/logs',
      level: NgxLoggerLevel.TRACE,
      serverLogLevel: NgxLoggerLevel.ERROR,
      disableConsoleLogging: false
    })
  ],
  providers: [],
  entryComponents: [
    SrServicesPopupComponent
],
  bootstrap: [AppComponent]
})
export class AppModule {

 }