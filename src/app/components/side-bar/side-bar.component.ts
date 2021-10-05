import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { recognize } from 'tesseract.js';
import { OcrService } from '../../services/Ocr.service';
import { RequestsOCRImagesService } from '../../services/requests-ocrimages.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit, OnDestroy{
  @ViewChild('inputImage') inputImage: ElementRef;
  @ViewChild('outputImage') outputImage: ElementRef;
  private listSubscribers: any= [];
  private context: CanvasRenderingContext2D;
  public openSideBar:boolean = false;
  public loading: any;
  public image: any;
  public loadingPercentage: number;
  public statusProcess:string;
  public loadedSrc:any;
  public confidence:number;

  constructor(
    private _ocrService: OcrService,
    private _requestsOCRImagesService: RequestsOCRImagesService
  ) { }

  ngOnInit(): void {
    this.listObserver();
  }

  toggleMenu(){
    this.openSideBar = !this.openSideBar;
  }

  ngOnDestroy(): void {
    this.listSubscribers.forEach(element => element.unsubscribe());
  }

  listObserver(){
    const observer1$ = this._ocrService.cbImage.subscribe(({src})=>{
      this.image = src;
      this.openSideBar = true;
    });
    this.listSubscribers=[observer1$];
  }

  loadingProgress(logger){
    this.loadingPercentage= logger.progress * 100;
    this.statusProcess= logger.status;
  }

  initSetup(){
    const canvasElement = this.outputImage.nativeElement;
    const imageElement = this.inputImage.nativeElement;
    const { naturalWidth, naturalHeight} = imageElement;
    this.context= canvasElement.getContext('2d');
    this.context.lineWidth = 5;
    this.context.lineCap = 'square';
    this.context.strokeStyle= 'green';
    canvasElement.width=naturalWidth;
    canvasElement.height= naturalHeight;
  }

  draw(dataIn){
    dataIn.words.forEach(w=>{
      const bounding = w.bbox;
      this.context.strokeStyle= 'red';
      this.context.strokeRect(bounding.x0, bounding.y0, bounding.x1 - bounding.x0, bounding.y1 - bounding.y0);
      this.context.beginPath();
      this.context.stroke();
    });
  }

  getbase64Image(image){
    this._requestsOCRImagesService.getbase64Image({image:image}).subscribe(
      response=>{
        this.initialization(response.image);
      },
      err=>{
      console.log(<any>err);
    });
  }

  initialization = async(image) => {
    this.loading= true;
    const imageElement = this.inputImage.nativeElement;
    const {data}= await recognize (image, 'spa',{
      logger: m => this.loadingProgress(m)
    });
    this.draw(data);
    this._ocrService.cbText.emit(data);
    this.confidence=data.confidence;
  }

  loadedImage(image){
    this.initSetup();
    this.getbase64Image(image);
  }

  changeFunc(e){
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload=function(){
      let imagePrev= document.getElementById('imgPrev');
      let imageSrc:any=reader.result;
      imagePrev.setAttribute('src', imageSrc);
    };
  }
}
