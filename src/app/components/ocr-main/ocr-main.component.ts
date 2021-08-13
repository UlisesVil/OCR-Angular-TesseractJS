import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { OcrService } from 'src/app/services/Ocr.service';
import { UploadImagesService } from 'src/app/services/upload-images.service';
import { OcrImage } from 'src/app/models/ocr-image';
import { RequestsOCRImagesService } from 'src/app/services/requests-ocrimages.service';
import { Global } from 'src/app/services/global.service';
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


  constructor(
    private ocrService: OcrService,
    private _uploadImagesService: UploadImagesService,
    private _requestsOCRImagesService: RequestsOCRImagesService
  ) {
    this.ocrImageModel= new OcrImage('','','');
   }

  ngOnInit(): void {
    this.getImagesData();


  }
  ngOnDestroy(): void {
  }

  getImagesData=()=>{
    this._requestsOCRImagesService.getImagesData().subscribe(
      response=>{
        //console.log(response);
        this.savedImages= response.ImagesOCR;
        console.log(this.savedImages);

      },
      error=>{
        console.log(<any>error);
      }
    );
  }

  clickImage = ( image ) =>{
    //console.log(image);

    this.ocrService.cbImage.emit(image);
    console.log(image);




  }

  pasaelLoad(e){
    console.log(e);

  }


  onSubmit=(form)=>{
    //console.log(form);
    //console.log(this.ocrImageModel);

    this._requestsOCRImagesService.saveOcrImages(this.ocrImageModel).subscribe(
      response=>{
        console.log(response.data._id);

        //subimos imagen
        let data=response.data;
        this._uploadImagesService.makeFileRequest(this.url+'upload-image/'+data._id, [], this.imagesToUpload, 'image' ).then((result:any)=>{
          console.log(result);

        });



        //form.reset;
      },
      error=>{
        console.log(<any>error);

      }
    );
  }


  changeFunc= (e:any) =>{
    //console.log(e);
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    //Image Preview
    reader.onload=function(){
      let imagePrev= document.getElementById('imgPrevSave');
      let imageSrc:any=reader.result;
      imagePrev.setAttribute('src', imageSrc);
      //console.log(reader.result);
    };

    //Upload image to server
    this.ocrImageModel.imageName = e.target.files[0].name;
    this.imagesToUpload= <Array<File>>e.target.files;
    console.log(this.imagesToUpload);

  }

}
