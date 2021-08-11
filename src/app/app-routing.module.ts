import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { OcrMainComponent } from './components/ocr-main/ocr-main.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { QuickOcrComponent } from './components/quick-ocr/quick-ocr.component';

const routes: Routes = [
  {path:'',component: HomeComponent},
  {path:'quick-ocr',component: QuickOcrComponent},
  {path:'ocr-main',component: OcrMainComponent},
  {path:'sidebar',component: SideBarComponent},

  //{path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
