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

  constructor(
    private ocrService: OcrService
  ) { }

  ngOnInit(): void {
  }

  clickImage = ( image ) =>{
    console.log(image);

    this.ocrService.cbImage.emit(image);
  }


}
