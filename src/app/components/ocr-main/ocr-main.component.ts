import { Component, OnInit } from '@angular/core';
import { OcrService } from 'src/app/services/Ocr.service';


@Component({
  selector: 'app-ocr-main',
  templateUrl: './ocr-main.component.html',
  styleUrls: ['./ocr-main.component.scss']
})
export class OcrMainComponent implements OnInit {
  listImages= [
    {
      src:'banner.jpeg'
    },
    {
      src:'eng_bw.png'
    },
    {
      src:'example-1.png'
    },
    {
      src:'invoice.jpeg'
    },
    {
      src:'invoice-2.jpeg'
    }
  ];
  loadedSrc:any;

  constructor(
    private ocrService: OcrService
  ) { }

  ngOnInit(): void {

  }

  clickImage = ( image ) =>{
    console.log(image);

    this.ocrService.cbImage.emit(image);
  }

  onSubmit=(form)=>{
    console.log(form);

  }


  changeFunc= (e) =>{
    console.log(e);
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.onload=function(){
      //let preview = document.getElementById('preview');
      let imagePrev= document.getElementById('imgPrevSave');
      let imageSrc:any=reader.result;
      imagePrev.setAttribute('src', imageSrc);
      console.log(reader.result);
       //return reader.result;
      //preview.innerHTML='';
      //preview.append(imagePrev);
    };
  }

}
