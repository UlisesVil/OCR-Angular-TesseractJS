import { Component, OnInit } from '@angular/core';
import { OcrImage } from 'src/app/models/ocr-image';
import { Global } from 'src/app/services/global.service';
import { OcrService } from 'src/app/services/Ocr.service';
import { UploadImagesService } from 'src/app/services/upload-images.service';
import { RequestsOCRImagesService } from 'src/app/services/requests-ocrimages.service';
import { CookieService } from 'ngx-cookie-service';
import { DbPwaService } from 'src/app/services/db-pwa.service';
import { ConnectionService } from 'ng-connection-service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ocr-main',
  templateUrl: './ocr-main.component.html',
  styleUrls: ['./ocr-main.component.scss'],
  providers: [ RequestsOCRImagesService, UploadImagesService ]
})
export class OcrMainComponent implements OnInit{
  public status:String;
  public localDBEmpty:boolean=false;
  public isConnected=true;
  public horizontalPosition: MatSnackBarHorizontalPosition='center';
  public verticalPosition: MatSnackBarVerticalPosition='bottom';

  private url= Global.url;
  private imageObj: File;
  private loggedUser:any;
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
  public localSavedImages:any;

  constructor(
    private _ocrService: OcrService,
    private _uploadImagesService: UploadImagesService,
    private _requestsOCRImagesService: RequestsOCRImagesService,
    private _cookieService: CookieService,
    private _dbPwaService: DbPwaService,
    private _connectionService: ConnectionService,
    public _snackBar: MatSnackBar
    ) {
    this.ocrImageModel= new OcrImage('','','','');

    this._connectionService.monitor().subscribe(isConnected => {
      this.isConnected=isConnected;

      if(this.isConnected){
        this.status="Online";
      }else{
        this.status="Offline";
      }

      this._snackBar.open('You are '+this.status, 'Ok', {
        duration: 3000,
        panelClass: ['black-snackbar']
      });
    });
  }

  ngOnInit(): void {
    this.loggedUser=JSON.parse(this._cookieService.get('payload'));
    this.ocrImageModel.userId=this.loggedUser.id;
    this.getImagesData(this.loggedUser.id);
    this._dbPwaService.getAll()
      .then((items:Array<any>)=>{
        items.forEach((res)=>{
          if(res){
            this.localDBEmpty=true;
          }else{
            this.localDBEmpty=false;
          }
        })
      })
    ;
  }

  getImagesData(userId){
    this._requestsOCRImagesService.getImagesData(userId).subscribe(
      response=>{
        this.savedImages=response.ImagesOCR;
        (response.ImagesOCR.length > 0)?
        this.startTitle=true :
        this.startTitle=false;
      },
      error=>{
        console.log(<any>error);
      }
    );

    this._dbPwaService.getAll()
      .then((items:Array<any>)=>{
        var localSavedImages=[];
        items.forEach(({doc})=>{
          var imageName=doc.ocrImageModel.imageName;
          var dotIndex=imageName.indexOf('.');
          var ext=imageName.slice(dotIndex+1, imageName.length);
          var item={
            _id:doc._id,
            _rev:doc._rev,
            documentName:doc.ocrImageModel.documentName,
            documentType:doc.ocrImageModel.documentType,
            imageName:doc.ocrImageModel.imageName,
            src:'data:image/'+ext+';base64,'+doc._attachments.image.data
          }
          localSavedImages.push(item);
        });
        this.localSavedImages=localSavedImages;
      })
    ;
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

  deleteImageLocal(item){
    this._dbPwaService.clearImgData(item);
    setTimeout(()=>{
      window.location.reload();
    },3000);
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
        if(<any>error){
          console.log(<any>error);
          this.errorWarning=<any>error.error.message;
          this.modal=true;
        };

        var imagePrev= document.getElementById('imgPrevSave');
        var srcComplete=imagePrev.getAttribute('src');
        var base='base64';
        var baseIndex=srcComplete.lastIndexOf(base)+7;
        var imgBase64=srcComplete.slice(baseIndex, srcComplete.length);
        var imageName=this.ocrImageModel.imageName;
        var dotIndex=imageName.indexOf('.');
        var ext=imageName.slice(dotIndex+1, imageName.length);
        var imageType="image/"+ext;
        var pendingSave={
          ocrImageModel: this.ocrImageModel,
          imageObj: this.imageObj,
          _id:imageName,
          _attachments:{
            'image':{
              content_type: imageType,
              data: imgBase64
            }
          }
        };
        this._dbPwaService.holdData(pendingSave);
        this.modal=true;
        this.okWarning="Saved in Local When your Internet connection is back push the Sync Button to save your images to the server"
      }
    );
    setTimeout(()=>{
      window.location.reload();
    },3000);
  }

  imageLoaded(e:any){
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

  syncLocal(){
    this._dbPwaService.getAll()
      .then((items:Array<any>)=>{
        items.forEach(({doc})=>{
          this._requestsOCRImagesService.saveOcrImages(doc.ocrImageModel).subscribe(
            response=>{
              if(response){
                this._dbPwaService.clearImgData(doc);
              }
              let data=response.data;
              this._uploadImagesService.makeFileRequest(this.url+'uploadImageS3/'+data._id, [], doc.imageObj, 'image')
                .then((result:any)=>{
                  if(result.message){
                    this.modal=true;
                    this.okWarning=result.message;
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
          setTimeout(()=>{
            window.location.reload();
          },3000);
        });
      })
    ;
  }
}
