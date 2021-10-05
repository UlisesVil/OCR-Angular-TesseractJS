import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from 'src/app/services/global.service';

@Injectable({
  providedIn: 'root'
})
export class RequestsOCRImagesService {
  public url:string;

  constructor(
    private _http: HttpClient,
  ) {
    this.url=Global.url;
  }

  saveOcrImages(ocrImageModel):Observable<any>{
    let params = JSON.stringify(ocrImageModel);
    let headers = new HttpHeaders().set("Content-Type","application/json");
    return this._http.post(this.url+'save-OcrImageData',params,{headers:headers});
  }

  getImagesData(userId):Observable<any>{
    let params = JSON.stringify({userId:userId});
    let headers = new HttpHeaders().set("Content-Type","application/json");
    return this._http.post(this.url+'get-imagesdata', params,{headers:headers});
  }

  deleteImageOCR(imageId):Observable<any>{
    let headers = new HttpHeaders().set("Content-Type","application/json");
    return this._http.delete(this.url+'deleteOcrImage/'+imageId,{headers:headers});
  }

  getbase64Image(image):Observable<any>{
    let params = JSON.stringify(image);
    let headers = new HttpHeaders().set("Content-Type","application/json");
    return this._http.post(this.url+'getbase64Image', params,{headers:headers});
  }
}
