import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {  HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { InjectTokenInterceptor } from './helpers/inject-token.interceptor';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   multi : true,
    //   useClass : CaptErrorInterceptor
    // },
    {
      provide: HTTP_INTERCEPTORS,
      multi : true,
      useClass : InjectTokenInterceptor
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
