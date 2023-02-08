import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { CartService } from '../cart/cart.service';
import { DataStorageService } from '../data-storage.service';
import { MessengerService } from '../messenger.service';
import { ProductService } from '../product.service';

import { ViewDetailsComponent } from './view-details.component';

describe('ViewDetailsComponent', () => {
  let component: ViewDetailsComponent;
  let fixture: ComponentFixture<ViewDetailsComponent>;
  let productService:any;
  let router:any;
  let dataStorageService:any;
  let cartService:any;
  let msgService:any;
  beforeEach(async () => {
    productService = jasmine.createSpyObj(['getProductById']);
    dataStorageService = jasmine.createSpyObj(['fetchProduct']);
    dataStorageService.fetchProduct.and.returnValue(of('reponse'))
    router = jasmine.createSpyObj(['navigate']);

    cartService = jasmine.createSpyObj(['addProductToCart']);
    cartService.addProductToCart.and.returnValue(of('response'));

    msgService = jasmine.createSpyObj(['sendMsg']);
    msgService.sendMsg.and.returnValue(of('response'));
    // let activatedRoute = jasmine.createSpyObj([''])
    await TestBed.configureTestingModule({

      declarations: [ ViewDetailsComponent ],
      providers:[{provide:ProductService, useValue:productService},
      {provide:Router, useValue:router},
      {
        provide: ActivatedRoute,
        useValue: {
          snapshot:{
            params:1
          },
          params: of({
            id: 2,
          }),
        },
      },
      {provide:DataStorageService, useValue:dataStorageService},
    {provide:CartService, useValue:cartService},
  {provide:MessengerService,useValue:msgService}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDetailsComponent);
    component = fixture.componentInstance;
    component.productItem =  new Product(1,"Chainsawman Vol.3","This story is about the man who lives in a world where devil exists",["https://images-eu.ssl-images-amazon.com/images/I/81ww5rFJirL._AC._SR360,460.jpg"],199);
    fixture.detectChanges();
  });

  it('should navigate backwards', () => {
    component.onBack(); 
    expect(component.productItem).toBeTruthy();
  });
  it('should navigate backwards', () => {
    component.handleAddToCart(); 
    expect(cartService.addProductToCart).toHaveBeenCalled();
    expect(msgService.sendMsg).toHaveBeenCalled();
  });
});
