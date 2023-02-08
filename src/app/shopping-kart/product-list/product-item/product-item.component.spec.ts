import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CartService } from '../../cart/cart.service';
import { MessengerService } from '../../messenger.service';

import { ProductItemComponent } from './product-item.component';

describe('ProductItemComponent', () => {
  let component: ProductItemComponent;
  let fixture: ComponentFixture<ProductItemComponent>;
  let cartSpy:any;
  let msgService:any;
  let routerService:any;

  beforeEach(async () => {
    cartSpy = jasmine.createSpyObj(['addProductToCart']);
    cartSpy.addProductToCart.and.returnValue(of("response"));
    msgService = jasmine.createSpyObj(['sendMsg']);
    msgService.sendMsg.and.returnValue(of("response"));
    routerService = jasmine.createSpyObj(['navigate']);
    // msgService.sendMsg.and.returnValue(of("response"));
    component = new ProductItemComponent(msgService,cartSpy,routerService);
  });

  it('should handleAddToCart', () => {
    // spyOn(cartSpy,'addProductToCart').withArgs('response').and.returnValue('response');
    component.handleAddToCart();
    expect(cartSpy.addProductToCart).toHaveBeenCalled();
    expect(msgService.sendMsg).toHaveBeenCalled();
    // pending();
  });
  it('should navigate', () => {
    // spyOn(cartSpy,'addProductToCart').withArgs('response').and.returnValue('response');
    component.OnViewDetails(1);

  });
});
