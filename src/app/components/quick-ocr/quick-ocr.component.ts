import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { recognize } from 'tesseract.js';
import { OcrService } from '../../services/Ocr.service';

@Component({
  selector: 'app-quick-ocr',
  templateUrl: './quick-ocr.component.html',
  styleUrls: ['./quick-ocr.component.scss']
})
export class QuickOcrComponent implements OnInit, OnDestroy{
  @ViewChild('inputImage') inputImage: ElementRef;
  @ViewChild('outputImage') outputImage: ElementRef;
  public openSideBar:boolean = false;
  public listSubscribers: any= [];
  public loading: any;
  public image: any;
  public worker: any;
  public context: CanvasRenderingContext2D;  //aplica a contexto del canvas
  public loadingPercentage: number;
  public statusProcess:string;
  public loadedSrc:any;
  public showBlock:boolean;
  public imageFileName:any;
  public confidence: number;

  constructor(
    private ocrService: OcrService
  ) { }

  ngOnInit(): void {
    this.listObserver();
    this.showBlock=false;
  }

  toggleMenu = () =>{
    this.openSideBar = !this.openSideBar;
  }

  ngOnDestroy(): void {
    this.listSubscribers.forEach(element => element.unsubscribe());
  }

  listObserver=()=>{
    const observer1$ = this.ocrService.cbImage.subscribe(({src})=>{
      console.log(src);
      this.image = src;
      this.openSideBar = true;
      console.log(src);

    });
    this.listSubscribers=[observer1$];
  }

  loadingProgress = (logger) => {
    console.log(logger);
    this.loadingPercentage= logger.progress * 100;
    this.statusProcess= logger.status;
    console.log(this.loadingPercentage);


  }

  initSetup= () => {
    const canvasElement = this.outputImage.nativeElement;
    const imageElement = this.inputImage.nativeElement;
    console.log(imageElement);

    const { naturalWidth, naturalHeight} = imageElement;
    console.log( naturalWidth, naturalHeight );
    this.context= canvasElement.getContext('2d');
    this.context.lineWidth = 5;
    this.context.lineCap = 'square';
    this.context.strokeStyle= 'green';
    canvasElement.width=naturalWidth;
    canvasElement.height= naturalHeight;

  }

  draw = (dataIn) => {
    console.log(dataIn);

    dataIn.words.forEach(w=>{
      const bounding = w.bbox;
      console.log(bounding);
      this.context.strokeStyle= 'red';
      this.context.strokeRect(bounding.x0, bounding.y0, bounding.x1 - bounding.x0, bounding.y1 - bounding.y0);
      this.context.beginPath();
      // this.context.moveTo(w.baseline.x0, w.baseline.y0);
      // this.context.lineTo(w.baseline.x1, w.baseline.y1);
      this.context.stroke();

    });
  }

  initialization = async() => {
    this.loading= true;
    const imageElement = this.inputImage.nativeElement;
    const {data}= await recognize (imageElement, 'spa',{
      logger: m => this.loadingProgress(m)
    });
    this.draw(data);
    console.log('FINALIZO------------->',data);

    this.ocrService.cbText.emit(data);
    this.confidence=data.confidence;
    console.log(this.confidence);


  }

  loadedImage=()=>{
    this.initSetup();
    this.initialization();
    console.log('Imagen LISTA');

  }





  changeFunc= (e) =>{
    console.log(e);
    this.showBlock=true;
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

    reader.onload=function(){
      //let preview = document.getElementById('preview');
      let imagePrev= document.getElementById('imgPrevQuick');
      let imageSrc:any=reader.result;
      imagePrev.setAttribute('src', imageSrc);
      console.log(reader.result);
       //return reader.result;
      //preview.innerHTML='';
      //preview.append(imagePrev);
    };

  }

}
