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
  public errorWarning:String;
  public okWarning:String;
  public modal:boolean=false;

  constructor(
    private _userService: UserService,
    private _cookieService: CookieService,
    private _router: Router
  ) {
    this.user = new UserAuthModel("","","","");
  }

  ngOnInit(): void {
  }

  onSubmit(form){
    if(this.user.password===this.confirm){
      this._userService.saveUser(this.user).subscribe(
        res=>{
          this._userService.login(this.user).subscribe(
            res=>{
              this._cookieService.set('token', res.token);
              this._cookieService.set('payload', JSON.stringify(res.payload));
              this.okWarning=res.message;
              this.modal=true;
              setTimeout(()=>{
                this._router.navigate(['/ocr-main']).then(()=>{
                  window.location.reload();
                });
              },3000);
            },error=>{
              console.log(<any>error);
              this.errorWarning=<any>error.error.message;
              this.modal=true;
            }
          );
        },error=>{
          console.log(<any>error);
          this.errorWarning=<any>error.error.message;
          this.modal=true;
        }
      );
    }else{
      this.errorWarning='The password does not match the Confirmed one';
      this.modal=true;
    }
  }

  modalOff(e){
    this.modal=e.modal;
    this.errorWarning=e.errorWarning;
  }
}
