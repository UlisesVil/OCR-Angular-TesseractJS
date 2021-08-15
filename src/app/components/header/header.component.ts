import { Component, OnChanges, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { OcrService } from 'src/app/services/Ocr.service';
import { MenusActivatorService } from '../../services/menus-activator.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges {
  public token:string;

  constructor(
    private _cookieService: CookieService,
    private _router: Router,
    private _ocrService: OcrService,
    public _menusActivatorService: MenusActivatorService
  ) {


   }

  ngOnInit(): void {
    this.menusInSession();
    console.log(this.token);
  }

  ngOnChanges(): void {
    this.menusInSession();
    console.log(this.token);

  }
  menusInSession=()=>{
    this.token = this._cookieService.get('token');
  }

  logOut=()=>{
    this._cookieService.deleteAll('/');
    console.log('si sirve');
    this._router.navigate(['']).then(()=>{
      window.location.reload();
    });
  }





  loginActivate(){

    this._menusActivatorService.registerFormOnOf={login:true,register:false};

    //this._router.navigate(['login']);
  }

  registerActivate(){
    this._menusActivatorService.registerFormOnOf={login:false,register:true};

    //this._router.navigate(['login']);
  }

}
