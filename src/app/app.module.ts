import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { UserAuthComponent } from './components/user-auth/user-auth.component';
import { QuickOcrComponent } from './components/quick-ocr/quick-ocr.component';
import { OcrMainComponent } from './components/ocr-main/ocr-main.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { OutputTextComponent } from './components/output-text/output-text.component';

import { CookieService } from 'ngx-cookie-service';
import { JwtInterceptorInterceptor } from  './interceptors/jwt-interceptor.interceptor';
import { LoadwarningsComponent } from './modals/loadwarnings/loadwarnings.component';
import { OcrloadingComponent } from './modals/ocrloading/ocrloading.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    UserRegisterComponent,
    UserAuthComponent,
    QuickOcrComponent,
    OcrMainComponent,
    SideBarComponent,
    OutputTextComponent,
    LoadwarningsComponent,
    OcrloadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    CookieService,{
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
