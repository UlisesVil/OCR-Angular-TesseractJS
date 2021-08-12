import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { OcrMainComponent } from './components/ocr-main/ocr-main.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { OutputTextComponent } from './components/output-text/output-text.component';
import { HomeComponent } from './components/home/home.component';
import { QuickOcrComponent } from './components/quick-ocr/quick-ocr.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    OcrMainComponent,
    SideBarComponent,
    OutputTextComponent,
    HomeComponent,
    QuickOcrComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
