import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private _router: Router,
    private _cookieService: CookieService
  ) { }

  ngOnInit(): void {
  }

  chooseRoute=()=>{
    let token= this._cookieService.get('token');

    if(token!=''){
      this._router.navigate(['/ocr-main']);
    }else{
      this._router.navigate(['/login']);
    }
  }

}
