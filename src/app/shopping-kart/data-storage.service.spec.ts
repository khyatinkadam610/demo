import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { DataStorageService } from './data-storage.service';
import { ProductService } from './product.service';
import { Product } from '../models/product.model';

describe('DataStorageService', () => {
  let service: DataStorageService;
  let productSpy:any;
  let httptestingControl:HttpTestingController;
  beforeEach(() => {
    productSpy = jasmine.createSpyObj('ProductService',['setProduct']);
    TestBed.configureTestingModule({
      declarations:[],
      imports:[HttpClientTestingModule],
      providers:[DataStorageService,
          {provide:ProductService , useValue:productSpy}],
    });
    service = TestBed.inject(DataStorageService);
    httptestingControl = TestBed.inject(HttpTestingController);
  });
describe("Create",()=> {
  it('should be created', () => {
    let products:Product[]=[
      new Product(1,"Chainsawman Vol.3","This story is about the man who lives in a world where devil exists",["https://images-eu.ssl-images-amazon.com/images/I/81ww5rFJirL._AC._SR360,460.jpg"],199),
      new Product(2,"Chainsawman Vol.2","This story is about the man who lives in a world where devil exists",["https://images-eu.ssl-images-amazon.com/images/I/81ww5rFJirL._AC._SR360,460.jpg"],199),
      new Product(3,"Chainsawman Vol.3","This story is about the man who lives in a world where devil exists",["https://images-eu.ssl-images-amazon.com/images/I/81ww5rFJirL._AC._SR360,460.jpg"],199),
    ];
    service.fetchProduct().subscribe(
      (products)=>{
          expect(products).toBeTruthy("No product returned");
          expect(products.length).toBe(3,"Incorreect number of porducts");
      }

  );
    const req = httptestingControl.expectOne('https://kartwheel-cbe4d-default-rtdb.firebaseio.com/products.json');
        expect(req.request.method).toEqual("GET");
        req.flush(products);
        httptestingControl.verify();
      });

      it('should be created', () => {
        let products:Product[]=[
          new Product(1,"Chainsawman Vol.3","This story is about the man who lives in a world where devil exists",["https://images-eu.ssl-images-amazon.com/images/I/81ww5rFJirL._AC._SR360,460.jpg"],199),
          new Product(2,"Chainsawman Vol.2","This story is about the man who lives in a world where devil exists",["https://images-eu.ssl-images-amazon.com/images/I/81ww5rFJirL._AC._SR360,460.jpg"],199),
          new Product(3,"Chainsawman Vol.3","This story is about the man who lives in a world where devil exists",["https://images-eu.ssl-images-amazon.com/images/I/81ww5rFJirL._AC._SR360,460.jpg"],199),
        ];
        service.fetchProduct().subscribe(
          (products)=>{
              expect(products).toBeTruthy("No recipes returned");
              expect(products.length).toBe(3,"Incorreect number of recipes");
          }
    
      );
        const req = httptestingControl.expectOne('https://kartwheel-cbe4d-default-rtdb.firebaseio.com/products.json');
            expect(req.request.method).toEqual("GET");
            req.flush(products);
            httptestingControl.verify();
          });
  });
});
