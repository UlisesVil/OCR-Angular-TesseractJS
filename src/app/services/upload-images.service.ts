import { Injectable } from '@angular/core';
import { Global } from './global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadImagesService {
  public url:string;

  constructor(
    private _http:HttpClient
  ) {
    this.url = Global.url;
  }

  makeFileRequest=(url:string, params:Array<string>, files:any, name: string)=>{
    return new Promise (function(resolve, reject){
      var formData:any = new FormData();
      var xhr = new XMLHttpRequest();

      //for(var i=0; i<files.length; i++){
        //formData.append(name, files[i], files[i].name);
      //}
      console.log(name);
      console.log(files);


      formData.append(name, files);

      xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
          if(xhr.status == 200){
            resolve(JSON.parse(xhr.response));
          }else{
            reject(xhr.response);
          }
        }
      }
      xhr.open('POST', url, true);
      xhr.send(formData);
    });
  }






  imageUpload(imageForm: FormData):Observable<any>{
    console.log(imageForm);
    /*let headers = new HttpHeaders().set('Content-Type','application/json');
    let params = JSON.stringify(imageForm);
    return this._http.post(this.url+'uploadImageS3',params,{headers:headers});
  */
    return this._http.post(this.url+'uploadImageS3', imageForm);
  }

}
