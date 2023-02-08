import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  subject = new Subject<Product>();
  constructor() { }

  sendMsg(product: Product) {
    // console.log(product);

    this.subject.next(product);
  }

  getMsg() {
    return this.subject.asObservable();
  }
}
