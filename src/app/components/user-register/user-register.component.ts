import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserAuthModel } from 'src/app/models/user-auth-model';
import { UserService } from '../../services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router'
import { OcrService } from 'src/app/services/Ocr.service';
import { MenusActivatorService } from 'src/app/services/menus-activator.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit, OnDestroy {
  public user:UserAuthModel;
  public confirm:string;
  public passwordWarn:boolean;
  public listSubscribers:any=[];

  constructor(
    private _userService: UserService,
    private cookieService: CookieService,
    private _router: Router,
    private _ocrService: OcrService,
    public _menusActivatorService: MenusActivatorService
  ) {
    this.user = new UserAuthModel("","","","");
  }

  ngOnInit(): void {
    this.passwordWarn=false;

    this.listObserver();


  }

  ngOnDestroy(): void {
    this.listSubscribers.forEach(element => element.unsubscribe());
  }

  listObserver=()=>{
    console.log('este es el observer');

    const observer1$ = this._ocrService.cbLogin.subscribe(({login})=>{
      console.log(login);

    });
    this.listSubscribers=[observer1$];
  }

  onSubmit= (form) =>{
    console.log(form);
    console.log(this.confirm);
    console.log(this.user);
    if(this.user.password===this.confirm){
      this._userService.saveUser(this.user).subscribe(
        res=>{
          console.log(res);
          this._userService.login(this.user).subscribe(
            res=>{
              console.log(res);
              this.cookieService.set('token', res.token);
              this.cookieService.set('payload', JSON.stringify(res.payload));
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

      console.log('todo bien todo correcto');
      this.passwordWarn=false;
    }else{
      this.passwordWarn=true;
      console.log('no coincide');
    }
  }


}
