import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { Product } from 'src/app/models/product.model';
import { ProductService } from '../product.service';

import { ProductListComponent } from './product-list.component';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productServiceSpy:jasmine.SpyObj<ProductService>;
 
  let products:Product[]=[
    new Product(1,"Chainsawman Vol.3","This story is about the man who lives in a world where devil exists",["https://images-eu.ssl-images-amazon.com/images/I/81ww5rFJirL._AC._SR360,460.jpg"],199),
    new Product(2,"Chainsawman Vol.2","This story is about the man who lives in a world where devil exists",["https://images-eu.ssl-images-amazon.com/images/I/81ww5rFJirL._AC._SR360,460.jpg"],199),
    new Product(3,"Chainsawman Vol.3","This story is about the man who lives in a world where devil exists",["https://images-eu.ssl-images-amazon.com/images/I/81ww5rFJirL._AC._SR360,460.jpg"],199),
  ];
  const spy = jasmine.createSpyObj('ProductService',['getProducts']);
  beforeEach(async () => {
    // productServiceSpy.getProducts.and.returnValue(products);
    spy.productSub = new BehaviorSubject([products[0]]);
    await TestBed.configureTestingModule({
      declarations: [ ProductListComponent ],
      providers:[{provider:ProductService , useValue:spy}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);

    component = fixture.componentInstance;
    // productServiceSpy = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    fixture.detectChanges();
    
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
    // pending();
  });
  it('should return list of products', () => {
    // component.ngOnInit();
    // productServiceSpy.getProducts.and.returnValue(products);
    component.productList = products;
    // spyOn(productServiceSpy, 'productSub').and.returnValue([products[0]]);
    
    expect(component.productList).withContext("1st").toEqual(products);
    // component.ngOnInit();
    // component.productList = [products[0]];
    // spy.productSub.next([products[0]]);
    // productServiceSpy.productSub.subscribe((products)=>{
    //     console.log("Inside list",products);
        // expect(component.productList).withContext("2nd").toEqual([products[0]]);
    // })
    
  });
});
