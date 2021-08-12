import { Injectable } from '@angular/core';
import { Global } from './global.service';
//import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadImagesService {
  public url:string;

  constructor() {
    this.url = Global.url;
  }

  makeFileRequest=(url:string, params:Array<string>, files: Array<File>, name: string)=>{
    console.log(files);

    return new Promise (function(resolve, reject){
      var formData:any = new FormData();
      var xhr = new XMLHttpRequest();

      for(var i=0; i<files.length; i++){
          formData.append(name, files[i], files[i].name);
          console.log(name, files[i], files[i].name);
          console.log(formData);


      }

      xhr.onreadystatechange = function(){
          if(xhr.readyState == 4){
              if(xhr.status == 200){
                  resolve(JSON.parse(xhr.response));
              }else{
                  reject(xhr.response);
              }
          }
      }
      console.log(formData);

      xhr.open('POST', url, true);
      xhr.send(formData);
    });
  }


}
