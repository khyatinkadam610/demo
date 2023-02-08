import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { OrderConfirmComponent } from './order-confirm.component';
 

describe('OrderConfirmComponent', () => {
  let orderService;
  let component:OrderConfirmComponent;
  beforeEach(async () => {
    orderService = jasmine.createSpyObj(['getOrders']);
    orderService.getOrders.and.returnValue(of(["response"]));
    component = new OrderConfirmComponent(orderService);
  });

  it('should load orders', () => {
    component.ngOnInit();
    expect(component.orders).toEqual(['response']);
  });
});
