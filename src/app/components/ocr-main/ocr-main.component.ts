import { Component, OnInit } from '@angular/core';
import { OcrImage } from 'src/app/models/ocr-image';
import { Global } from 'src/app/services/global.service';
import { OcrService } from 'src/app/services/Ocr.service';
import { UploadImagesService } from 'src/app/services/upload-images.service';
import { RequestsOCRImagesService } from 'src/app/services/requests-ocrimages.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-ocr-main',
  templateUrl: './ocr-main.component.html',
  styleUrls: ['./ocr-main.component.scss'],
  providers: [ RequestsOCRImagesService, UploadImagesService ]
})
export class OcrMainComponent implements OnInit{

  private imageObj: File;
  private loggedUser:any;
  private url= Global.url;
  public ocrImageModel: OcrImage;
  public savedImages:any;
  public srcLoad:boolean=false;
  public imageFileName:any;
  public confidence:number;
  public startTitle:boolean= false;
  public deleteWarn:String;
  public okWarning:String;
  public errorWarning:String;
  public modal: boolean=false;

  constructor(
    private _ocrService: OcrService,
    private _uploadImagesService: UploadImagesService,
    private _requestsOCRImagesService: RequestsOCRImagesService,
    private _cookieService: CookieService
    ) {
    this.ocrImageModel= new OcrImage('','','','');
  }

  ngOnInit(): void {
    this.loggedUser=JSON.parse(this._cookieService.get('payload'));
    this.ocrImageModel.userId=this.loggedUser.id;
    this.getImagesData(this.loggedUser.id);
  }

  getImagesData(userId){
    this._requestsOCRImagesService.getImagesData(userId).subscribe(
      response=>{
        this.savedImages= response.ImagesOCR;
        response.ImagesOCR.length > 0 ? this.startTitle = true : this.startTitle = false;
      },
      error=>{
        console.log(<any>error);
      }
    );
  }

  deleteImagesData(imageid){
    this._requestsOCRImagesService.deleteImageOCR(imageid).subscribe(
      res=>{
        this.okWarning=res.message;
        this.modal=true;
        setTimeout(()=>{
          window.location.reload();
        },3000);
      },
      error=>{
        console.log(<any>error);
      }
    );
  }

  clickImage(image){
    this._ocrService.cbImage.emit(image);
    window.scrollTo(0,0);
  }

  onSubmit(form){
    this._requestsOCRImagesService.saveOcrImages(this.ocrImageModel).subscribe(
      response=>{
        let data=response.data;
        this._uploadImagesService.makeFileRequest(this.url+'uploadImageS3/'+data._id, [], this.imageObj, 'image')
          .then((result:any)=>{
            if(result.message){
              this.modal=true;
              this.okWarning=result.message;
              setTimeout(()=>{
                window.location.reload();
              },3000);
            }
          })
        ;
      },
      error=>{
        console.log(<any>error);
        this.errorWarning=<any>error.error.message;
        this.modal=true;
      }
    );
  }

  changeFunc(e:any){
    this.srcLoad=true;
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    var fileName=e.target.files[0].name;

    if(fileName.length<14){
      this.imageFileName=e.target.files[0].name;
    }else{
      let arrStr=fileName.split('');
      let newName=arrStr.slice(0,10).join('');
      let indexExt= arrStr.indexOf('.');
      let ext=arrStr.slice(indexExt,arrStr.length).join('');
      this.imageFileName=newName+'..'+ext;
    }
    //Image Preview
    reader.onload=function(){
      let imagePrev= document.getElementById('imgPrevSave');
      var imageSrc:any=reader.result;
      imagePrev.setAttribute('src', imageSrc);
    };
    //Upload image to server
    this.ocrImageModel.imageName = e.target.files[0].name;
    const FILE = (e.target as HTMLInputElement).files[0];
    this.imageObj = FILE;
  }

  modalOff(e){
    this.modal=e.modal;
    this.errorWarning=e.errorWarning;
  }
}
