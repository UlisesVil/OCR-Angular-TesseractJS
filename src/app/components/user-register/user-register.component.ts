import { Component, OnInit } from '@angular/core';
import { UserAuthModel } from 'src/app/models/user-auth-model';
import { UserService } from '../../services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {
  public user:UserAuthModel;
  public confirm:string;
  public passwordWarn:boolean;

  constructor(
    private _userService: UserService,
    private _cookieService: CookieService,
    private _router: Router
  ) {
    this.user = new UserAuthModel("","","","");
  }

  ngOnInit(): void {
    this.passwordWarn=false;
  }

  onSubmit= (form) =>{
    if(this.user.password===this.confirm){
      this._userService.saveUser(this.user).subscribe(
        res=>{
          this._userService.login(this.user).subscribe(
            res=>{
              this._cookieService.set('token', res.token);
              this._cookieService.set('payload', JSON.stringify(res.payload));
              this._router.navigate(['/ocr-main']).then(()=>{
                window.location.reload();
              });
            },error=>{
              console.log(<any>error);
            }
          );
        },error=>{
          console.log(<any>error);
        }
      );
      this.passwordWarn=false;
    }else{
      this.passwordWarn=true;
    }
  }
}