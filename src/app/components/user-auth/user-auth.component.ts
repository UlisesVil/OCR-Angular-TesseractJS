import { Component, OnInit } from '@angular/core';
import { UserAuthModel } from 'src/app/models/user-auth-model';
import { UserService } from '../../services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidation } from '../../utils/matchPassword';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent implements OnInit {
  public user:UserAuthModel;
  public confirm:String;
  public errorWarning:String;
  public okWarning:String;
  public modal:boolean=false;
  public form: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _cookieService: CookieService,
    private _router: Router
  ) {
    this.user = new UserAuthModel("","","","");
    this.formCreate();
  }

  ngOnInit(): void {
  }

  formCreate(){
    this.form = this._formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    }, {
      validator: PasswordValidation.MatchPassword
    });
  }

  onSubmitlogin(){
    if(this.form.valid){
      this.user={
        userName: '',
        lastName: '',
        email: this.form.value.email,
        password: this.form.value.password
      }
      this._userService.login(this.user).subscribe(
        res=>{
          this._cookieService.set('token', res.token);
          this._cookieService.set('payload', JSON.stringify(res.payload));
          this.okWarning=res.message+' '+res.payload.userName;
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
    }
  }

  modalOff(e){
    this.modal=e.modal;
    this.errorWarning=e.errorWarning;
  }
}
