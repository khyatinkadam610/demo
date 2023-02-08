import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap, take, exhaustMap } from "rxjs/operators";
import { Product } from "../models/product.model";
import { ProductService } from "./product.service";

@Injectable({ providedIn: "root" })
export class DataStorageService {
  constructor(private http: HttpClient, private productService: ProductService) { }

  // storeProduct() {
  //   const products = this.productService.getProducts();
  //   this.http.put('https://recipe-book-3a0ab-default-rtdb.firebaseio.com/recipes.json', products)
  //     .subscribe(
  //       response => {
  //         console.log(response);

  //       })
  // }

  fetchProduct() {
    // console.log("token",user.token);
    return this.http.get<Product[]>('https://kartwheel-cbe4d-default-rtdb.firebaseio.com/products.json',
    ).pipe(
      tap((products: Product[]) => {
        // console.log(products);
        return this.productService.setProduct(products);
      })
    )


  }
}

