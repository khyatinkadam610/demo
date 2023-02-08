import { TestBed } from '@angular/core/testing';
import { Product } from '../models/product.model';

import { MessengerService } from './messenger.service';

describe('MessengerService', () => {
  let service: MessengerService;
//create mock service objects

const productItem = new Product(1,'abc','xyz',['url'],100);
  beforeEach(() => {
    //create mock service objects
        // service = jasmine.createSpyObj('MessengerService', ['']);
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessengerService);
  });

  it('should pass msg', () => {
      service.subject.subscribe((product)=>{
        expect(product).toEqual(productItem);
      })
    service.sendMsg(productItem);
  });
});
