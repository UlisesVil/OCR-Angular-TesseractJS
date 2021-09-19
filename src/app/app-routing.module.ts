import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { QuickOcrComponent } from './components/quick-ocr/quick-ocr.component';
import { OcrMainComponent } from './components/ocr-main/ocr-main.component';
import { UserAuthComponent } from './components/user-auth/user-auth.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { UserGuard } from './guards/user-guard.guard';

const routes: Routes = [
  {path:'',component: HomeComponent},
  {path:'quick-ocr',component: QuickOcrComponent},
  {path:'login',component: UserAuthComponent},
  {path:'signUp',component: UserRegisterComponent},
  {path:'ocr-main',component: OcrMainComponent, canActivate: [UserGuard]},
  {path:'**',pathMatch:'full', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
