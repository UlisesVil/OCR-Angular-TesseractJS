import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { JwtInterceptorInterceptor } from  './interceptors/jwt-interceptor.interceptor'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { OcrMainComponent } from './components/ocr-main/ocr-main.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { OutputTextComponent } from './components/output-text/output-text.component';
import { HomeComponent } from './components/home/home.component';
import { QuickOcrComponent } from './components/quick-ocr/quick-ocr.component';
import { UserAuthComponent } from './components/user-auth/user-auth.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    OcrMainComponent,
    SideBarComponent,
    OutputTextComponent,
    HomeComponent,
    QuickOcrComponent,
    UserAuthComponent,
    UserRegisterComponent
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
