import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-loadwarnings',
  templateUrl: './loadwarnings.component.html',
  styleUrls: ['./loadwarnings.component.scss']
})
export class LoadwarningsComponent implements OnInit {
  @Input() okWarning:String;
  @Input() errorWarning:String;
  @Output() deactivateErrorMessage:EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  modalOff(){
    this.deactivateErrorMessage.emit({
      modal:false,
      errorWarning:null
    });
  }
}
