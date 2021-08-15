import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OcrService {

  cbImage: EventEmitter<any> = new EventEmitter<any>();
  cbText: EventEmitter<any> = new EventEmitter<any>();

  //cbRegister: EventEmitter<any> = new EventEmitter<any>();
  cbLogin: EventEmitter<any> = new EventEmitter<any>();


  constructor() { }
}
