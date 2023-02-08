import { TestBed } from '@angular/core/testing';
import { Product } from '../models/product.model';

import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
 
  const products:Product[] = [
  new Product(1,"Chainsawman Vol.3","This story is about the man who lives in a world where devil exists",["https://images-eu.ssl-images-amazon.com/images/I/81ww5rFJirL._AC._SR360,460.jpg"],199),
  new Product(2,"Chainsawman Vol.2","This story is about the man who lives in a world where devil exists",["https://images-eu.ssl-images-amazon.com/images/I/81ww5rFJirL._AC._SR360,460.jpg"],199),
  new Product(3,"Chainsawman Vol.3","This story is about the man who lives in a world where devil exists",["https://images-eu.ssl-images-amazon.com/images/I/81ww5rFJirL._AC._SR360,460.jpg"],199),
  ];
  beforeEach(() => {
    TestBed.configureTestingModule({
        
    });
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get products when calling getProducts', () => {
    service.products = products;
    const serviceProducts = service.getProducts();
    expect(serviceProducts).toEqual(products);
    
  });
  it('should set products when calling setProducts', () => {
    
    service.setProduct(products);
    expect(service.products).toEqual(products);
    
  });

  it('should fillter products when calling fillterProducts', () => {
    
      service.products = products;
      service.filterProduct('Chainsawman Vol.2');
      expect(service.temp.length).toBe(1);

      service.filterProduct('');
      expect(service.temp.length).toBe(3);
      
    service.productSub.subscribe((products)=>{
        expect(products).toBeTruthy("No product returned");
        expect(service.products).toEqual(products);
    })
  });
  it('should return products when calling getProductbyId', () => {
    
    service.products = products;
    service.getProductById(1);
    expect(service.temp.length).toBe(1);
    
});
it('should return products when calling getProductbyprice', () => {
    
  service.products = products;
  service.filterProductByPrice(0,200);
  expect(service.temp.length).toBe(3);
  
});
});
