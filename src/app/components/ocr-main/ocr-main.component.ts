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

  public imagesToUpload: Array<File>;
  public ocrImageModel: OcrImage;
  public savedImages:any;
  public url= Global.url;
  private loggedUser:any;
  public srcLoad:boolean=false;
  public imageFileName:any;
  public confidence:number;
  public deleteWarn:string;

  public imageObj: File;
  public imageUrl:string;

  constructor(
    private _ocrService: OcrService,
    private _uploadImagesService: UploadImagesService,
    private _requestsOCRImagesService: RequestsOCRImagesService,
    private _cookieService: CookieService
    ) {
    this.ocrImageModel= new OcrImage('','','','');
  }

  ngOnInit(): void {
    this.loggedUser= JSON.parse(this._cookieService.get('payload'));
    this.ocrImageModel.userId=this.loggedUser.id;
    this.getImagesData(this.loggedUser.id);
  }

  getImagesData=(userId)=>{
    this._requestsOCRImagesService.getImagesData(userId).subscribe(
      response=>{
        this.savedImages= response.ImagesOCR;
      },
      error=>{
        console.log(<any>error);
      }
    );
  }

  deleteImagesData=(imageid)=>{
    this._requestsOCRImagesService.deleteImageOCR(imageid).subscribe(
      res=>{
        this.deleteWarn=res.message;
        window.location.reload();
      },
      error=>{
        console.log(<any>error);
      }
    );
  }

  clickImage = ( image ) =>{
    this._ocrService.cbImage.emit(image);
    window.scrollTo(0,0);
  }

  onSubmit=(form)=>{
    this._requestsOCRImagesService.saveOcrImages(this.ocrImageModel).subscribe(
      response=>{
        //upload image
        let data=response.data;
        this._uploadImagesService.makeFileRequest(this.url+'uploadImageS3/'+data._id, [], this.imageObj, 'image');//.then((result:any)=>{console.log(result);});
        form.reset;
        //window.location.reload();
      },
      error=>{
        console.log(<any>error);
      }
    );
  }

  changeFunc= (e:any) =>{
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
    console.log(FILE);
    //this.imagesToUpload= <Array<File>>e.target.files;
  }









  onImagePicked(event:Event){
    const FILE = (event.target as HTMLInputElement).files[0];
    this.imageObj = FILE;
    console.log(FILE);

  }


  onImageUpload(){
    const imageForm:any = new FormData();
    imageForm.append('image', this.imageObj);
    console.log(imageForm);


    this._uploadImagesService.imageUpload(imageForm).subscribe(res => {
      this.imageUrl = res['image'];
      console.log(res);

    });
  };


}
