import { Product } from "src/app/models/product.model";


export class CartItem {
  id: number;
  // productId: number;
  // productName: string;
  product:Product;
  qty: number;
  price: number;
  firebaseId:string[];
  constructor(id: number, product: Product, qty = 1,firebaseId:string[] =[]) {
    // console.log(product);
    
    this.id = id;
    // this.productId = product.id;
    // this.productName = product.name;
    this.product = product;
    this.price = product.price;
    this.qty = qty;
    this.firebaseId = firebaseId;
    
  }
}
