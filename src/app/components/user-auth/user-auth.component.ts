import { Component, OnInit } from '@angular/core';
import { UserAuthModel } from 'src/app/models/user-auth-model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent implements OnInit {
  public user:UserAuthModel;
  public confirm:string;
  public passwordWarn:boolean;

  constructor(
    private _userService: UserService
  ) {
    this.user = new UserAuthModel("","","","");
  }

  ngOnInit(): void {
    this.passwordWarn=false;
  }

  onSubmit= (form) =>{
    console.log(form);
    console.log(this.confirm);
    console.log(this.user);
    if(this.user.password===this.confirm){
      this._userService.saveUser(this.user).subscribe(
        res=>{
          console.log(res);

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

  onSubmitlogin=(form)=>{
    console.log(form);
    console.log(this.confirm);
    console.log(this.user);
    if(this.user.password===this.confirm){
      this._userService.getUser(this.user).subscribe(
        res=>{
          console.log(res);

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
