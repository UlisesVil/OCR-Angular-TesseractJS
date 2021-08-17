import { Component, OnChanges, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges {
  public token:string;

  constructor(
    private _cookieService: CookieService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.menusInSession();
  }

  ngOnChanges(): void {
    this.menusInSession();
  }

  menusInSession=()=>{
    this.token = this._cookieService.get('token');
  }

  logOut=()=>{
    this._cookieService.deleteAll('/');
    this._router.navigate(['']).then(()=>{
      window.location.reload();
    });
  }

}
