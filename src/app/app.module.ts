import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { OcrMainComponent } from './components/ocr-main/ocr-main.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { OutputTextComponent } from './components/output-text/output-text.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    OcrMainComponent,
    SideBarComponent,
    OutputTextComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
