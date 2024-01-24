import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageToolBarModule } from './home-page-toolbar/home-page-toolbar.module';
import { SharedModule } from './shared/shared.module';
import { HomePageBodyModule } from './home-page-body/home-page-body.module';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api-services';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HomePageToolBarModule,
    HomePageBodyModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
