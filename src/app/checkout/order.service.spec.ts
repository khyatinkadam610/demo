import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { AppComponent } from '../app.component';
import { LoginService } from '../login/login.service';

import { OrderService } from './order.service';

describe('OrderService', () => {
  const mockLoginService = jasmine.createSpyObj(['user']);
  mockLoginService.user = new BehaviorSubject({
    id: 1,
  })

  let service: OrderService;
  let httptestingControl: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [AppComponent],
      imports: [HttpClientTestingModule],
      providers: [OrderService,
          { provide: LoginService, useValue: mockLoginService }],});
    service = TestBed.inject(OrderService);
    httptestingControl = TestBed.inject(HttpTestingController);
  });

  it('should call getCartItems correctly ', () => {
    service.getOrders().subscribe(
        (res) => {
            expect(res).toBe(200);
            // expect(cartItems.length).toEqual(3, "Incorrect No of items")
            // console.log(cartItems);
            
        }
    );
    // console.log(service.userData.id);  
    const req = httptestingControl.expectOne(`https://kartwheel-cbe4d-default-rtdb.firebaseio.com/orders/1.json`);
    
    
    expect(req.request.method).toEqual("GET");
    req.flush(200);
    httptestingControl.verify();
});
});
