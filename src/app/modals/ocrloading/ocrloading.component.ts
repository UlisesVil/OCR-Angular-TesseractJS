import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ocrloading',
  templateUrl: './ocrloading.component.html',
  styleUrls: ['./ocrloading.component.scss']
})
export class OcrloadingComponent implements OnInit {
  @Input() statusProcess:any;
  @Input() loadingPercentage:any;

  constructor() { }

  ngOnInit(): void {
  }

}
