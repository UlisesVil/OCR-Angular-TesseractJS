import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { OcrMainComponent } from './components/ocr-main/ocr-main.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { QuickOcrComponent } from './components/quick-ocr/quick-ocr.component';
import { UserAuthComponent } from './components/user-auth/user-auth.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { UserGuardGuard } from './guards/user-guard.guard';

const routes: Routes = [
  {path:'',component: HomeComponent},
  {path:'quick-ocr',component: QuickOcrComponent},
  {path:'ocr-main',component: OcrMainComponent, canActivate: [UserGuardGuard]},
  {path:'sidebar',component: SideBarComponent},
  {path:'login',component: UserAuthComponent},
  {path:'signUp',component: UserRegisterComponent},
  {path:'**',pathMatch:'full', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
