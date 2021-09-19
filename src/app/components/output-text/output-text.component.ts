import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OcrService } from 'src/app/services/Ocr.service';

@Component({
  selector: 'app-output-text',
  templateUrl: './output-text.component.html',
  styleUrls: ['./output-text.component.scss']
})
export class OutputTextComponent implements OnInit, OnDestroy {
  listSubscribers:Subscription[];
  public textOut: string;

  constructor(
    private _ocrService: OcrService
  ) { }

  ngOnInit(): void {
    this.listObserver();
  }

  ngOnDestroy() :void {
    this.listSubscribers.forEach(element => {
      element.unsubscribe();
    });
  }

  listObserver(){
    const observer1$ = this._ocrService.cbText.subscribe(
      ({text})=>{
        this.textOut= text;
      }
    );
    this.listSubscribers = [observer1$];
  };
}
