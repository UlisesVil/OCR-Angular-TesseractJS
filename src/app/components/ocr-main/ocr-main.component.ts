import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { OcrService } from 'src/app/services/Ocr.service';
import { UploadImagesService } from 'src/app/services/upload-images.service';
import { OcrImage } from 'src/app/models/ocr-image';
import { RequestsOCRImagesService } from 'src/app/services/requests-ocrimages.service';
import { Global } from 'src/app/services/global.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-ocr-main',
  templateUrl: './ocr-main.component.html',
  styleUrls: ['./ocr-main.component.scss'],
  providers: [ RequestsOCRImagesService, UploadImagesService ]
})
export class OcrMainComponent implements OnInit, OnDestroy{
  @ViewChild('inputImage') inputImage: ElementRef;
  @ViewChild('outputImage') outputImage: ElementRef;

  //loadedSrc:any;
  public imagesToUpload: Array<File>;
  public ocrImageModel: OcrImage;
  public savedImages:any;
  public url= Global.url;
  private loggedUser:any;
  public srcLoad:boolean=false;
  public imageFileName:any;
  public confidence:number;

  constructor(
    private ocrService: OcrService,
    private _uploadImagesService: UploadImagesService,
    private _requestsOCRImagesService: RequestsOCRImagesService,
    private _cookieService: CookieService
  ) {
    this.ocrImageModel= new OcrImage('','','','');

   }

  ngOnInit(): void {

    this.loggedUser= JSON.parse(this._cookieService.get('payload'));
    console.log(this.loggedUser);
    this.ocrImageModel.userId=this.loggedUser.id;
    console.log(this.ocrImageModel.userId);
    this.getImagesData(this.loggedUser.id);


  }
  ngOnDestroy(): void {
  }

  getImagesData=(userId)=>{
    console.log(userId);

    this._requestsOCRImagesService.getImagesData(userId).subscribe(
      response=>{
        console.log(response);
        this.savedImages= response.ImagesOCR;
        console.log(this.savedImages);

      },
      error=>{
        console.log(<any>error);
      }
    );
  }

  clickImage = ( image ) =>{
    this.ocrService.cbImage.emit(image);
    window.scrollTo(0,0);
  }




  onSubmit=(form)=>{
    //console.log(form);
    console.log(this.ocrImageModel);

    this._requestsOCRImagesService.saveOcrImages(this.ocrImageModel).subscribe(
      response=>{
        console.log(response.data._id);

        //subimos imagen
        let data=response.data;
        this._uploadImagesService.makeFileRequest(this.url+'upload-image/'+data._id, [], this.imagesToUpload, 'image' ).then((result:any)=>{
          console.log(result);

        });
        form.reset;
        window.location.reload();



      },
      error=>{
        console.log(<any>error);

      }
    );
  }


  changeFunc= (e:any) =>{
    this.srcLoad=true;
    //console.log(e);
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
      //console.log(reader.result);
    };



    //Upload image to server
    this.ocrImageModel.imageName = e.target.files[0].name;
    this.imagesToUpload= <Array<File>>e.target.files;
    console.log(this.imagesToUpload);

  }




}
