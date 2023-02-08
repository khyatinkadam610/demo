import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productSub = new Subject<Product[]>();
  // searchText:string='';
  products:Product[]=[
    // new Product(1,"Chainsawman Vol.3","This story is about the man who lives in a world where devil exists","https://images-eu.ssl-images-amazon.com/images/I/81ww5rFJirL._AC._SR360,460.jpg",199),
    // new Product(2,"Chainsawman Vol.2","This story is about the man who lives in a world where devil exists","https://images-eu.ssl-images-amazon.com/images/I/81ww5rFJirL._AC._SR360,460.jpg",199),
    // new Product(3,"Chainsawman Vol.3","This story is about the man who lives in a world where devil exists","https://images-eu.ssl-images-amazon.com/images/I/81ww5rFJirL._AC._SR360,460.jpg",199),
  ];
  temp:Product[]=[];
  constructor() { }
 
  getProducts():Product[]{
    return this.products.slice();
  }
  
  setProduct(productList:Product[]){
    this.products = productList;
    // console.log(this.products);
    this.productSub.next(this.products.slice());
    
  }
  
  filterProduct(searchText:string)
  {
    // o.log(searchText);
    this.temp = this.products.filter(product =>{
      return product.name.toLowerCase().includes(searchText.toLowerCase())||
      product.description.toLowerCase().includes(searchText.toLowerCase())
    } 
    )
    
    this.productSub.next(this.temp);
  }

  filterProductByPrice(v1:number, v2:number)
  {
    // o.log(searchText);
    this.temp = this.products.filter(product =>{
      return product.price <= v2 && product.price >= v1;
    } 
    )
    console.log(this.temp);
    
    this.productSub.next(this.temp);
  }

  getProductById(id:number):Product[]{
    return this.temp = this.products.filter(product => {
      return product.id == id;
    }).slice();
  }
}
