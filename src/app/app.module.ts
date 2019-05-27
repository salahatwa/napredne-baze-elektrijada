import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FlexLayoutModule } from '@angular/flex-layout'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { SharedModule } from './feature-modules/shared/shared.module'
import { LoginComponent } from './components/login/login.component'
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component'

@NgModule({
  declarations: [AppComponent, LoginComponent, HomeComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
